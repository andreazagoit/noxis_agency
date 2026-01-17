'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { GlassScene } from '../3d/GlassScene'
import { Container } from '../layout/Container'
import { Button } from '../ui/button'

export function Hero() {
  const containerRef = useRef<HTMLElement>(null)

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
        {/* Section 1: Split Screen Hero */}
        <div
          className="w-full flex items-stretch h-screen"
        >
          {/* Left Column */}
          <div className="w-1/2 h-full border-r border-border flex flex-col justify-center px-12 md:px-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start gap-8"
            >
              <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-md leading-relaxed">
                We design immersive, motion-driven websites that command attention and guide users to act.
                Clean builds. Sharp strategy. Zero fluff.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="font-bold text-base"
                >
                  Let's Talk
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="w-1/2 h-full flex items-center justify-center px-6 md:px-12 p-32">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.85] tracking-tighter text-left text-foreground">
                Your Brand <br />
                <span className="text-primary">Deserves</span> <br />
                More Than <br />
                A Pretty <br />
                Website.
              </h1>
            </motion.div>
          </div>
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
                className="font-bold leading-[0.9] tracking-tighter mix-blend-difference uppercase"
                style={{ fontSize: 'clamp(2rem, 8vw, 10rem)' }}
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
                  className="font-bold tracking-tighter leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
                >
                  Unconventional
                  <br />
                  <span className="text-primary italic">by design.</span>
                </h3>
                <p
                  className="text-muted-foreground leading-tight font-light max-w-2xl"
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.5rem)' }}
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
                  className="font-bold tracking-tighter leading-none"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)' }}
                >
                  Ambitious
                  <br />
                  <span className="text-primary italic">by nature.</span>
                </h3>
                <p
                  className="text-muted-foreground leading-tight font-light ml-auto max-w-2xl"
                  style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2.5rem)' }}
                >
                  Our method focuses on perceived value and cinematic motion. We
                  transform traditional navigation into a{' '}
                  <span className="text-foreground">fluid journey</span>.
                </p>
              </div>
            </motion.div>
          </Container>
        </div>

        <div style={{ height: '20vh' }} />
      </div>
    </section>
  )
}
