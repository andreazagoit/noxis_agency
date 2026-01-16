'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { GlassScene } from '../3d/GlassScene'
import { Container } from '../layout/Container'

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
      {/* Sticky 3D Backdrop - takes full viewport, centered */}
      <div
        className="sticky top-0 z-0 pointer-events-none"
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

      {/* Scrolling Content Flow */}
      <div className="relative z-10" style={{ marginTop: '-100vh' }}>
        {/* Section 1: Brand Intro */}
        <div
          className="w-full flex flex-col items-center justify-center"
          style={{ height: '100vh' }}
        >
          <Container className="flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1
                className="font-bold tracking-tighter text-transparent mix-blend-difference leading-[0.8]"
                style={{
                  fontSize: 'clamp(4rem, 15vw, 20rem)',
                  WebkitTextStroke: '2px rgba(255,255,255,0.8)',
                }}
              >
                NOXIS
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mt-8 font-medium uppercase text-primary text-center w-full"
                style={{
                  fontSize: 'clamp(0.625rem, 1vw, 1rem)',
                  letterSpacing: '0.5em',
                }}
              >
                Digital Architecture & Alchemy
              </motion.p>
            </motion.div>
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
