"use client";
import React from "react";
import * as motion from "motion/react-client";
import useNavigationStore from "@/stores/useNavigationStore";
import { cn } from "@/lib/utils";

const Cover = () => {
  const pageState = useNavigationStore((state) => state.pageState);

  const coverVariants = {
    loading: {
      height: "100vh",
    },
    ready: {
      height: "0vh",
    },
  };

  return (
    <motion.div
      className={cn(
        "fixed bg-black w-full z-[100]",
        pageState === "loading" ? "bottom-0" : "top-0"
      )}
      style={{ bottom: 0 }}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0.2,
      }}
      initial="ready"
      animate={pageState}
      variants={coverVariants}
    ></motion.div>
  );
};

export default Cover;
