"use client";
import EventCard from "@/components/Resuable/Events/EventCard";
import UserContext from "@/providers/UserProvider";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function page() {
  const { user, setUser } = useContext(UserContext);
  const [events, setEvents] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      await axios
        .get("/api/fetch-user")
        .then((response) => {
          if (response.status === 200) {
            if (response.data.payload) {
              setUser(response.data.payload);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }

    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      async function fetchAllEvents() {
        const userId = user.id;
        setLoading(true);
        console.log(user.rsvpEvents)
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
    <main className="max-w-screen-xl w-full mx-auto">
      <div className="mt-36">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => {
            return (
              <div key={event._id} className="mx-auto">
                <EventCard event={event} />
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
