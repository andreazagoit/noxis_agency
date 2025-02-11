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
import Footer from "@/components/footer";
import Header from "@/components/header";

const HomePage = () => {
  return (
    <>
      <Header />
      <Approach />
      <Footer />
      <Cursor />
      <AnimateCursor variant="project">
        <p>ciao!</p>
      </AnimateCursor>
      <AnimatedLogo centerLetter="x" firstPart="no" lastPart="is" open={true} />
    </>
  );
};

export default HomePage;
