import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { GlassScene } from '../3d/GlassScene'

export function HeroManifesto() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const yText = useTransform(scrollYProgress, [0, 1], [0, 200])
    const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0])

    return (
        <section ref={containerRef} className="relative w-full">
            {/* Hero Part */}
            <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
                <GlassScene />

                <motion.div
                    style={{ y: yText, opacity: opacityText }}
                    className="z-10 text-center px-4"
                >
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-7xl md:text-9xl font-bold tracking-tighter mix-blend-difference text-white"
                    >
                        NOXIS
                    </motion.h1>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="mt-6 text-xl md:text-2xl font-light tracking-wide text-white/80 mix-blend-difference"
                    >
                        The Art of Digital Alchemy.
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-muted-foreground"
                >
                    Scroll to Explore
                </motion.div>
            </div>

            {/* Manifesto Part - Sticky Scroll */}
            <div className="min-h-screen bg-background flex items-center justify-center py-24 px-6">
                <div className="max-w-4xl mx-auto text-left">
                    <h2 className="text-4xl md:text-6xl font-medium leading-tight text-balance">
                        We don't build websites.<br />
                        <span className="text-muted-foreground">We build digital assets that define value.</span>
                        <br className="my-4 block" />
                        Designed for the <span className="text-primary italic">unconventional</span>, <br />
                        engineered for the <span className="text-primary italic">ambitious</span>.
                    </h2>

                    <p className="mt-12 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                        In a world of templates, we chose to be the exception.
                        Noxis combines <strong>liquid aesthetics</strong> with <strong>rigid engineering</strong> to create
                        web experiences that feel expensive, work flawlessly, and convert instantly.
                    </p>
                </div>
            </div>
        </section>
    )
}
