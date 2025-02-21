import React, { ReactNode } from "react";
import Link from "next/link"; // Importiamo il componente Link di Next.js
import { cn } from "@/lib/utils";
import AnimateCursor from "./animate-cursor";

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
        <AnimateCursor variant="link" asChild>
          <Link href="mailto:info@noxis.agency">
            <div className="flex flex-col gap-2">
              <p className="font-light text-sm text-[#818181]">EMAIL</p>
              {/* Aggiungiamo il Link con mailto */}
              <p className={cn("text-xs md:text-base", `text-${color}`)}>
                info@noxis.agency
              </p>
            </div>
          </Link>
        </AnimateCursor>
        <AnimateCursor variant="link" asChild>
          <Link href="tel:+393491384504">
            <div className="flex flex-col gap-2">
              <p className="font-light text-sm text-[#818181]">TELEFONO</p>
              {/* Aggiungiamo il Link con tel */}
              <p className={cn("text-xs md:text-base", `text-${color}`)}>
                +39 349 138 4504
              </p>
            </div>
          </Link>
        </AnimateCursor>
      </div>
    </div>
  );
};

export default ContactsSection;
