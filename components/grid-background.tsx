import React from "react";

const GridBackground = () => {
  return (
    <div className="absolute h-[80vh] top-0 left-0 w-full dark:bg-grid-white/[0.03] bg-grid-black/[0.2] flex items-center justify-center z-[1]">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />
    </div>
  );
};

export default GridBackground;
