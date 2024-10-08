"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import UserContext from "@/providers/UserProvider";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useContext } from "react";

export default function page() {
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      async function fetchAllEvents() {
        const userId = user.id;
        setLoading(true);

        await axios
          .post("/api/event/rsvpdevents", { id: userId })
          .then((response) => {
            if (response.status === 200) {
              setEvents(response.data.events);
              setLoading(false);
            } else {
              console.error("Error fetching events:", response.data.error);
            }
          })
          .catch((error) => console.error("Something went wrong:", error));
      }
      fetchAllEvents();
    }
  }, [user]);

  if (loading)
    return (
      <div className="w-full h-[52rem] flex items-center justify-center text-muted-foreground font-bold">
        Loading...
      </div>
    );

  if (!events)
    if (events.length <= 0)
      return (
        <div className="w-full h-[52rem] flex items-center justify-center text-muted-foreground font-bold">
          You've not RSVP'd for any events
        </div>
      );

  return (
    <div className="mt-36 max-w-screen-xl w-full mx-auto">
      {events.map((event, i) => {
        console.log(event.announcement);

        if (event.announcement.length > 0) {
          return (
            <Card key={i} className="my-3">
              <Accordion type="single" collapsible key={i}>
                <AccordionItem value={`item-` + i} className="px-7">
                  <AccordionTrigger>{event.title}</AccordionTrigger>
                  {event.announcement.map((announcement, i) => (
                    <AccordionContent>
                      <h2 className="text-lg font-bold">
                        {announcement.title}
                      </h2>
                      <p className="text-muted-foreground font-medium">
                        {announcement.description}
                      </p>
                      <p className="text-muted-foreground font-medium">
                        {announcement.createdAt.split("T")[0]}
                      </p>
                    </AccordionContent>
                  ))}
                </AccordionItem>
              </Accordion>
            </Card>
          );
        }
      })}
    </div>
  );
}
