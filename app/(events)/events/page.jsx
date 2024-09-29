"use client";
import EventCard from "@/components/Resuable/Events/EventCard";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllEvent() {
      setLoading(true);
      await axios
        .get("/api/event/fetchall")
        .then((response) => {
          setEvents(response.data.events);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
    fetchAllEvent();
  }, []);

  if (loading)
    return (
      <div className="w-full h-[52rem] flex items-center justify-center text-muted-foreground font-bold">
        Loading Events....
      </div>
    );

  if (events.length <= 0)
    return (
      <div className="w-full h-[52rem] flex items-center justify-center text-muted-foreground font-bold">
        No upcoming events found.
      </div>
    );

  return (
    <main className="max-w-screen-xl w-full mx-auto">
      <div className="mt-36">
        {/* {events.map((event, index) => {
          const date = event.date;

          const opdate = date.split("/");
          
          const day = opdate[0];
          const month = opdate[1];
          const year = opdate[2].split(",")[0];

          const dateformat = new Date(year, month, day);

          

          return <EventCard key={index} event={event} />;
        })} */}

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
          <div key={index}>
            {/* Display the date as a heading */}
            <h2 className="text-xl font-bold mt-8 mb-4">
              Events on {eventDate}
            </h2>

            {/* Render the events under this date */}
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {eventsOnThisDate.map((event, i) => (
                <EventCard key={i} event={event} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
