"use client";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { HoveredLink, Menu } from "../ui/navbar-menu";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import UserContext from "@/providers/UserProvider";
import AvtarDropdown from "../Users/AvatarDropdown";
import axios from "axios";

export default function Navbar({ className }) {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    async function fetch() {
      try {
        const response = await axios.get("/api/fetch-user");

        if (response.status === 200) {
          if (response.data.payload) {
            setUser(response.data.payload);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  return (
    <div
      className={cn(
        "fixed top-10 inset-x-0 max-w-screen-xl mx-auto z-50",
        className
      )}
    >
      <Menu className="border">
        <div className="w-full flex items-center justify-between">
          <HoveredLink href={"/"}>
            <div className="text-xl font-bold tracking-wider uppercase">
              virtex
            </div>
          </HoveredLink>

          <div className="flex items-center justify-end gap-5">
            {user ? (
              <AvtarDropdown />
            ) : (
              <>
                <HoveredLink href={"/login"}>
                  <div className="font-medium">Login</div>
                </HoveredLink>
                <Link href={"/register"}>
                  <Button size="lg" className="rounded-full">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Menu>
    </div>
  );
}
