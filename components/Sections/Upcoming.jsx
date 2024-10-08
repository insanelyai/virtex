"use client";
import EventCard from "@/components/Resuable/Events/EventCard";
import UserContext from "@/providers/UserProvider";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

export default function Upcoming() {
  const { user, setUser } = useContext(UserContext);
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      async function fetchAllEvents() {
        const userId = user.id;
        setLoading(true);

        await axios
          .get("/api/event/fetchall")
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
    <main className="max-w-screen-xl w-full mx-auto">

        <h2 className="text-5xl font-bold text-center my-20">Upcoming Events</h2>
      <div className=" flex items-center justify-center gap-10 md:basis-1/2 lg:basis-1/3">
        {Object.entries(
          events
            .filter((event) => {
              // Convert event date to a Date object and filter out past events

              const date = event.date;

              const opdate = date.split("/");
              const day = opdate[0];
              const month = opdate[1] - 1;
              const year = opdate[2].split(",")[0];

              const eventDate = new Date(year, month, day);

              const today = new Date(); // Current date

              // Keep events where the date is today or in the future
              return eventDate >= today.setHours(0, 0, 0, 0); // Ignores time for comparison
            })
            .sort((a, b) => {
              // Sorting the events by date (ascending order)
              const dateA = new Date(a.date);
              const dateB = new Date(b.date);
              return dateA - dateB;
            })
            .reduce((groupedEvents, event) => {
              const oldDateFormat = event.date;

              const opdate = oldDateFormat.split("/");
              const day = opdate[0];
              const month = opdate[1] - 1;
              const year = opdate[2].split(",")[0];

              const date = new Date(year, month, day);
              const eventDate = date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short", // "Nov" instead of "11"
                year: "numeric",
              });

              // Grouping events by their date
              if (!groupedEvents[eventDate]) {
                groupedEvents[eventDate] = [];
              }
              groupedEvents[eventDate].push(event);

              return groupedEvents;
            }, {})
        ).map(([eventDate, eventsOnThisDate], index) => (
          <>
            {eventsOnThisDate.map((event, i) => (
              <EventCard key={i} event={event} />
            ))}
          </>
        ))}
      </div>
      <Link href={'/events'}>
      <div className="w-full flex justify-center gap-1 text-muted-foreground text-center pt-20">See More Events <ArrowRight /></div>
      </Link>
    </main>
  );
}
