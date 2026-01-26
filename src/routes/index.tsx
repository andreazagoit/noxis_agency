import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../components/sections/Hero'
import { Services } from '../components/sections/Services'
import { FeaturedWork } from '../components/sections/FeaturedWork'
import { Partnership } from '../components/sections/Partnership'
import { MountainSeparator } from '../components/ui/MountainSeparator'

import { Quotes } from '../components/sections/Quotes'

import { Vision } from '../components/sections/Vision'

import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { t } = useTranslation()
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

      {/* Bottom Section - Quotes */}
      <MountainSeparator topColor="bg-primary" bottomColor="bg-background" />
      <Quotes
        items={t('quotes.items', { returnObjects: true }) as string[]}
        backgroundColor="bg-background"
        textColor="text-foreground"
        className="mt-0"
      />
    </div>
  )
}
