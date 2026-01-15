import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/sections/Hero";
import { Services } from "../components/sections/Services";
import { Quality } from "../components/sections/Quality";
import { Partnership } from "../components/sections/Partnership";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Services />
      <Quality />
      <Partnership />
    </div>
  );
}