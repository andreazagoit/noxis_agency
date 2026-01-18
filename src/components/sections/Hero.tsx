'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { GlassScene } from '../3d/GlassScene'
import { Container } from '../layout/Container'
import { Button } from '../ui/button'

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
          <Container className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-[10vw] items-center md:items-stretch py-8 md:py-0">
            {/* Title - First on mobile, Right on desktop */}
            <div className="flex items-center md:pl-0 order-1 md:order-2 mb-6 md:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full"
              >
                <h1 className="text-9xl font-heading font-bold uppercase leading-[0.85] text-left text-foreground">
                  Your Brand <br />
                  <span className="text-primary">Deserves</span> More<br />
                  Than A Pretty <br />
                  Website.
                </h1>
              </motion.div>
            </div>

            {/* Description - Second on mobile, Left on desktop */}
            <div className="flex flex-col justify-center md:pr-0 order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col items-start gap-6"
              >
                <p className="text-lg text-muted-foreground font-medium leading-relaxed text-left">
                  We design immersive, motion-driven websites that command attention and guide users to act.
                  Clean builds. Sharp strategy. Zero fluff.
                </p>
                <Button
                  size="lg"
                  className="font-bold text-base"
                >
                  Let's Talk
                </Button>
              </motion.div>
            </div>
          </Container>
        </div>

        {/* Section 2: Core Value Prop */}
        <div
          className="w-full flex items-center justify-center"
          style={{
            minHeight: '100vh',
            paddingTop: '8rem',
            paddingBottom: '8rem',
          }}
        >
          <Container className="flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, margin: '-20%' }}
              className="w-full text-center"
            >
              <h2
                className="font-heading font-bold text-8xl leading-[0.9] mix-blend-difference uppercase"
              >
                We don't build
                <br />
                <span className="text-muted-foreground opacity-50">
                  websites.
                </span>
                <br />
                <span className="text-primary italic">We build assets</span>
                <br />
                that define value.
              </h2>
            </motion.div>
          </Container>
        </div>

        {/* Section 3: Manifesto Details */}
        <div
          className="w-full"
          style={{
            minHeight: '100vh',
            paddingTop: 'clamp(4rem, 10vw, 16rem)',
            paddingBottom: 'clamp(4rem, 10vw, 16rem)',
          }}
        >
          <Container
            className="flex flex-col items-center"
            style={{ gap: 'clamp(4rem, 10vw, 16rem)' }}
          >
            {/* Manifesto Block 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-5xl w-full flex flex-col md:flex-row items-start"
              style={{ gap: 'clamp(2rem, 5vw, 6rem)' }}
            >
              <div
                className="flex-1"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                }}
              >
                <h3
                  className="font-heading font-bold text-6xl leading-none"
                >
                  Unconventional
                  <br />
                  <span className="text-primary italic">by design.</span>
                </h3>
                <p
                  className="text-muted-foreground text-2xl leading-tight font-light max-w-2xl"
                >
                  In a world of templates, we chose to be the exception. Noxis
                  combines liquid aesthetics with rigid engineering to create
                  experiences that feel{' '}
                  <span className="text-foreground">expensive</span>.
                </p>
              </div>
            </motion.div>

            {/* Manifesto Block 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-5xl w-full flex flex-col md:flex-row-reverse items-start"
              style={{ gap: 'clamp(2rem, 5vw, 6rem)' }}
            >
              <div
                className="flex-1 text-right"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                }}
              >
                <h3
                  className="font-heading font-bold text-6xl leading-none"
                >
                  Ambitious
                  <br />
                  <span className="text-primary italic">by nature.</span>
                </h3>
                <p
                  className="text-muted-foreground text-2xl leading-tight font-light ml-auto max-w-2xl"
                >
                  Our method focuses on perceived value and cinematic motion. We
                  transform traditional navigation into a{' '}
                  <span className="text-foreground">fluid journey</span>.
                </p>
              </div>
            </motion.div>
          </Container>
        </div>

        {/* Section 4: Lead Text */}
        <div className="w-full h-auto flex items-center justify-center">
          <Container className="py-24 flex items-center justify-center">
            <h2 className="font-heading font-bold text-9xl uppercase text-center leading-[0.8]">
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
                {/* Development - Top on desktop, Top-Right on mobile */}
                <div className="absolute -top-8 -right-8 md:-top-10 md:right-auto md:left-1/2 md:-translate-x-1/2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-bold text-xs md:text-sm tracking-[0.2em] uppercase">Development</span>
                </div>

                {/* E-Commerce - Bottom on desktop, Bottom-Left on mobile */}
                <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:left-1/2 md:-translate-x-1/2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-bold text-xs md:text-sm tracking-[0.2em] uppercase">E-Commerce</span>
                </div>

                {/* Design - Left on desktop, Top-Left on mobile */}
                <div className="absolute -top-8 -left-8 md:top-1/2 md:-left-10 md:-translate-x-full md:-translate-y-1/2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-bold text-xs md:text-sm tracking-[0.2em] uppercase">Design</span>
                </div>

                {/* SEO - Right on desktop, Bottom-Right on mobile */}
                <div className="absolute -bottom-8 -right-8 md:top-1/2 md:-right-10 md:translate-x-full md:-translate-y-1/2 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="font-bold text-xs md:text-sm tracking-[0.2em] uppercase">SEO</span>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
