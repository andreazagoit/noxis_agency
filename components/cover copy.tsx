/* "use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import useNavigationStore from "@/stores/useNavigationStore";
import { cn } from "@/lib/utils";
import { animate } from "motion";

const Cover = () => {
  const pageState = useNavigationStore((state) => state.pageState);
  const coverRef = useRef<any>(null!);

  const coverVariants = {
    loading: (direction) => {
      animate(
        coverRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { duration: 0 }
      );
      return {
        clipPath:
          direction === "opening" ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 0%)",
      };
    },
    ready: (direction) => {
      console.log("Direction in loading:", direction); // Debug log
      return {
        clipPath:
          direction === "opening"
            ? "inset(0% 100% 0% 0%)"
            : "inset(0% 0% 100% 0%)",
      };
    },
  };

  return (
    <motion.div
      ref={coverRef}
      className={cn("fixed bg-[#bbdf32] w-full h-full z-[100] bottom-0")}
      transition={{
        type: "spring",
        duration: 1,
        bounce: 0.2,
      }}
      initial={pageState}
      animate={pageState}
      variants={coverVariants}
      custom={pageState === "loading" ? "opening" : "closing"} // Pass direction
    />
  );
};

export default Cover;
 */
