export const dynamic = "force-dynamic";

import Approach from "@/components/Approach";
import { AuroraBackgroundDemo } from "@/components/aurora-background-demo";
import Brand from "@/components/brand";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import GridBackground from "@/components/grid-background";
import Header from "@/components/header";
import Hero from "@/components/Hero";
import InfiniteScroll from "@/components/infinite-scroll";
import PageInitializer from "@/components/page-initializer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Container from "@/components/ui/container";
import Cursor from "@/components/ui/cursor";
import { WobbleCardDemo } from "@/components/wobble-card-demo";
import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <>
      <PageInitializer />
      <main>
        <div className="h-[100vh] flex flex-col pt-14">
          <div className="px-4 mb-4">
            <Brand width={"100%"} />
          </div>
          <AuroraBackground className="bg-blue-300 flex-1 h-full">
            <div className="text-white">test</div>
          </AuroraBackground>
        </div>
        {/* <Hero /> */}
        <WobbleCardDemo />
        <Approach />
        <Footer />
      </main>
    </>
  );
}
