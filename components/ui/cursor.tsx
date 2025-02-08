"use client";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import useCursorStore from "@/stores/useCursorStore";

// Define the types for mouse position state
interface MousePosition {
  x?: number;
  y?: number;
}

// Define variants for the cursor
const cursorVariants = {
  default: {
    width: 32,
    height: 32,
    /* border: "3px solid #bbdf32", */
    /* background: "#bbdf32", */
    background: "#bbdf3200",
    backdropFilter: "invert(100%)",
    transform: "translate(-50%, -50%)",
    borderRadius: 16,
  },
  link: {
    width: 100,
    backgorundColor: "red",
    transform: "translate(-50%, -50%)",
    backdropFilter: "invert(100%)",
    borderRadius: 16,
  },
  project: {
    width: 100,
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

const textVariants = {
  default: {
    opacity: 0,
  },
  link: {
    opacity: 1,
    color: "#000000",
  },
};

const commonCursorStyles = {};

export type CursorVariants = keyof typeof cursorVariants;

const Cursor = () => {
  const cursorVariant = useCursorStore((state) => state.cursorVariant);

  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: undefined,
    y: undefined,
  });

  const [isVisible, setIsVisible] = useState(true);

  const updateMousePosition = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("blur", () => setIsVisible(false));
    window.addEventListener("focus", () => setIsVisible(true));

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("blur", () => setIsVisible(false));
      window.removeEventListener("focus", () => setIsVisible(true));
    };
  }, []);

  // Conditionally render the cursor when x and y are defined and cursor is visible
  if (!mousePosition.x || !mousePosition.y || !isVisible) {
    return null; // Don't render anything if position is not set or cursor is hidden
  }

  return (
    <motion.div
      className="circle"
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        top: mousePosition.y,
        left: mousePosition.x,
        zIndex: 9999,
      }}
      variants={cursorVariants}
      animate={cursorVariant}
      initial="default"
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0.2,
      }}
    >
      <motion.span
        className="cursorText"
        variants={textVariants}
        animate={cursorVariant}
      >
        Menu
      </motion.span>
    </motion.div>
  );
};

export default Cursor;
