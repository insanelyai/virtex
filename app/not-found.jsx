"use client";
import { Button } from "@/components/ui/button";
import Particles from "@/components/ui/particles";
import { MoveLeftIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function NotFound() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <div className="z-10 flex flex-col items-center justify-center gap-10 text-center">
        <div className="space-y-2">
          <h2 className="text-6xl font-bold">404</h2>
          <h1 className="text-6xl  font-bold">You're Lost</h1>
        </div>
        <Link href="/">
          <Button size="lg" className="flex items-center justify-center gap-3">
            <MoveLeftIcon strokeWidth={1.5} size={24} />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
