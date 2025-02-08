"use client";
import React, { useEffect, useState } from "react";
import * as motion from "motion/react-client";
import useCursorStore from "@/stores/useCursorStore";

interface MousePosition {
  x: number;
  y: number;
}

const cursorVariants = {
  default: {
    width: 32,
    height: 32,
    background: "#bbdf3200",
    backdropFilter: "invert(100%)",
    transform: "translate(-50%, -50%)",
    borderRadius: 16,
  },
  link: {
    width: 100,
    backgroundColor: "red",
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
  default: { opacity: 0 },
  link: { opacity: 1, color: "#000000" },
};

export type CursorVariants = keyof typeof cursorVariants;

const Cursor = () => {
  const cursorVariant = useCursorStore((state) => state.cursorVariant);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      }
    };

    const hideCursorOnTouch = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        setIsVisible(false);
      }
    };

    window.addEventListener("pointermove", updateMousePosition);
    window.addEventListener("pointerdown", hideCursorOnTouch);

    return () => {
      window.removeEventListener("pointermove", updateMousePosition);
      window.removeEventListener("pointerdown", hideCursorOnTouch);
    };
  }, []);

  if (!isVisible) return null;

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
