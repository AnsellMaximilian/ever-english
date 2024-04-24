import { cn } from "@/lib/utils";
import React, { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

export default function DashboardModule({
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  return (
    <section
      className={cn(
        "border-border border-2 overflow-hidden p-4 rounded-md",
        props.className
      )}
    >
      {props.children}
    </section>
  );
}

export interface ModuleTitleProps extends HTMLAttributes<HTMLElement> {}

const ModuleTitle = ({
  title,
  ...props
}: PropsWithChildren<ModuleTitleProps>) => {
  return (
    <h2 {...props} className={cn("text-xl font-semibold", props.className)}>
      {props.children}
    </h2>
  );
};

DashboardModule.Title = ModuleTitle;
