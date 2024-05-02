"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserLevel } from "@/types/data";
import Image from "next/image";
import congrats from "@/assets/images/congrats.svg";
import useAuth from "@/hooks/useAuth";
import { useSearchParams } from "next/navigation";
export default function LevelUpDialog() {
  const [isOpen, setIsOpen] = useState(true);

  const { currentAccount } = useAuth();
  const searchParams = useSearchParams();

  const prevLvl = searchParams.get("prevLvl");

  return (
    <>
      {currentAccount &&
        prevLvl &&
        prevLvl != currentAccount.userLevel.level && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  You Leveled Up!
                </DialogTitle>
                <DialogDescription className="text-center">
                  Congrats on reaching a new level!
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <div className="mx-auto mb-4 bg-primary text-primary-foreground text-3xl w-20 h-20 rounded-full flex items-center justify-center font-bold">
                    {currentAccount.userLevel.level}
                  </div>
                  <Image
                    src={congrats}
                    width={300}
                    height={500}
                    className="w-32 block mx-auto"
                    alt="congrats"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Nice!
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
    </>
  );
}
