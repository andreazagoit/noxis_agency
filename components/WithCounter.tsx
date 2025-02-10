import { cn } from "@/lib/utils";
import React from "react";

type WithCounterProps = {
  count: number;
  children: React.ReactNode;
  countClassName?: string;
};

const WithCounter = ({ count, children, countClassName }: WithCounterProps) => {
  return (
    <div className="flex items-start text-xs">
      {children}
      <span className={cn(countClassName, "text-xs")}>({count})</span>
    </div>
  );
};

export default WithCounter;
