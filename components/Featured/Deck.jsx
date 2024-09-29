"use client";

import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export default function Deck() {
  const [time, setTime] = useState();
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const thisInterval = setInterval(() => {
      const currentdate = new Date();
      setDate(currentdate);
    }, 10000);

    return () => clearInterval(thisInterval);
  }, []);

  useEffect(() => {
    setTime(
      date.toLocaleTimeString("en-IN", {
        hourCycle: "h23",
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    console.log(time)
  }, [date]);

  return (
    <div className="relative w-full max-w-screen-xl h-60 rounded flex flex-col items-start justify-center overflow-hidden border p-6 mt-40 mb-10">
      <div className="pt-6 pb-4 text-slate-800 dark:text-slate-200">
        <h1 className="font-semibold text-9xl leading-tight">{time}</h1>
        <h2 className="font-semibold text-2xl leading-tight">
          {date.toLocaleDateString("en-IN", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </h2>
      </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "mx-auto inset-y-[-30%] max-w-screen-xl h-[200%] skew-y-12 "
        )}
      />
    </div>
  );
}
