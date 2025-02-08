export const dynamic = "force-dynamic";

import Approach from "@/components/Approach";
import Brand from "@/components/brand";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import GridBackground from "@/components/grid-background";
import Header from "@/components/header";
import Hero from "@/components/Hero";
import InfiniteScroll from "@/components/infinite-scroll";
import Container from "@/components/ui/container";
import Cursor from "@/components/ui/cursor";
import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <main>
      <Container className="pt-[80px] pb-[80px]">
        <Brand width={"100%"} />
      </Container>
      <Hero />
      <Grid />
      <Approach />
      <Footer />
    </main>
  );
}
