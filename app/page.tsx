import Header from "@/components/Header";
import Image from "next/image";
import wave from "@/assets/images/wave.svg";

export default function Home() {
  return (
    <main className="">
      <section>
        <Image
          src={wave}
          width={100}
          height={25}
          className="w-full"
          alt="wave"
        />
      </section>
      <section className="py-64 bg-[#0C7CEB]"></section>
    </main>
  );
}
