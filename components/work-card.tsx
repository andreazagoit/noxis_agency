import { Work } from "@/data/works";
import React from "react";
import AnimateCursor from "./animate-cursor";

type WorkCardProps = {
  work: Work;
};

const WorkCard = ({ work }: WorkCardProps) => {
  const { id, title, description, image, href } = work;
  return (
    <AnimateCursor
      variant="link"
      asChild
      onClick={() => window.open(href, "_blank", "noopener,noreferrer")}
    >
      <div className="flex flex-col pb-4 gap-4 min-w-full md:min-w-[55vw] min-h-[70vh] md:h-full">
        <div className="bg-gray-200 h-full w-full flex-1"></div>
        <div>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase">
            {title}
          </h2>
          <p className="uppercase">{description}</p>
        </div>
      </div>
    </AnimateCursor>
  );
};

export default WorkCard;
