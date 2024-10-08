"use client";
import Announce from "@/components/Forms/AnnounceForm";
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
              <Image
                src={event.image}
                className="rounded object-cover"
                alt={event.title}
                fill
              />
            </AspectRatio>
            <div className="flex flex-col">
              <div className="">
                <p className="text-muted-foreground pb-3">
                  Make Accouncement for:
                </p>
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
                <Announce eventId={params.event} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
