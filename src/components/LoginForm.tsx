"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleLogo } from "./icons/GoogleLogo";
import { Separator } from "@/components/ui/separator";

export function LoginForm() {
  return (
    <div className="flex flex-1 flex-col gap-2">
      {/* <Input type="email" />
      <Button
        onClick={() =>
          void signIn("credentials", {
            email: "yesy",
            callbackUrl: "/",
          })
        }
        variant="outline"
      >
        Authenticate
      </Button>
      <div className="flex w-full items-center gap-2 text-sm uppercase text-slate-600">
        <div className="h-px w-full bg-slate-300"></div>
        <p className="">Or</p>
        <div className="h-px w-full bg-slate-300"></div>
      </div> */}
      <Button
        onClick={() =>
          void signIn("google", {
            callbackUrl: "/admin",
          })
        }
        variant="outline"
      >
        <GoogleLogo className="mr-3 h-5 w-5" />
        Sign in with Google
      </Button>
    </div>
  );
}
