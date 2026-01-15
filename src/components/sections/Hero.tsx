'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { GlassScene } from '../3d/GlassScene'

export function Hero() {
    const containerRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Create a smoothed version of scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    // Subtly scale and move the 3D scene based on SMOOTHED scroll
    const sceneScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1.2, 0.8])
    const sceneY = useTransform(smoothProgress, [0, 1], ["0%", "10%"]) // Controlled drift
    const sceneBlur = useTransform(smoothProgress, [0, 0.8, 1], ["blur(0px)", "blur(0px)", "blur(10px)"])

    return (
        <section ref={containerRef} className="relative w-full">
            {/* Sticky 3D Backdrop - Fixed in viewport while sections scroll through */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 pointer-events-none">
                <motion.div
                    style={{ scale: sceneScale, y: sceneY, filter: sceneBlur }}
                    className="w-full h-full flex items-center justify-center"
                >
                    <GlassScene />
                </motion.div>
            </div>

            {/* Scrolling Content Flow */}
            <div className="relative z-10 -mt-[100vh]">

                {/* Section 1: Brand Intro */}
                <div className="h-screen w-full flex flex-col items-center justify-center px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center"
                    >
                        <h1
                            className="text-[15vw] md:text-[18vw] font-bold tracking-tighter text-transparent mix-blend-difference leading-[0.8]"
                            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.8)' }}
                        >
                            NOXIS
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="mt-8 text-sm md:text-base font-medium tracking-[0.8em] uppercase text-primary text-center w-full"
                        >
                            Digital Architecture & Alchemy
                        </motion.p>
                    </motion.div>
                </div>

                {/* Section 2: Core Value Prop - High Contrast / Bold */}
                <div className="min-h-screen w-full flex items-center justify-center px-6 py-48">
                    <motion.div
                        initial={{ opacity: 0, y: 80 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: false, margin: "-20%" }}
                        className="max-w-[90rem] text-center"
                    >
                        <h2 className="text-6xl md:text-[8rem] font-bold leading-[0.9] tracking-tighter mix-blend-difference uppercase">
                            We don't build<br />
                            <span className="text-muted-foreground opacity-50">websites.</span><br />
                            <span className="text-primary italic">We build assets</span><br />
                            that define value.
                        </h2>
                    </motion.div>
                </div>

                {/* Section 3: Manifesto Details - Clean, Minimalist Layout */}
                <div className="min-h-screen w-full flex flex-col items-center gap-64 py-64 px-6">

                    {/* Manifesto Block 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-5xl w-full flex flex-col md:flex-row gap-24 items-start"
                    >
                        <div className="flex-1 space-y-12">
                            <h3 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                                Unconventional<br />
                                <span className="text-primary italic">by design.</span>
                            </h3>
                            <p className="text-2xl md:text-4xl text-muted-foreground leading-tight font-light text-balance max-w-2xl">
                                In a world of templates, we chose to be the exception.
                                Noxis combines liquid aesthetics with rigid engineering to create
                                experiences that feel <span className="text-foreground">expensive</span>.
                            </p>
                        </div>
                    </motion.div>

                    {/* Manifesto Block 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-5xl w-full flex flex-col md:flex-row-reverse gap-24 items-start"
                    >
                        <div className="flex-1 space-y-12 text-right">
                            <h3 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
                                Ambitious<br />
                                <span className="text-primary italic">by nature.</span>
                            </h3>
                            <p className="text-2xl md:text-4xl text-muted-foreground leading-tight font-light text-balance ml-auto max-w-2xl">
                                Our method focuses on perceived value and cinematic motion.
                                We transform traditional navigation into a <span className="text-foreground">fluid journey</span>.
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="h-[20vh]" />
            </div>


        </section>
    )
}
