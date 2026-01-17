import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/sections/Hero'
import { Services } from '../components/sections/Services'
import { Method } from '../components/sections/Method'
import { FeaturedWork } from '../components/sections/FeaturedWork'
import { Quality } from '../components/sections/Quality'
import { Partnership } from '../components/sections/Partnership'
import { MountainSeparator } from '../components/ui/MountainSeparator'

import { Quotes } from '../components/sections/Quotes'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="relative">
      <Hero />
      <Services />
      <Method />

      {/* Orange Mountain Separator */}
      <MountainSeparator topColor="bg-background" bottomColor="bg-primary" />
      {/* Orange Section */}
      <FeaturedWork className="mt-0" title="FEATURED WORKS" />

      {/* Black Mountain Separator */}
      <MountainSeparator topColor="bg-primary" bottomColor="bg-black" />
      {/* Black Section - Quotes */}
      <Quotes
        items={["BUILD DIFFERENT", "DESIGN WITH PURPOSE", "CODE WITH PASSION", "CREATE WITH VISION", "INNOVATE ALWAYS"]}
        backgroundColor="bg-black"
        textColor="text-white"
        className="mt-0"
      />
      <Quality />
      <Partnership />
    </div>
  )
}
