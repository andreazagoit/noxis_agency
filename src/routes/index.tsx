import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/sections/Hero'
import { Services } from '../components/sections/Services'
import { FeaturedWork } from '../components/sections/FeaturedWork'
import { Partnership } from '../components/sections/Partnership'
import { MountainSeparator } from '../components/ui/MountainSeparator'

import { Quotes } from '../components/sections/Quotes'

import { Vision } from '../components/sections/Vision'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="relative">
      <Hero />
      <Vision />
      <Partnership />
      <Services />

      {/* Orange Mountain Separator */}
      <MountainSeparator topColor="bg-background" bottomColor="bg-primary" />
      {/* Orange Section */}
      <FeaturedWork />

      {/* Black Mountain Separator */}
      <MountainSeparator topColor="bg-primary" bottomColor="bg-black" />
      {/* Black Section - Quotes */}
      <Quotes
        items={["BUILD DIFFERENT", "DESIGN WITH PURPOSE", "CODE WITH PASSION", "CREATE WITH VISION", "INNOVATE ALWAYS"]}
        backgroundColor="bg-black"
        textColor="text-white"
        className="mt-0"
      />
    </div>
  )
}
