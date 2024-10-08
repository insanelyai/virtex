import React from "react";
import { Card } from "../ui/card";

export default function CategoryCard({ icon, name, className }) {
  return (
    <Card className={`w-[10rem] h-[10rem] flex flex-col items-center justify-center gap-2 p-4 ${className}`}>
      {icon}
      <div className="text-center font-medium">
      {name}
      </div>
    </Card>
  );
}
