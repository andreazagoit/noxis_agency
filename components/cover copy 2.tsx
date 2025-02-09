/* "use client";
import React, { useEffect, useRef } from "react";
import * as motion from "motion/react-client";
import useNavigationStore from "@/stores/useNavigationStore";
import { cn } from "@/lib/utils";
import { animate } from "motion";

const Cover = () => {
  const pageState = useNavigationStore((state) => state.pageState);
  const coverRef = useRef<any>(null!);



  useEffect(() => {
    if (pageState === "loading") {
      animate(
        coverRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { duration: 0 }
      );
      animate(coverRef.current, { clipPath: "inset(0% 0% 0% 0%)" });
    }
    if (pageState === "ready") {
      animate(
        coverRef.current,
        { clipPath: "inset(0% 0% 0% 0%)" },
        { duration: 0 }
      );
      animate(coverRef.current, { clipPath: "inset(0% 0% 100% 0%)" });
    }
  }, [pageState]);

  return (
    <div
      ref={coverRef}
      className={cn("fixed bg-[#bbdf32] w-full h-full z-[100]")}
    />
  );
};

export default Cover;
 */
