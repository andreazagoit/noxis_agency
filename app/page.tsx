export const dynamic = "force-dynamic";

import Approach from "@/components/Approach";
import Brand from "@/components/brand";
import Footer from "@/components/footer";
import PageInitializer from "@/components/page-initializer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { WobbleCardDemo } from "@/components/wobble-card-demo";

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
