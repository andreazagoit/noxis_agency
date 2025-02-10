import React from "react";

type WithCounterProps = { count: number; children: React.ReactNode };

const WithCounter = ({ count, children }: WithCounterProps) => {
  return (
    <div className="flex items-start text-xs">
      {children}
      <span>(5)</span>
    </div>
  );
};

export default WithCounter;
