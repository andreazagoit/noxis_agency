import React, { useEffect } from "react";
import useCursorStore from "@/stores/useCursorStore";
import { CursorVariants } from "./ui/cursor";

type AnimateCursorProps = {
  children: React.ReactNode;
  variant: CursorVariants;
};

const AnimateCursor = ({ children, variant }: AnimateCursorProps) => {
  const setCursorVariant = useCursorStore((state) => state.setCursorVariant);

  // Handle mouse enter and mouse leave events
  const handleMouseEnter = () => {
    setCursorVariant(variant); // Set the cursor variant on hover
  };

  const handleMouseLeave = () => {
    setCursorVariant("default"); // Revert to the default cursor variant when hover ends
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
};

export default AnimateCursor;
