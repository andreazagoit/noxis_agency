"use client";
import React, { useEffect, useRef, useState } from "react";
import * as motion from "motion/react-client";
import useNavigationStore from "@/stores/useNavigationStore";
import { cn } from "@/lib/utils";
import { animate } from "motion";

const Cover = () => {
  const initialPageState = useNavigationStore(
    (state) => state.initialPageState
  );
  const [initialRender, setInitialRender] = useState(true);
  const pageState = useNavigationStore((state) => state.pageState);

  const coverRef = useRef<any>(null!);

  /* const coverVariants = {
    loading: (custom) => {
      return {
        clipPath: "inset(0% 0% 0% 0%)", // Raggiunge il 100% (copre tutto)
      };
    },
    ready: (custom) => {
      return {
        clipPath: "inset(100% 0% 0% 0%)", // Raggiunge il 100% (copre tutto)
      };
    },
  }; */

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
      animate(
        coverRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", display: "flex" },
        { duration: 0 }
      );
      return;
    }
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
      className={cn(
        "fixed bg-neutral-900 w-full h-full z-[100] flex items-center justify-center",
        initialRender && "hidden"
      )}
    >
      <div className="flex flex-col items-center">
        <h3
          className="text-white text-6xl font-bold"
          style={{
            WebkitTextFillColor: "transparent",
            WebkitTextStrokeWidth: 2,
          }}
        >
          NOXIS
        </h3>
        <h4 className="text-white text-xl">agency</h4>
      </div>
    </div>
  );
};

export default Cover;
