import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

export default function ActionCard({ gradient, icon, title, description }) {
  return (
    <Card className="">
      <CardContent
        className={cn(
          gradient,
          "p-6 flex flex-col items-between justify-start gap-14 rounded"
        )}
      >
        {/* <PlusIcon
            strokeWidth={1.5}
            size={55}
            className="bg-white/45 p-2 rounded"
          /> */}
        {icon}
        <div className="rounded-lg p-4 bg-white/45 dark:bg-black/45">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="font-medium">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
