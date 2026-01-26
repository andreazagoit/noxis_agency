import { useState, useEffect } from 'react'
import { Reveal } from '../ui/Reveal'
import { BentoWireframe } from '../3d/BentoWireframe'
import { Container } from '../layout/Container'
import { useTranslation } from 'react-i18next'

type GeometryType =
  | 'icosahedron'
  | 'octahedron'
  | 'torus'
  | 'torusKnot'
  | 'dodecahedron'

export function Services() {
  const { t } = useTranslation()
  // Simple check for mobile (can be refined or replaced with a proper hook library)
  const [isMobile, setIsMobile] = useState(false)

  const bentoItems: Array<{
    title: string
    description: string
    span: string
    accent?: boolean
    geometry: GeometryType
  }> = [
      {
        title: t('services.web_dev.title'),
        description: t('services.web_dev.description'),
        span: 'md:col-span-2 md:row-span-2',
        accent: true,
        geometry: 'icosahedron',
      },
      {
        title: t('services.ux_ui.title'),
        description: t('services.ux_ui.description'),
        span: 'md:col-span-1 md:row-span-2',
        geometry: 'torusKnot',
      },
      {
        title: t('services.mobile_dev.title'),
        description: t('services.mobile_dev.description'),
        span: 'md:col-span-1 md:row-span-1',
        geometry: 'torus',
      },
      {
        title: t('services.ai.title'),
        description: t('services.ai.description'),
        span: 'md:col-span-1 md:row-span-1',
        geometry: 'octahedron',
      },
      {
        title: t('services.marketing.title'),
        description: t('services.marketing.description'),
        span: 'md:col-span-1 md:row-span-1',
        geometry: 'dodecahedron',
      },
    ]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="services">
      <Container className="py-section">
        <Reveal width="100%" className="mb-element">
          <div className="mb-element">
            <h2 className="text-display mb-element">
              {t('services.title_line1')} <br />
              <span className="text-primary">{t('services.title_line2')}</span>
            </h2>

          </div>
        </Reveal>

        {/* Bento Grid - 3 columns, auto rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-element auto-rows-[240px]">
          {bentoItems.map((item, index) => (
            <Reveal
              key={index}
              width="100%"
              height="100%"
              delay={index * 0.1} // Staggered delay based on index
              duration={0.6}
              className={`
                                group relative overflow-hidden rounded-3xl
                                ${item.span}
                                ${item.accent
                  ? 'bg-gradient-to-br from-primary/80 to-primary text-primary-foreground border border-transparent hover:border-white'
                  : 'glass-panel hover:border-primary/50'
                }
                                transition-all duration-500
                            `}
              style={{ display: 'block', height: '100%' }} // Ensure Reveal wrapper behaves correctly in grid
            >
              {/* Content Layout */}
              <div className="relative h-full w-full">
                {/* 
                   Distinct Layouts based on Card Type & Screen Size:
                   1. Mobile (All): Text Top, 3D Bottom
                   2. Large (Desktop 2x2): Text Left, 3D Right
                   3. Tall (Desktop 1x2): Solid Top, Text Bottom
                   4. Small (Desktop 1x1): Text Left, 3D Right
                */}
                {(() => {
                  // On Mobile, everything is essentially "Small" but detailed
                  // On Desktop, preserve our verified layouts
                  const isLarge = !isMobile && item.span.includes('col-span-2')
                  const isTall = !isMobile && item.span.includes('row-span-2') && !isLarge
                  const isSmall = !isMobile && !isLarge && !isTall

                  return (
                    <>
                      {/* Text Content */}
                      <div
                        className={`
                          relative z-10 p-6 md:p-8 flex flex-col pointer-events-none
                          ${isMobile ? 'h-full justify-between' : ''}
                          ${isLarge ? 'h-full justify-center w-full md:w-1/2' : ''}
                          ${isTall ? 'h-full justify-end' : ''}
                          ${isSmall ? 'h-full justify-center w-1/2' : ''}
                        `}
                      >
                        <div className="pointer-events-auto">
                          <h3
                            className={`
                              text-card-title mb-3
                              ${isMobile ? 'text-2xl' : ''}
                              ${isLarge ? 'text-4xl md:text-6xl' : ''}
                              ${isTall ? 'text-2xl md:text-3xl' : ''}
                              ${isSmall ? 'text-lg md:text-xl' : ''}
                              ${item.accent ? '' : 'group-hover:text-primary transition-colors'}
                            `}
                          >
                            {item.title}
                          </h3>
                          <p
                            className={`
                              text-card-body line-clamp-4
                              ${item.accent ? 'text-white/80' : 'text-muted-foreground'}
                            `}
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* 3D Wireframe Positioning */}
                      <BentoWireframe
                        geometry={item.geometry}
                        accentColor={item.accent}
                        useGlass={true}
                        position={
                          isMobile ? [0, -1.5, 0] :   // Mobile: Bottom Center
                            isLarge ? [2, 0, 0] :       // Large: Right side
                              isTall ? [0, 1.5, 0] :      // Tall: Top
                                [1.5, 0, 0]                 // Small: Right Side
                        }
                      />
                    </>
                  )
                })()}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
