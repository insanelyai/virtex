"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page({ params }) {
  const [event, setEvent] = useState();

  useEffect(() => {
    async function fetchEvent() {
      await axios
        .post("/api/event/fetch", JSON.stringify(params.event))
        .then((response) => {
          console.log(response.data);
          setEvent(response.data.event);
        })
        .catch((error) => {
          console.error(error);
          toast({
            description: "Failed to fetch event. Please try again later.",
          });
        });
    }
    fetchEvent();
  }, [params.event]);

  const adminActions = [
    {
      label: "Announce",
      variant: "outline",
      path: `/dashboard/manage/${params.event}/announce`,
    },
    {
      label: "View Attendees",
      variant: "outline",
      path: `/dashboard/manage/${params.event}/attendees`,
    },
    {
      label: "Edit Event",
      variant: "default",
      path: `/dashboard/manage/${params.event}/edit`,
    },
  ];

  if (!event)
    return (
      <div className="w-full h-[52rem] flex items-center justify-center text-muted-foreground font-bold">
        Loading Event Details...
      </div>
    );
  return (
    <main className="max-w-screen-xl w-full mx-auto">
      <div className="mt-36">
        <Card>
          <CardContent className="p-6 flex gap-12">
            <AspectRatio ratio={16 / 9}>
              <Image src={event.image} className="rounded object-cover" fill />
            </AspectRatio>
            <div className="flex flex-col">
              <div className="">
                <h2 className="text-xl font-bold mb-4">{event.title}</h2>
              </div>
              <p className="text-muted-foreground font-medium my-0.5 capitalize">
                From {event.category.replace("-", " ")}
              </p>
              <div className="flex text-muted-foreground font-medium">
                <p>{event.date.split(",")[0]}</p>
                <Dot />
                <p>{event.time} </p>
              </div>
              <div className="flex flex-col gap-3 w-full my-5">
               
                {adminActions.map((action, index) => (
                  <Link href={action.path} key={index}>
                    <Button
                      size="lg"
                      variant={action.variant}
                      className="w-full"
                    >
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
