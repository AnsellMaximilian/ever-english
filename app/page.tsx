import Header from "@/components/Header";
import Image from "next/image";
import wave from "@/assets/images/wave.svg";
import icon from "@/assets/images/icon.svg";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logofull from "@/assets/images/logo-full-horizontal.svg";

export default function Home() {
  return (
    <main className="">
      <header className="p-4">
        <nav className="flex items-center gap-8 justify-between">
          <div>
            <Image src={logofull} width={300} height={84.25} alt="logo full" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost">Login</Button>
            <Link
              href="/auth/register"
              className={cn(buttonVariants(), "font-semibold")}
            >
              Register
            </Link>
          </div>
        </nav>
      </header>
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
