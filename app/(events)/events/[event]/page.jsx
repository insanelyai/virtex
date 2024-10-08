"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import UserContext from "@/providers/UserProvider";
import axios from "axios";
import { BadgeInfo, Calendar, Dot, Presentation, UsersRoundIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

export default function page({ params }) {
  const eventId = params.event;

  const { user } = useContext(UserContext);
  const [event, setEvent] = useState();
  const [registered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvent() {
      await axios
        .post("/api/event/fetch", JSON.stringify(eventId))
        .then((response) => {
          if (response.data.event) {
            setEvent(response.data.event);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          toast({
            description: "Failed to fetch event. Please try again later.",
          });
        });
    }
    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (user && eventId) {
      const eventRSVP = user.rsvpEvents?.some(
        (rsvpEventId) => String(rsvpEventId) === String(eventId)
      );

      setIsRegistered(eventRSVP); // Set the state accordingly
    }
  }, [user, eventId]);

  async function handleRSVP() {
    if (user && user.role === "user") {
      const values = {
        eventId: event._id,
        userId: user.id,
      };
      await axios
        .post("/api/event/rsvp", values)
        .then((response) => {
          if (response.status === 200) {
            toast({ description: response.data.message });
            setIsRegistered(true); 
            setUser({
              ...user,
              rsvpEvents: [...user.rsvpEvents, event._id], 
            }); 
            router.push("/myevents");
          } else {
            toast({ description: response.data.message });
          }
        })
        .catch((error) => {
          toast({ description: error.response.data.message });
        });
    }
  }

  if (loading)
    return (
      <div className="w-full h-[52rem] flex items-center justify-center text-muted-foreground font-bold">
        Loading...
      </div>
    );

  if (!event)
    if (event.length <= 0)
      return (
        <div className="w-full h-[52rem] flex items-center justify-center text-muted-foreground font-bold">
          You've not RSVP'd for any events
        </div>
      );


  return (
    <main className="max-w-screen-xl w-full max-h-screen flex flex-col lg:flex-row items-start justify-start mx-auto my-2 mt-36">
      <div className="w-3/4">
        <div className="flex flex-col items-start justify-start p-6">
          <h1 className="text-3xl font-bold">{event && event.title}</h1>
          <AspectRatio ratio={16 / 9}>
            <Image
              src={event && event.image}
              alt="placeholder"
              fill
              className="h-full w-full my-4 rounded-md object-cover"
            />
          </AspectRatio>
          <h3 className="text-xl font-semibold mt-10">Description</h3>
          <p className="text-pretty whitespace-pre text-left mt-4">
            {event && event.description}
          </p>
        </div>
      </div>
      <div className="w-1/4 p-6 pt-8">
        <h3 className="text-xl font-semibold mb-4">Event Details</h3>
        <Card className="w-full p-6">
          <div className="w-full flex flex-col items-start justify-start gap-2.5">
            <div className="w-full flex items-center justify-start">
              <Calendar className="w-8 h-8" strokeWidth={1} size={24} />
              <div className="flex flex-col ml-2">
                <p className="font-semibold">Date & Time</p>
                <p className="flex items-center">{event && event.date.split(',')[0]}<Dot />{event&& event.time}</p>
              </div>
            </div>
            <div className="w-full flex items-center justify-start">
              <BadgeInfo className="w-8 h-8" strokeWidth={1} size={24} />
              <div className="flex flex-col ml-2">
                <p className="font-semibold">Category</p>
                <p className="capitalize">
                  {event && event.category.replace("-", " ")}
                </p>
              </div>
            </div>
            <div className="w-full flex items-center justify-start">
              <UsersRoundIcon className="w-8 h-8" strokeWidth={1} size={24} />
              <div className="flex flex-col ml-2">
                <p className="font-semibold">Registered</p>
                <p className="capitalize">{event && event.attendees.length}</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="w-full p-6 my-3 bg-accent">
          <div className="w-full flex flex-col items-start justify-start gap-2">
            <div className="flex">
              <Presentation className="w-8 h-8" strokeWidth={1} size={24} />
              <p className="font-semibold ml-2">Meet Link</p>
            </div>
            <Link href={event.meetlink}>
            <p className="text-wrap underline">{event && event.meetlink}</p>
            </Link>
          </div>
        </Card>

        <div className="w-full my-4">
          {user && user.role === "user" ? (
            <Button
              className="w-full"
              size="lg"
              disabled={registered}
              onClick={handleRSVP}
            >
              {registered ? "Registered" : "RSVP"}
            </Button>
          ) : (
            <Link href={`/dashboard`}>
              <Button className="w-full" size="lg">
                Manage Event
              </Button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
