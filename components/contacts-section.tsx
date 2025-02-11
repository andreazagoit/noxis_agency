import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContactsSectionProps = {
  children?: ReactNode;
  containerClassName?: string;
  color?: "white" | "black";
};

const ContactsSection = ({
  children,
  containerClassName,
  color = "white",
}: ContactsSectionProps) => {
  return (
    <div
      className={cn(
        "py-6 flex border-t-[0.5px] border-neutral-700 gap-8 md:gap-32 md:flex-row flex-row-reverse items-baseline",
        containerClassName
      )}
    >
      <div className={cn("flex-1 flex flex-col gap-2", `text-${color}`)}>
        {children}
      </div>

      <div className="flex-1 md:flex-none flex gap-4 md:gap-32 flex-col md:flex-row">
        <div className="flex flex-col gap-2 md:gap-4">
          <p className="font-light text-sm text-[#818181]">EMAIL</p>
          <p className={cn("text-xs md:text-xl", `text-${color}`)}>
            info@noxis.agency
          </p>
        </div>
        <div className="flex flex-col gap-2 md:gap-4">
          <p className="font-light text-sm text-[#818181]">TELEFONO</p>
          <p className={cn("text-xs md:text-xl", `text-${color}`)}>
            +39 349 138 4504
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactsSection;
