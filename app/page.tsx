import Header from "@/components/Header";
import Image from "next/image";
import wave from "@/assets/images/wave.svg";
import icon from "@/assets/images/icon.svg";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logofull from "@/assets/images/logo-full-horizontal.svg";
import { account } from "@/appwrite";

export default async function Home() {
  return (
    <main className="">
      <Header landing />
      <section>
        <div className="text-center py-24">
          <Image
            src={icon}
            width={200}
            height={200}
            alt="Icon"
            className="w-64 block mx-auto mb-16"
          />
          <h1 className="font-bold text-5xl tracking-tighter mb-2">
            Level Up Your <span className="main-colors-gradient">English</span>
          </h1>
          <p className="font-semibold text-3xl mb-6">
            Let Google&apos;s Gemini AI take your English Skills to the next
            level
          </p>
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants(),
              "font-bold text-2xl py-8 px-6 hover:bg-secondPrimary"
            )}
          >
            Get Started
          </Link>
        </div>
        <Image
          src={wave}
          width={100}
          height={25}
          className="w-full"
          alt="wave"
        />
      </section>
      <section className="py-64 bg-secondPrimary"></section>
    </main>
  );
}
