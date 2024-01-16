"use client";
import { signOut } from "next-auth/react";
import { Button, type ButtonProps } from "./ui/button";

export function LogoutButton(props: ButtonProps) {
  return (
    <Button
      onClick={() =>
        void signOut({
          callbackUrl: "/",
        })
      }
      variant="outline"
      {...props}
    >
      Logout
    </Button>
  );
}
