"use client";
import React from "react";
import useCursorStore from "@/stores/useCursorStore";
import { CursorVariants } from "./ui/cursor";
import { Slot } from "@radix-ui/react-slot";

type AnimateCursorProps = {
  children: React.ReactNode;
  variant: CursorVariants;
  asChild?: boolean;
  onClick?: () => void;
};

const AnimateCursor = ({
  children,
  variant,
  asChild,
  onClick,
}: AnimateCursorProps) => {
  const setCursorVariant = useCursorStore((state) => state.setCursorVariant);

  const handleMouseEnter = () => {
    setCursorVariant(variant);
  };

  const handleMouseLeave = () => {
    setCursorVariant("default");
  };

  const props = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  if (asChild) {
    return <Slot {...props}>{children}</Slot>;
  }

  return <span {...props}>{children}</span>;
};

export default AnimateCursor;
