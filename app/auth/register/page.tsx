import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AuthForm from "../AuthForm";
import icon from "@/assets/images/icon.svg";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="grow bg-[url('/bg.svg')] flex flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="pb-4">
          <Image
            src={icon}
            alt="icon"
            width={75}
            height={75}
            className="block mx-auto mb-2"
          />
          <CardTitle className="text-xl font-semibold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/" className={cn(buttonVariants({ variant: "outline" }))}>
            Cancel
          </Link>
          <Button>Sign Up</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
