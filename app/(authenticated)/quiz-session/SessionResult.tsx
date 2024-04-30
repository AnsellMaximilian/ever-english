"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SessionResult as ISessionRes } from "@/types/helpers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export default function SessionResult({
  open,
  onOpenChange,
  sessionResult,
}: {
  open: boolean;
  onOpenChange: (status: boolean) => void;
  sessionResult: ISessionRes;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Session Result
          </DialogTitle>
          <DialogDescription className="text-center">
            Congrats on finishing a session!
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            {sessionResult.resultDetails.map((res, idx) => {
              return (
                <div
                  key={idx}
                  className={cn(
                    "border-border border-2 p-2 rounded-md",
                    res.isCorrect ? "border-green-500" : "border-red-500"
                  )}
                >
                  {res.text}
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <div className="font-semibold text-xl">Total Correct</div>
            <div className="font-bold text-2xl">
              {sessionResult.totalCorrect}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Home
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
