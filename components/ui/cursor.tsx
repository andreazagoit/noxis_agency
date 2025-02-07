import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import useCursorStore from "@/stores/useCursorStore";

// Define the types for mouse position state
interface MousePosition {
  x?: number;
  y?: number;
}

const Cursor = () => {
  const cursorVariant = useCursorStore((state) => state.cursorVariant); // Get the cursor variant from the store

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: undefined,
    y: undefined,
  });

  const [isVisible, setIsVisible] = useState(true); // Track visibility of the cursor

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("blur", () => setIsVisible(false)); // Hide cursor on window blur
    window.addEventListener("focus", () => setIsVisible(true)); // Show cursor on window focus

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("blur", () => setIsVisible(false));
      window.removeEventListener("focus", () => setIsVisible(true));
    };
  }, []);

  // Define variants for the cursor
  const cursorVariants = {
    default: {
      width: 32,
      height: 32,
      border: "2px solid #bbdf32",
      background: "#bbdf32",
      scale: 1,
      transform: "translate(-50%, -50%)",
    },
    project: {
      width: 64,
      height: 64,
      scale: 1.2,
      border: "0px solid rgb(209, 206, 20)",
      background: "#d1ce1400",
      transform: "translate(-50%, -50%)",
      backdropFilter: "invert(100%)",
    },
    contact: {
      width: 48,
      height: 48,
      backgroundColor: "green",
      border: "2px solid rgb(209, 206, 20)",
      scale: 0.8,
      transform: "translate(-50%, -50%)",
    },
  };

  // Conditionally render the cursor when x and y are defined and cursor is visible
  if (!mousePosition.x || !mousePosition.y || !isVisible) {
    return null; // Don't render anything if position is not set or cursor is hidden
  }

  return (
    <motion.div
      className="circle"
      style={{
        position: "fixed",
        pointerEvents: "none",
        top: mousePosition.y,
        left: mousePosition.x,
        borderRadius: "50%",
      }}
      variants={cursorVariants} // Apply the variants
      animate={cursorVariant} // Animate to the current cursor variant
      initial="default"
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0.2,
      }}
    >
      <span className="cursorText"></span>
    </motion.div>
  );
};

export default Cursor;
