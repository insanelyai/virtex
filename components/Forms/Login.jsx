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
import UserContext from "@/providers/UserProvider";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Your password must be at least 8 characters",
  }),
});

export default function Login() {

  const { toast } = useToast ();
  const router = useRouter();

  const { setUser } = useContext(UserContext)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const response = await axios.post("/api/login", values);
     
      if (response.status === 200) {
        toast({
          description: response.data.message,
        });
        setUser(response.data.user)
        setTimeout(() => {
          router.push('/')
        }, 2000)
      } else if (response.status === 201) {
        toast({
          description: response.data.message,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        description: error.data,
      });
    }
  }

  return (
    <Card className="w-[25rem] bg-transparent z-10">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Take a step towards your interest</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@virtex.com" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Link
          href="/register"
          className="hover:underline font-medium text-sm text-muted-foreground"
        >
          Don't have an account? Register
        </Link>
      </CardFooter>
    </Card>
  );
}

