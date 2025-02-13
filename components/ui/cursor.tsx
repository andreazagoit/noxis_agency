"use client";
import React, { useEffect, useState, useCallback } from "react";
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
    background: "rgba(187, 223, 50, 0.125)",
    backdropFilter: "invert(100%)",
    transform: "translate(-50%, -50%)",
    borderRadius: 16,
  },
  link: {
    width: 64,
    height: 64,
    transform: "translate(-50%, -50%)",
    backdropFilter: "invert(100%)",
    borderRadius: 32,
    border: "1px solid rgba(0,0,0,0.2)",
  },
  project: {
    width: 100,
    height: 64,
    scale: 1.2,
    border: "1px solid rgba(209, 206, 20, 0.5)",
    background: "rgba(209, 206, 20, 0.1)",
    transform: "translate(-50%, -50%)",
    backdropFilter: "invert(100%)",
  },
  contact: {
    width: 48,
    height: 48,
    backgroundColor: "rgba(0, 128, 0, 0.2)",
    border: "2px solid rgb(209, 206, 20)",
    scale: 0.8,
    transform: "translate(-50%, -50%)",
  },
  menu: {
    width: 100,
    backgroundColor: "rgba(255, 0, 0, 0.2)",
    transform: "translate(-50%, -50%)",
    backdropFilter: "invert(100%)",
    borderRadius: 16,
  },
};

export type CursorVariants = keyof typeof cursorVariants;

const Cursor = () => {
  const cursorVariant = useCursorStore((state) => state.cursorVariant);
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  const updateMousePosition = useCallback((e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    }
  }, []);

  const hideCursorOnTouch = useCallback((e: PointerEvent) => {
    if (e.pointerType !== "mouse") {
      setIsVisible(false);
    }
  }, []);

  const handleWindowBlur = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleVisibilityChange = useCallback(() => {
    setIsVisible(document.visibilityState === "visible");
  }, []);

  useEffect(() => {
    window.addEventListener("pointermove", updateMousePosition);
    window.addEventListener("pointerdown", hideCursorOnTouch);
    window.addEventListener("blur", handleWindowBlur);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pointermove", updateMousePosition);
      window.removeEventListener("pointerdown", hideCursorOnTouch);
      window.removeEventListener("blur", handleWindowBlur);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [
    updateMousePosition,
    hideCursorOnTouch,
    handleWindowBlur,
    handleVisibilityChange,
  ]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="cursor fixed"
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        top: mousePosition.y,
        left: mousePosition.x,
        zIndex: "9999!important",
      }}
      variants={cursorVariants}
      animate={cursorVariant}
      initial="default"
      transition={{
        type: "spring",
        duration: 0.3,
        bounce: 0.2,
      }}
    />
  );
};

export default Cursor;
