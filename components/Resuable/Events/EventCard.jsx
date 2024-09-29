"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import UserContext from "@/providers/UserProvider";
import axios from "axios";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function EventCard({ event }) {
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser } = useContext(UserContext);
  const [isRegistered, setIsRegistered] = useState(false);

  // Handle RSVP logic
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
            setIsRegistered(true); // Mark as registered after successful RSVP
            setUser({
              ...user,
              rsvpEvents: [...user.rsvpEvents, event._id], // Spread the current array and add the new event ID
            }); // Update user's RSVP array
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

  // Check if the user is already registered for this event
  useEffect(() => {
    if (user && event) {
      console.log(user.rsvpEvents);
      // Ensure both are strings to compare correctly
      const eventRSVP = user.rsvpEvents?.some(
        (rsvpEventId) => String(rsvpEventId) === String(event._id)
      );

      console.log("Event RSVP:", eventRSVP); // Check if this is true
      setIsRegistered(eventRSVP); // Set the state accordingly
    }
  }, [user, event]);

  return (
    <Card>
      <CardContent className="p-6">
        <AspectRatio ratio={16 / 9}>
          <Image
            src={event.image}
            alt={event.image}
            className="object-cover rounded"
            fill
          />
        </AspectRatio>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4">{event.title}</h2>
        </div>
        <p className="text-muted-foreground font-medium my-0.5 capitalize">
          From {event.category.replace("-", " ")}
        </p>
        <div className="flex text-muted-foreground font-medium">
          <p>{event.date.split(",")[0]}</p>
          <Dot />
          <p>{event.time}</p>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <Link href={`/events/${event._id}`}>
            <Button size="lg" variant="outline" className="w-full">
              More Details
            </Button>
          </Link>
          {!user || user.role === "user" ? (
            <Button
              size="lg"
              className="w-full"
              onClick={handleRSVP}
              disabled={isRegistered} // Disable the button if already registered
            >
              {isRegistered ? "RSVP'd" : "RSVP"}
            </Button>
          ) : (
            <Link href={`/dashboard/manage/${event._id}`}>
              <Button size="lg" className="w-full">
                Manage Event
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
