"use client";
import useNavigationStore from "@/stores/useNavigationStore";
import * as motion from "motion/react-client";
import { usePathname } from "next/navigation";
import React from "react";
import TransitionLink from "./TransitionLink";
import AnimateCursor from "./animate-cursor";
import Brand from "./brand";
import Clock from "./clock";
import WithCounter from "./WithCounter";

type HeaderProps = {};

const links = [
  { id: "work", name: "Work", href: "/work" },
  { id: "studio", name: "Studio", href: "/studio" },
  { id: "contact", name: "Contact", href: "/contact" },
];

const Header = () => {
  const showBrand = useNavigationStore((state) => state.showBrand);
  const pathname = usePathname();

  const works = 5;

  return (
    <nav className="fixed w-full z-[200] mix-blend-difference px-4 flex items-center h-14 md:h-16">
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        layout
        transition={{
          type: "spring",
          duration: 1,
          bounce: 0.2,
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
            <AnimateCursor variant="link">
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
            </AnimateCursor>
          )}
          <motion.div
            className="flex gap-2 md:gap-8 items-center"
            layout
            transition={{
              type: "spring",
              duration: 1,
              bounce: 0.2,
            }}
          >
            {links.map((link) => (
              <React.Fragment key={link.id}>
                {pathname === link.href ? (
                  <>
                    {link.id === "work" ? (
                      <WithCounter
                        count={works}
                        countClassName="text-neutral-400"
                      >
                        <span className="text-sm md:text-xl text-neutral-400">
                          {link.name}
                        </span>
                      </WithCounter>
                    ) : (
                      <span className="text-sm md:text-xl text-neutral-400">
                        {link.name}
                      </span>
                    )}
                  </>
                ) : (
                  <AnimateCursor variant="link">
                    {link.id === "work" ? (
                      <WithCounter count={works}>
                        <TransitionLink key={link.id} href={link.href} asChild>
                          <span className="text-sm md:text-xl">
                            {link.name}
                          </span>
                        </TransitionLink>
                      </WithCounter>
                    ) : (
                      <TransitionLink key={link.id} href={link.href} asChild>
                        <span className="text-sm md:text-xl">{link.name}</span>
                      </TransitionLink>
                    )}
                  </AnimateCursor>
                )}
              </React.Fragment>
            ))}
          </motion.div>
          <Clock />
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Header;
