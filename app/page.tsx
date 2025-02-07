export const dynamic = "force-dynamic";

import Approach from "@/components/Approach";
import { CanvasRevealEffectDemo } from "@/components/canvas-reveal";
import { FloatingNav } from "@/components/FloatingNavbar";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import GridBackground from "@/components/grid-background";
import Header from "@/components/header";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { FlipWords } from "@/components/ui/flip-words";
import { Spotlight } from "@/components/ui/Spotlight";

const words = ["Sviluppo", "Design", "Foto", "modern"];

const navItems = [
  { name: "Home", link: "#" },
  { name: "About", link: "#about" },
  /* { name: "Projects", link: "#projects" }, */
  /* { name: "Testimonials", link: "#testimonials" }, */
  { name: "Contact", link: "#contact" },
];

export default function Home() {
  return (
    <>
      {/* <div className="min-h-screen w-full bg-black flex flex-col justify-center items-start px-20 gap-8">
        <h2 className="font-medium text-6xl text-white">
          Ciao, <br /> mi chiamo Andrea <br />e mi occupo di{" "}
          <FlipWords words={words} className="text-red-600 font-bold" />
        </h2>
        <Button>ciao</Button>
      </div> */}
      {/* <Header /> */}
      <main className="relative bg-black-100">
        <GridBackground />
        <Hero />
        <Grid />
        <Container className="relative z-[1]">ciao</Container>
        <Approach />
        <Footer />
      </main>
    </>
  );
}
