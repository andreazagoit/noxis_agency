import Image from "next/image";
import React from "react";
import Marquee from "react-fast-marquee";

const companies = [
  {
    name: "Accenture",
    logo: "/work-with/accenture.png",
    style: { width: "auto", height: "50px", marginBottom: 5 },
  },
  {
    name: "Reply",
    logo: "/work-with/reply.png",
    style: { width: "auto", height: "60px", marginTop: 10 },
  },
  {
    name: "Generali",
    logo: "/work-with/generali.png",
    style: { width: "auto", height: "30px", marginTop: 5 },
  },
  {
    name: "Snam",
    logo: "/work-with/snam.png",
    style: { width: "auto", height: "60px" },
  },
];

const WorkWithSection = () => {
  return (
    <section className="py-10 text-center my-28">
      <h2 className="text-white text-2xl font-semibold">
        Un background costruito in grandi realtà
      </h2>
      <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
        Il nostro team ha maturato esperienza in aziende leader del settore,
        lavorando su progetti innovativi e complessi. Questa solida base ci
        permette di offrire soluzioni affidabili e di alto livello.
      </p>
      <div className="mt-24">
        <Marquee autoFill>
          {companies.map((company, index) => (
            <div key={index} className="mx-16">
              <Image
                src={company.logo}
                alt={`${company.name} logo`}
                height={100}
                width={0}
                sizes="100vw"
                style={company.style}
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default WorkWithSection;
