"use client";
import { useToast } from "@/hooks/use-toast";
import UserContext from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";

export default function AvtarDropdown() {
  const { toast } = useToast();
  const [Fallback, setFallback] = useState("V");
  const { user, setUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const { username } = user;
    const use = username.charAt(0).toUpperCase();
    setFallback(use);
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>{Fallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="relative rounded m-0 p-2" align="center">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <Link href={"/myevents"}>
          <DropdownMenuItem>My Events</DropdownMenuItem>
        </Link>
        <Link href={'/accouncements'}>
        <DropdownMenuItem>Announcements</DropdownMenuItem>
        </Link>
        {user.role === "admin" ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>For Admin</DropdownMenuLabel>
            <Link href={"/dashboard"}>
              <DropdownMenuItem>Dashboard</DropdownMenuItem>
            </Link>
          </>
        ) : (
          ""
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            try {
              const response = await axios.get("/api/logout");
              if (response.status === 200) {
                setUser(null);
                setTimeout(() => {
                  toast({
                    description: response.data.message,
                  });
                  router.push("/");
                });
              }
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
