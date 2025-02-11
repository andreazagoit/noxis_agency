export const dynamic = "force-dynamic";

import Approach from "@/components/Approach";
import Brand from "@/components/brand";
import Footer from "@/components/footer";
import PageInitializer from "@/components/page-initializer";
import ServicesSection from "@/components/services-section";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { WobbleCardDemo } from "@/components/wobble-card-demo";

export default function Home() {
  return (
    <>
      <PageInitializer />
      <main>
        <div className="min-h-[100vh] flex flex-col pt-14">
          <div className="px-4 mb-4">
            <Brand width={"100%"} />
          </div>
          <ServicesSection />
        </div>
        {/* <Hero /> */}
        {/* <WobbleCardDemo />
        <Approach /> */}
        <Footer />
      </main>
    </>
  );
}
