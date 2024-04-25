"use client";

import { account } from "@/appwrite";
import React, { ForwardedRef, forwardRef, useState } from "react";
import { ID, Models } from "appwrite";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useAuth from "./hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function AuthForm({ isLogin = false }: { isLogin?: boolean }) {
  const { login, register, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (isLogin) {
      login(email, password);
    } else {
      console.log("registering");
      register(email, password, name);
    }
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      <div className="space-y-2   ">
        <Input
          type="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <Input
            type="text"
            placeholder="Name"
            autoComplete="username"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
      </div>
      <div className="text-xs mt-2 text-center">
        {!isLogin ? (
          <div>
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary">
              Login
            </Link>
          </div>
        ) : (
          <div>
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-primary">
              Register
            </Link>
          </div>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
          Cancel
        </Link>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : isLogin ? (
            "Login"
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>
    </form>
  );
}
