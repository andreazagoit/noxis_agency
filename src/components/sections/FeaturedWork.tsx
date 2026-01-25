'use client'

import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Container } from '../layout/Container'
import { GlassCard } from '../ui/glass-card'
import { GlassBadge } from '../ui/glass-badge'
import { cn } from '../../lib/utils'
import { Reveal } from '../ui/Reveal'

interface Stage {
    id: string;
    title: string;
    description: string;
    items: string[];
}

const PROCESS_STEPS: Stage[] = [
    {
        id: "01",
        title: "Discovery",
        description: "An immersive deep-dive into your brand's core. We research market trends, define specific goals, and align every digital stone with your ultimate ambition.",
        items: ["Creative Brief", "Brand Research", "Mood Boards"]
    },
    {
        id: "02",
        title: "Concept",
        description: "Translating discovery into a tangible vision. We define the visual and artistic direction that will set your product apart from the competition.",
        items: ["Visual Direction", "Art Direction", "Storyboarding"]
    },
    {
        id: "03",
        title: "Design",
        description: "Crafting a premium user experience with surgical precision. Every interaction and pixel is designed to convey luxury and technical excellence.",
        items: ["UI/UX Craft", "Motion Design", "Interaction Design"]
    },
    {
        id: "04",
        title: "Develop",
        description: "Forging digital masterpieces with cutting-edge tech. We build robust, scalable, and immersive products that push the boundaries of the web.",
        items: ["Creative Coding", "WebGL & 3D", "Animations"]
    },
    {
        id: "05",
        title: "Polish",
        description: "The obsessive pursuit of perfection. We refine micro-interactions and optimize performance to ensure a flawless experience on every device.",
        items: ["Micro-interactions", "Performance", "Pixel Perfect"]
    },
    {
        id: "06",
        title: "Launch",
        description: "Ensuring a monumental entry into the market. We manage the launch process and partner for long-term evolution and digital legacy.",
        items: ["Go Live", "Case Study", "Awards Submit"]
    }
]

export function FeaturedWork() {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    })


    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <section
            ref={containerRef}
            className="relative py-48 md:py-64 bg-primary overflow-hidden"
            id="methodology"
        >
            <Container>
                <div className="flex flex-col items-center mb-32 text-center">
                    <Reveal width="100%">
                        <div className="flex flex-col items-center">
                            <span className="text-caption mb-4 text-white selection:bg-white selection:text-primary">
                                From chaos to clarity
                            </span>
                            <h2 className="text-display text-white selection:bg-white selection:text-primary">
                                The <span className="italic">Process</span><span className="opacity-30">.</span>
                            </h2>
                        </div>
                    </Reveal>
                </div>

                <div className="relative max-w-6xl mx-auto">

                    <div className="space-y-8 md:space-y-24 relative">
                        {PROCESS_STEPS.map((step, index) => (
                            <TimelineStep key={step.id} step={step} index={index} isLast={index === PROCESS_STEPS.length - 1} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function TimelineStep({ step, index, isLast }: { step: typeof PROCESS_STEPS[0], index: number, isLast: boolean }) {
    const isEven = index % 2 === 1

    return (
        <div className={cn(
            "relative flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-0 pl-16 md:pl-0",
            isEven ? "md:flex-row-reverse" : ""
        )}>
            {/* Node Marker with Ripple */}
            <div className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <motion.div
                    className="absolute w-6 h-6 rounded-full bg-white"
                    animate={{ scale: [0.5, 1.2, 1.8], opacity: [0, 0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: index * 0.3 }}
                />
                <div className="w-3 h-3 rounded-full bg-white relative z-10" />
            </div>

            {/* Connecting Line to Next Step */}
            {!isLast && (
                <div className="absolute left-4 md:left-1/2 top-1/2 w-[1px] bg-white/30 -translate-x-1/2 h-[calc(100%+2rem)] md:h-[calc(100%+6rem)] z-0" />
            )}

            {/* Card Wrapper handled by div to avoid Reveal style conflict */}
            <div className="w-full md:w-[46%] group">
                <Reveal
                    width="100%"
                    delay={0.1}
                    yOffset={40}
                >
                    <GlassCard>
                        {/* Step Number - Large Accent */}
                        <span className="absolute top-6 right-8 font-heading text-[5rem] md:text-[7rem] leading-none text-white/10 dark:text-black/10 group-hover:text-white/20 dark:group-hover:text-black/20 transition-colors duration-300 select-none">
                            {step.id}
                        </span>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                {step.title}
                            </h3>

                            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-6">
                                {step.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {step.items.map((item) => (
                                    <GlassBadge key={item}>
                                        {item}
                                    </GlassBadge>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                </Reveal>
            </div>

            {/* Spacer */}
            <div className="hidden md:block w-[46%]" />
        </div>
    )
}
