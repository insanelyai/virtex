'use client'

import { ExternalLinkIcon, MoveRightIcon } from "lucide-react";
import AnimatedGridPattern from "../ui/animated-grid-pattern";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useContext } from "react";
import UserContext from "@/providers/UserProvider";


export function Hero() {

  const {user} = useContext(UserContext)

  return (
    <div className="relative flex h-[50rem] w-full max-w-screen-xl items-center justify-center overflow-hidden rounded-b-lg border bg-background p-20 md:shadow-xl">
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className="z-10 max-w-screen-sm whitespace-pre-wrap text-center text-5xl font-medium tracking-tighter">
          The people platform—Where interests become friendships
        </h1>
        <div className="flex items-center justify-center gap-6">
          {user ? (
            <>
            <Link href={'/announcements'}>
             <Button variant="secondary" className="flex items-center justify-center gap-1.5 hover:text-blue-600">
            Announcements
            <ExternalLinkIcon className="h-5 w-5 ml-2" size={24} />
            </Button>
            </Link>
            <Link href={'/myevents'}>
            <Button className="flex items-center justify-center gap-1.5">
             My Events
            <MoveRightIcon className="h-5 w-5 ml-2" size={24} />
            </Button>
            </Link>
            </>
          ) : (
            <>
             <Button variant="secondary" className="flex items-center justify-center gap-1.5 hover:text-blue-600">
             Learn More
            <ExternalLinkIcon className="h-5 w-5 ml-2" size={24} />
            </Button>
            <Link href={'/onboarding'}>
            <Button className="flex items-center justify-center gap-1.5">
             Get Started
            <MoveRightIcon className="h-5 w-5 ml-2" size={24} />
            </Button>
            </Link>
            </>
          )}
    
        </div>
      </div>
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
          "mx-auto inset-y-[-30%] max-w-screen-xl h-[200%] skew-y-12"
        )}
      />
    </div>
  );
}
