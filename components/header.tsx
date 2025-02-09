"use client";
import React, { useEffect, useState } from "react";
import Container from "./ui/container";
import * as motion from "motion/react-client";
import AnimatedLogo from "./animated-logo";
import Link from "next/link";
import useNavigationStore from "@/stores/useNavigationStore";
import TransitionLink from "./TransitionLink";
import Clock from "./clock";
import NOXISLogo from "@/public/NOXIS.svg";
import Brand from "./brand";
import { usePathname } from "next/navigation";

type HeaderProps = {};

const links = [
  { id: "work", name: "Work", href: "/work" },
  { id: "studio", name: "Studio", href: "/studio" },
  { id: "contact", name: "Contact", href: "/contact" },
];

const Header = () => {
  const showBrand = useNavigationStore((state) => state.showBrand);
  const setShowBrand = useNavigationStore((state) => state.setShowBrand);
  const pathname = usePathname();

  const [coverState, setCoverState] = useState<"full" | "navbar" | "menu">(
    "navbar"
  );

  return (
    <main className="fixed w-full z-[200] p-4 mix-blend-difference">
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: coverState === "menu" ? "start" : "center",
        }}
        layout
        transition={{
          type: "spring",
          duration: 1,
          bounce: 0.2,
        }}
        onClick={() => {
          /* setVisualizedContent((state) =>
            state === "header" ? "headerMenu" : "header"
          ); */
          setCoverState((state) => (state === "menu" ? "navbar" : "menu"));
        }}
      >
        <motion.div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          {showBrand && (
            <motion.div
              className="font-bold"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                type: "spring",
                duration: 1,
                bounce: 0.2,
              }}
              style={{ backdropFilter: "invert(100%)" }}
            >
              <TransitionLink href="/">
                <Brand />
              </TransitionLink>
            </motion.div>
          )}
          <motion.div
            className="flex gap-2 md:gap-8"
            layout
            transition={{
              type: "spring",
              duration: 1,
              bounce: 0.2,
            }}
          >
            {links.map((link) => (
              <>
                {pathname === link.href ? (
                  <span className="text-sm md:text-xl text-neutral-400">
                    {link.name}
                  </span>
                ) : (
                  <TransitionLink key={link.id} href={link.href}>
                    <span className="text-sm md:text-xl">{link.name}</span>
                  </TransitionLink>
                )}
              </>
            ))}
          </motion.div>
          <Clock />
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Header;
