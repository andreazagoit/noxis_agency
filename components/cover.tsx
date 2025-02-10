"use client";
import React from "react";
import { motion } from "framer-motion";
import useNavigationStore from "@/stores/useNavigationStore";
import { cn } from "@/lib/utils";
import { easeInOut } from "motion";

const Cover = () => {
  const pageState = useNavigationStore((state) => state.pageState);

  const coverVariants = {
    loading: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.5, easeInOut },
    },
    ready: {
      transition: { duration: 0.5, easeInOut },
    },
  };

  return (
    <motion.div
      variants={coverVariants}
      initial="ready"
      animate={pageState}
      className={cn(
        "fixed bg-neutral-900 w-full h-full z-[100] flex items-center justify-center"
      )}
      style={{
        clipPath:
          pageState === "loading"
            ? "inset(100% 0% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
      }}
    >
      <div className="flex flex-col items-center">
        <h3
          className="text-white text-[30vw] font-bold md:text-[30vw]"
          style={{
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeWidth: 1,
          }}
        >
          NOXIS
        </h3>
        {/* <h4 className="text-white text-xs">agency</h4> */}
      </div>
    </motion.div>
  );
};

export default Cover;
