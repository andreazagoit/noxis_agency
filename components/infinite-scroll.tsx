"use client";
import React, { useEffect, useRef, useState } from "react";
import { animate } from "motion";

type InfiniteScrollProps = {
  children: React.ReactNode;
  speed?: number;
  gap?: number;
};

const InfiniteScroll = ({ children, speed, gap }: InfiniteScrollProps) => {
  const externalContainer = useRef<HTMLDivElement>(null);
  const internalContainer = useRef<HTMLDivElement>(null);
  const [clones, setClones] = useState<React.ReactNode[]>([children]);
  const [loading, setLoading] = useState(true);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (!externalContainer.current || !internalContainer.current) return;

    const updateClones = () => {
      const externalWidth = externalContainer.current!.clientWidth;
      let internalWidth = internalContainer.current!.clientWidth;
      let newClones = [children];

      while (internalWidth < externalWidth) {
        newClones.push(children);
        internalWidth =
          internalContainer.current!.clientWidth * newClones.length;
      }

      setClones(newClones);
    };

    updateClones();
    setLoading(false);
    requestAnimationFrame(animate);
    window.addEventListener("resize", updateClones);
    return () => window.removeEventListener("resize", updateClones);
  }, [children, gap]);

  useEffect(() => {
    if (!internalContainer.current) return;
  }, [clones]);

  useEffect(() => {
    requestAnimationFrame(animate);
  }, []);

  const animate = () => {
    console.log(
      scroll,
      externalContainer.current!.clientWidth,
      scroll > externalContainer.current!.clientWidth
    );
    if (scroll > externalContainer.current!.clientWidth) {
      setScroll(0);
    } else {
      setScroll((state) => state + 1);
    }
    requestAnimationFrame(animate);
  };

  return (
    <div className="overflow-hidden flex" ref={externalContainer}>
      <div
        ref={internalContainer}
        className="relative flex items-center"
        style={{ left: -scroll }}
      >
        <div className="flex" style={{ gap, marginRight: gap }}>
          {clones}
        </div>
        {!loading && (
          <div className="flex" style={{ gap, marginRight: gap }}>
            {clones}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
