import { cn } from "@/lib/utils";
import React from "react";

export default function MatchButton({
  text,
  onClick,
  isSelected = false,
  isCorrect = false,
  disabled = false,
}: {
  text: string;
  onClick: () => void;
  isSelected?: boolean;
  isCorrect?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      disabled
      onClick={onClick}
      className={cn(
        "p-4 border-border border-4 rounded-md hover:border-secondPrimary text-xl font-semibold",
        isSelected ? "border-primary" : "",
        isCorrect ? "border-green-500" : ""
      )}
    >
      {text}
    </button>
  );
}
