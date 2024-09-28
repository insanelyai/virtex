"use client";

import Register from "@/components/Forms/Register";
import Particles from "@/components/ui/particles";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function page() {
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
    <Register />
    </div>
  );
}
