export const dynamic = "force-dynamic";

import Brand from "@/components/brand";
import Footer from "@/components/Footer";
import PageInitializer from "@/components/page-initializer";
import ServicesSection from "@/components/services-section";
import WorkWithSection from "@/components/work-with-section";

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
        <WorkWithSection />
        {/* <Hero /> */}
        {/* <WobbleCardDemo />
        <Approach /> */}
        <Footer />
      </main>
    </>
  );
}
