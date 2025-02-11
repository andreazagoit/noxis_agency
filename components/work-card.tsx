import { Work } from "@/data/works";
import React from "react";
import AnimateCursor from "./animate-cursor";
import Image from "next/image";

type WorkCardProps = {
  work: Work;
};

const WorkCard = ({ work }: WorkCardProps) => {
  const { id, title, description, image, href } = work;

  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    } else {
      alert("Il progetto sará reso risponibile a breve");
    }
  };
  return (
    <AnimateCursor variant="link" asChild onClick={handleClick}>
      <div className="flex flex-col pb-4 gap-4 min-w-full md:min-w-[55vw] min-h-[70vh] md:h-full">
        <div className="bg-gray-200 h-full w-full flex-1 relative">
          <Image
            src={image}
            alt={`${title} website`}
            layout="fill"
            objectFit="cover"
          />
        </div>
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
