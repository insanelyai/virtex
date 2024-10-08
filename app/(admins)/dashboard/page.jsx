import ActionCard from "@/components/Featured/ActionCard";
import Deck from "@/components/Featured/Deck";
import { CalendarDaysIcon, MegaphoneIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const actionCards = [
  {
    title: "Add Event",
    description: "Create a new event with ease",
    icon: <PlusIcon className="w-16 h-16 bg-accent/40 p-2 rounded" size={24} />,
    gradient: "bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300",
    path: "dashboard/create-event",
  },
  {
    title: "Announcements",
    description: "Broadcast a new announcement",
    icon: (
      <MegaphoneIcon className="w-16 h-16 bg-accent/40 p-2 rounded" size={24} />
    ),
    gradient: "bg-gradient-to-r from-yellow-200 to-orange-400",
    path: "/events",
  },
  {
    title: "All Events",
    description: "Acccess all the upcoming events",
    icon: (
      <CalendarDaysIcon
        className="w-16 h-16 bg-accent/40 p-2 rounded"
        size={24}
      />
    ),
    gradient: "bg-gradient-to-r from-purple-300 via-purple-400 to-purple-500",
    path: "/events",
  },
];

export default function page() {
  return (
    <main className="max-w-screen-xl w-full mx-auto">
      <Deck />
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {actionCards.map((card, index) => (
          <Link href={card.path} key={index}>
            <ActionCard
              title={card.title}
              description={card.description}
              icon={card.icon}
              gradient={card.gradient}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
