'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { GlassScene } from '../3d/GlassScene'
import { Container } from '../layout/Container'
import { useLoading } from '../../context/LoadingContext'
import { CTAButton } from '../ui/CTAButton'
import { BrandSlider } from '../ui/BrandSlider'


export function Hero() {
  const containerRef = useRef<HTMLElement>(null)
  const [rotation, setRotation] = useState(0)
  const { isLoading } = useLoading()

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 90)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section ref={containerRef} className="relative w-full">
      {/* Sticky 3D Backdrop - MIDDLE Layer (0) on Mobile, TOP Layer (20) on Desktop */}
      <div
        className="sticky top-0 z-0 md:z-20 pointer-events-none"
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
          initial={{ opacity: 0 }}
          animate={isLoading ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <GlassScene />
        </motion.div>
      </div>

      {/* Scrolling Content Flow - BEHIND (No explicit Z here to allow children to use global Z context) */}
      <div className="relative" style={{ marginTop: '-100vh' }}>
        {/* Continuous Vertical Line */}
        <div
          className="absolute top-0 left-1/2 w-px h-full -translate-x-1/2 z-[-1]"
          style={{
            background: 'linear-gradient(to bottom, var(--border) 80%, transparent 100%)'
          }}
        />

        {/* Section 1: Split Screen Hero */}
        <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
          <Container className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 items-center">
            {/* Title - First on mobile, Right on desktop */}
            <div className="flex items-center md:pl-0 order-1 md:order-2">
              <div className="w-full">
                <h1 className="text-display text-left text-foreground leading-[0.85] tracking-tight">
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={isLoading ? { y: "100%" } : { y: 0 }}
                      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
                    >
                      Your Brand
                    </motion.div>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={isLoading ? { y: "100%" } : { y: 0 }}
                      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.4 }}
                    >
                      <span className="text-primary font-medium">Deserves</span> More
                    </motion.div>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={isLoading ? { y: "100%" } : { y: 0 }}
                      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.5 }}
                    >
                      Than a Pretty
                    </motion.div>
                  </div>
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={isLoading ? { y: "100%" } : { y: 0 }}
                      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.6 }}
                    >
                      Website.
                    </motion.div>
                  </div>
                </h1>
              </div>
            </div>

            {/* Description - Second on mobile, Left on desktop */}
            <div className="flex flex-col justify-center md:pr-0 order-2 md:order-1">
              <div className="flex flex-col items-start gap-4 md:gap-6 md:max-w-[50%]">
                <p className="text-body text-left text-muted-foreground font-medium flex flex-wrap gap-x-[0.35em] gap-y-0">
                  {"Designing immersive, motion-driven experiences that command attention and guide users to act. Clean builds. Sharp strategy. Zero limits.".split(' ').map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden py-1 -my-1">
                      <motion.span
                        className="inline-block"
                        initial={{ y: "100%", opacity: 0 }}
                        animate={isLoading ? { y: "100%", opacity: 0 } : { y: 0, opacity: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.33, 1, 0.68, 1],
                          delay: 0.8 + (i * 0.05)
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
                </p>
                <div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={isLoading ? { y: 20, opacity: 0 } : { y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 1.2 }}
                  >
                    <CTAButton
                      variant="primary"
                      className="mt-8 md:mt-4"
                    >
                      Start a Project
                    </CTAButton>
                  </motion.div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <BrandSlider />



        <div className="w-full h-auto flex items-center justify-center pt-32 md:pt-48">
          <Container className="py-section flex items-center justify-center">
            <h2 className="text-display text-center">
              We Are <span className="text-primary">Good</span> At
            </h2>
          </Container>
        </div>

        {/* Section 5: The Core (Graduated Target) */}
        <div className="w-full h-screen flex items-center justify-center relative overflow-hidden">
          {/* Horizontal Line - FULL WIDTH */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-border -translate-y-1/2 z-[-1]" />

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
                  const x = (Math.sin((angle * Math.PI) / 180) * radius).toFixed(5)
                  const y = (-Math.cos((angle * Math.PI) / 180) * radius).toFixed(5)
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
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-primary"
                      animate={{ scale: [0.5, 1.2, 1.8], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0 }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary relative z-10" />
                  </div>
                  <span className="text-caption">Web</span>
                </div>

                {/* Mobile - Bottom on desktop */}
                <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-primary"
                      animate={{ scale: [0.5, 1.2, 1.8], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary relative z-10" />
                  </div>
                  <span className="text-caption">Mobile</span>
                </div>

                {/* Design - Left on desktop */}
                <div className="absolute -top-8 -left-8 md:top-1/2 md:-left-10 md:-translate-x-full md:-translate-y-1/2 flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-primary"
                      animate={{ scale: [0.5, 1.2, 1.8], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary relative z-10" />
                  </div>
                  <span className="text-caption">Design</span>
                </div>

                {/* Strategy - Right on desktop */}
                <div className="absolute -bottom-8 -right-8 md:top-1/2 md:-right-10 md:translate-x-full md:-translate-y-1/2 flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="absolute w-4 h-4 rounded-full bg-primary"
                      animate={{ scale: [0.5, 1.2, 1.8], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1.5 }}
                    />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary relative z-10" />
                  </div>
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
