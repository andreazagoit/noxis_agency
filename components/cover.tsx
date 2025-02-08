"use client";
import React from "react";
import * as motion from "motion/react-client";
import useNavigationStore from "@/stores/useNavigationStore";
import { cn } from "@/lib/utils";

const Cover = () => {
  const transitionState = useNavigationStore((state) => state.transitionState);

  const coverVariants = {
    open: {
      height: "100vh",
    },
    close: {
      height: "0vh",
    },
  };

  return (
    <motion.div
      className={cn(
        "absolute bg-black w-full z-[100]",
        transitionState === "open" ? "bottom-0" : "top-0"
      )}
      style={{ bottom: 0 }}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0.2,
      }}
      initial="close"
      animate={transitionState}
      variants={coverVariants}
    ></motion.div>
  );
};

export default Cover;
