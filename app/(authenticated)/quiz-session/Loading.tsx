import Image from "next/image";
import React from "react";
import askGemini from "@/assets/images/ask-gemini.svg";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <Image
        src={askGemini}
        width={300}
        height={100}
        alt="ask gemini"
        className="w-96"
      />
      <div className="text-primary font-bold text-2xl">
        Asking Gemini for a quiz...
      </div>
      <Loader2 className="animate-spin text-primary" size={64} />
    </div>
  );
}
