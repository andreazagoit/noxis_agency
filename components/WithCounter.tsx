import React from "react";

type WithCounterProps = { count: number; children: React.ReactNode };

const WithCounter = ({ count, children }: WithCounterProps) => {
  return (
    <div>
      {children}
      <span>(5)</span>
    </div>
  );
};

export default WithCounter;
