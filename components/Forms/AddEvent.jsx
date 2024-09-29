"use client";
import React, { useContext } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, CheckIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { CaretSortIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Textarea } from "../ui/textarea";
import UserContext from "@/providers/UserProvider";

const formSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1, {
    message: "Title must be at least 1 character.",
  }),
  date: z.date({
    required_error: "Date is required",
    parse: (date) => new Date(date),
    validate: (date) =>
      date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10),
    message: "Invalid date",
  }),
  time: z.string({
    required_error: "Time is required",
    pattern: {
      value: /^([01]\d|2[0-3]):([0-5]\d)$/,
      message: "Invalid time format (HH:MM)",
    },
    message: "Invalid time format (HH:MM)",
  }),
  category: z.string({
    required_error: "Category is required",
    message: "Please select a category",
  }),
  meetlink: z.string({
    required_error: "Meetlink is required",
    message: "Please enter a meetlink",
  }),
  image: z
    .any()
    .refine(
      (file) => file instanceof File && file.size > 0,
      "Please upload a valid image"
    ),
  description: z.string({
    required_error: "Description is required",
  }),
});

const categories = [
  {
    value: "data-mining",
    label: "Data Mining",
  },
  {
    value: "web-development",
    label: "Web Development",
  },
  {
    value: "artificial-intelligence",
    label: "Artificial Intelligence",
  },
  {
    value: "data-analysis",
    label: "Data Analysis",
  },
  {
    value: "cybersecurity",
    label: "Cybersecurity",
  },
  {
    value: "cloud-computing",
    label: "Cloud Computing",
  },
  {
    value: "project-management",
    label: "Project Management",
  },
];

export default function AddEvent() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values) {
    const formData = new FormData();
    formData.append("organizer", user.id)
    formData.append("title", values.title);
    formData.append("date", values.date);
    formData.append("time", values.time);
    formData.append("category", values.category);
    formData.append("meetlink", values.meetlink);
    if (values.image) formData.append("image", values.image);
    formData.append("description", values.description);

    await axios
      .post("/api/event/add", formData)
      .then((response) => {
        toast({ description: response.data.message });
        router.push("/events");
      })
      .catch((error) => {
        console.error(error);
        toast({ description: "Failed to add event. Please try again later." });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 my-3">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Add Event</h1>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title"
                  className="h-10 font-bold text-2xl"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="h-[5rem] flex items-center justify-start gap-5">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-2">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto -0p" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Input placeholder="15:00" className="w-[240px]" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[240px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? categories.find(
                            (category) => category.value === field.value
                          )?.label
                        : "Select language"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search category..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.label}
                            key={category.value}
                            onSelect={() => {
                              form.setValue("category", category.value);
                            }}
                          >
                            {category.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                category.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-10">
          <FormField
            control={form.control}
            name="meetlink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meet Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="meet.google.com/yut-fgd-wrf"
                    className="w-[450px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="rounded w-full"
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];
                      field.onChange(selectedFile); // Pass the File object to form state
                    }}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write a description/ detials about the events"
                  className="rounded min-h-[23rem] resize-none overflow-y-auto"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg">Publish</Button>
      </form>
    </Form>
  );
}
