"use client";
import React, { useEffect, useState } from "react";
import { Flip } from "gsap/Flip";
import * as motion from "motion/react-client";
import gsap from "gsap";
import AnimatedLogo from "@/components/animated-logo";
import Menu from "@/components/menu";
import Cursor from "@/components/ui/cursor";
import AnimateCursor from "@/components/animate-cursor";
import Approach from "@/components/Approach";
import Footer from "@/components/Footer";

gsap.registerPlugin(Flip);

const HomePage = () => {
  return (
    <>
      <Cover />
      {/* <div className="bg-white h-[500px] text-black">
        <Container>
          <h1 className="text-8xl">NOXIS</h1>
        </Container>
      </div> */}
      <Cursor />
      <AnimateCursor variant="project">
        <p>ciao!</p>
      </AnimateCursor>
      <AnimatedLogo centerLetter="x" firstPart="no" lastPart="is" open={true} />
    </>
  );
};

export default HomePage;

const Cover = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(false);
  }, []);

  const coverVariants = {
    open: { backgroundColor: "#d1ce14", height: "100vh" },
    close: { backgroundColor: "#ffffff", height: "inherit" },
  };

  const textVariants = {
    open: { color: "#ffffff" },
    close: { color: "#000000" },
  };

  return (
    <main className="relative">
      <motion.div
        className=""
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: open ? "center" : "start",
          alignItems: "center",
          boxSizing: "border-box",
        }}
        layout
        initial={open ? "open" : "close"}
        animate={open ? "open" : "close"}
        variants={coverVariants}
        transition={{
          type: "spring",
          duration: 1,
          bounce: 0.2,
          delay: 1,
        }}
        onClick={() => setOpen((state) => !state)}
      >
        <motion.div
          className="text-9xl font-bold"
          layout
          initial={open ? "open" : "close"}
          animate={open ? "open" : "close"}
          variants={textVariants}
          transition={{
            type: "spring",
            duration: 1,
            bounce: 0.2,
            delay: 1,
          }}
          style={{ margin: 100 }}
        >
          <AnimatedLogo
            centerLetter="x"
            firstPart="no"
            lastPart="is"
            open={true}
          />
        </motion.div>
      </motion.div>
      <Menu />
      <Approach />
      <Footer />
    </main>
  );
};
