"use client";
import React, { useEffect, useState } from "react";
import Container from "./ui/container";
import * as motion from "motion/react-client";
import AnimatedLogo from "./animated-logo";
import Menu from "./menu";

type HeaderProps = {};

const Header = () => {
  const [visualizedContent, setVisualizedContent] = useState<
    "header" | "headerMenu"
  >("header");
  const [coverState, setCoverState] = useState<"full" | "navbar" | "menu">(
    "full"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisualizedContent("headerMenu");
      setCoverState("navbar");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const coverVariants = {
    full: { backgroundColor: "#d1ce14", height: "100vh", padding: "0 100px" },
    navbar: { backgroundColor: "#ffffff", height: "inherit" },
    half: { backgroundColor: "#ffffff", height: "50vh" },
  };

  const textVariants = {
    white: { color: "#ffffff" },
    black: { color: "#000000" },
  };

  return (
    <main className="fixed w-full z-[200]">
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          justifyContent:
            visualizedContent === "header" ? "center" : "space-between",
          alignItems: coverState === "menu" ? "start" : "center",
        }}
        layout
        initial={coverState}
        animate={coverState}
        variants={coverVariants}
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
            justifyContent:
              visualizedContent === "header" ? "center" : "space-between",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <motion.div
            className="text-9xl font-bold text-black"
            layout
            initial={"black"}
            animate={textVariants}
            variants={textVariants}
            transition={{
              type: "spring",
              duration: 1,
              bounce: 0.2,
            }}
          >
            <AnimatedLogo
              centerLetter="x"
              firstPart="no"
              lastPart="is"
              open={true}
            />
          </motion.div>
          {visualizedContent === "headerMenu" && <Menu />}
        </motion.div>
        {coverState === "menu" && (
          <div
            className="absolute w-full"
            style={{
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              top: 0,
              left: 0,
              padding: 100,
            }}
          >
            <div
              className=" bg-red-800"
              style={{
                padding: "100px 0",
                height: "300px",
                boxSizing: "border-box",
              }}
            >
              <p className="text-purple">ciaooo</p>
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
};

export default Header;
