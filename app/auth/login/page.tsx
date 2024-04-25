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

export default function LoginPage() {
  return (
    <div className="grow bg-[url('/bg.svg')] flex flex-col items-center justify-center bg-cover bg-no-repeat">
      <Card className="w-[350px]">
        <CardHeader className="pb-4">
          <Link href="/" className="block mx-auto mb-2">
            <Image src={icon} alt="icon" width={75} height={75} />
          </Link>
          <CardTitle className="text-xl font-semibold">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <AuthForm isLogin />
        </CardContent>
      </Card>
    </div>
  );
}
