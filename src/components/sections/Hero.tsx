'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { GlassScene } from '../3d/GlassScene'
import { Container } from '../layout/Container'


export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 90)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <section ref={containerRef} className="relative w-full">
      {/* Sticky 3D Backdrop - ON TOP NOW */}
      <div
        className="sticky top-0 z-20 pointer-events-none"
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // Gradient fade mask at the bottom
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 80%, transparent 100%)',
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <GlassScene scrollYProgress={smoothProgress} />
        </motion.div>
      </div>

      {/* Scrolling Content Flow - BEHIND */}
      <div className="relative z-10" style={{ marginTop: '-100vh' }}>
        {/* Continuous Vertical Line */}
        <div
          className="absolute top-0 left-1/2 w-px h-full -translate-x-1/2"
          style={{
            background: 'linear-gradient(to bottom, var(--border) 80%, transparent 100%)'
          }}
        />

        {/* Section 1: Split Screen Hero */}
        <div className="w-full min-h-screen flex items-center">
          <Container className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center py-8 md:py-0">
            {/* Title - First on mobile, Right on desktop */}
            <div className="flex items-center md:pl-0 order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <h1 className="text-display text-left text-foreground leading-[0.85] tracking-tight">
                  Elevating the <br />
                  digital through<br />
                  <span className="text-primary font-medium">beauty</span> & <span className="text-primary font-medium">ethics</span>.
                </h1>
              </motion.div>
            </div>

            {/* Description - Second on mobile, Left on desktop */}
            <div className="flex flex-col justify-center md:pr-0 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-start gap-6 md:max-w-[50%]"
              >
                <p className="text-body text-left text-muted-foreground font-medium">
                  We design and develop premium digital experiences where beauty, functionality, and ethics coexist.
                  Impacting the world through quality.
                </p>
                <a
                  href="mailto:hello@noxis.agency"
                  className="inline-block px-12 py-4 bg-primary text-primary-foreground font-bold text-caption rounded-full hover:scale-105 transition-transform duration-300 mt-8"
                >
                  Start a Project
                </a>
              </motion.div>
            </div>
          </Container>
        </div>



        <div className="w-full h-auto flex items-center justify-center">
          <Container className="py-section flex items-center justify-center">
            <h2 className="text-display text-center">
              We Are <span className="text-primary">Good</span> At
            </h2>
          </Container>
        </div>

        {/* Section 5: The Core (Graduated Target) */}
        <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
          {/* Horizontal Line - FULL WIDTH */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2" />

          <Container className="relative h-full w-full flex items-center justify-center">
            {/* Graduated Target Circle */}
            <div className="relative w-[280px] h-[280px] md:w-[55vh] md:h-[55vh]">
              {/* Rotating Layer */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: rotation }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* The Ring */}
                <div className="absolute inset-0 rounded-full border-[3px] border-dashed border-primary/60" />

                {/* Degree Ticks */}
                {[...Array(12)].map((_, i) => {
                  // Calculate position as percentage of container (circle) size
                  const angle = i * 30
                  const radius = 50 // percentage of container size - exactly on edge
                  const x = Math.sin((angle * Math.PI) / 180) * radius
                  const y = -Math.cos((angle * Math.PI) / 180) * radius
                  return (
                    <div
                      key={i}
                      className="absolute w-1 h-3 rounded-full bg-primary"
                      style={{
                        top: `calc(50% + ${y}%)`,
                        left: `calc(50% + ${x}%)`,
                        transform: `translate(-50%, -50%) rotate(${angle}deg)`
                      }}
                    />
                  )
                })}

                {/* Cardinal Dots Removed */}
              </motion.div>

              {/* Static Labels */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Web - Top on desktop */}
                <div className="absolute -top-8 -right-8 md:-top-10 md:right-auto md:left-1/2 md:-translate-x-1/2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-caption">Web</span>
                </div>

                {/* Mobile - Bottom on desktop */}
                <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-caption">Mobile</span>
                </div>

                {/* Design - Left on desktop */}
                <div className="absolute -top-8 -left-8 md:top-1/2 md:-left-10 md:-translate-x-full md:-translate-y-1/2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-caption">Design</span>
                </div>

                {/* Strategy - Right on desktop */}
                <div className="absolute -bottom-8 -right-8 md:top-1/2 md:-right-10 md:translate-x-full md:-translate-y-1/2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-caption">Strategy</span>
                </div>
              </div>
            </div>
          </Container>
        </div>


      </div>
    </section>
  )
}
