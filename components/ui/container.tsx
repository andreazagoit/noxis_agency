import { cn } from "@/lib/utils";
import React from "react";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
};

const Container = ({ className, children }: ContainerProps) => {
  return <div className={cn("px-4", className)}>{children}</div>;
};

export default Container;
