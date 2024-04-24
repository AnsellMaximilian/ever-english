import Header from "@/components/Header";
import Image from "next/image";
import wave from "@/assets/images/wave.svg";
import icon from "@/assets/images/icon.svg";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="">
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
            Level Up Your Braskibra
          </h1>
          <p className="font-semibold text-3xl mb-6">
            Let Google's Gemini AI take your ... to the next level
          </p>
          <Button className="font-bold text-2xl py-8 px-6 hover:bg-secondPrimary">
            Get Started
          </Button>
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
