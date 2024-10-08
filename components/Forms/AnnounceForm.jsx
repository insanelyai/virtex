"use client";
import React, { useContext } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
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
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
    title: z.string(
        {
            required_error: "Headline is required"
        }
    ), 
    description: z.string().optional(),
});

export default function Announce({eventId}) {
  const { toast } = useToast();
  const router = useRouter();

  const id = eventId;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values) {
    values.eventId = id
    await axios.post('/api/event/announce', values)
    .then((response) => {
      if(response.status === 200) {
        toast({ description: response.data.message });
        router.push(`/event/${id}`);
      }
      else {
        toast({ description: response.data.message });
      }
    })
    .catch((error) => {
      console.error(error);
      toast({ description: "Failed to create announcement. Please try again later." });
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Headline" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="add more to accouncements..."
                  className="min-h-40 resize-none overflow-y-auto"
                  {...field}
                />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Announce</Button>
      </form>
    </Form>
  );
}
