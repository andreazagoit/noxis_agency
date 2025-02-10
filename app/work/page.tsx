"use client";
import React, { useRef } from "react";
import PageInitializer from "@/components/page-initializer";
import WorkCard from "@/components/work-card";
import works from "@/data/works";

const WorkPage = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollLeft += e.deltaY;
    }
  };

  return (
    <>
      <PageInitializer />
      <main className="h-[100dvh] pt-16 flex flex-col">
        <section
          ref={scrollContainerRef}
          onWheel={handleWheel}
          className="flex-1 px-4 
          flex flex-col md:flex-row 
          overflow-x-scroll md:overflow-x-auto 
          overflow-y-auto 
          gap-4 
          [&::-webkit-scrollbar]:hidden 
          [-ms-overflow-style:none] 
          [scrollbar-width:none]"
        >
          {works.map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </section>
        <section className="py-4 mx-4 flex justify-between border-t-[0.5px] border-neutral-700 flex-col">
          <p className="text-sm md:text-base">
            WE TRANSFORMS BRANDS INTO EXPERIENCES
          </p>
          <p className="text-sm  md:text-base">CURRENT WORK ({works.length})</p>
        </section>
      </main>
    </>
  );
};

export default WorkPage;
