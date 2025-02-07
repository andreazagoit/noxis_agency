import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const Container = ({ className, children }: ContainerProps) => {
  return (
    <div className={cn("max-w-[1200px] mx-auto px-4", className)}>
      {children}
    </div>
  );
};

export default Container;
