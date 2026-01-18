'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { Container } from '../layout/Container'
import { cn } from '../../lib/utils'

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
        offset: ["start end", "end start"]
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
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-black/60"
                    >
                        How we forge
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[3rem] md:text-[5rem] font-bold text-black leading-tight tracking-tighter"
                    >
                        Liquid Methodology<span className="opacity-20">.</span>
                    </motion.h2>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Vertical Timeline Axis */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-black/10 -translate-x-1/2 hidden md:block" />
                    <motion.div
                        style={{ scaleY }}
                        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-black origin-top -translate-x-1/2 hidden md:block"
                    />

                    <div className="space-y-48 relative">
                        {PROCESS_STEPS.map((step, index) => (
                            <TimelineStep key={step.id} step={step} index={index} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function TimelineStep({ step, index }: { step: typeof PROCESS_STEPS[0], index: number }) {
    const isEven = index % 2 === 1
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div className={cn(
            "relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0",
            isEven ? "md:flex-row-reverse" : ""
        )}>
            {/* Node Marker */}
            <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-black -translate-x-1/2 z-20 hidden md:block">
                <div className="absolute inset-0 rounded-full bg-black animate-ping opacity-20" />
            </div>

            {/* Card Wrapper */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? 50 : -50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full md:w-[46%] relative group"
            >
                {/* Technical Sheet Card */}
                <div className={cn(
                    "relative p-8 md:p-12 border-[0.5px] transition-all duration-700 overflow-hidden",
                    "bg-black/2 dark:bg-white/5 backdrop-blur-[2px]",
                    isHovered ? "border-black/30 dark:border-white/30" : "border-black/10 dark:border-white/10"
                )}>
                    {/* Liquid Glow Accent */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 0.15, scale: 1.2 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute -top-1/2 -left-1/2 w-full h-full bg-black dark:bg-white rounded-full blur-[100px] pointer-events-none"
                            />
                        )}
                    </AnimatePresence>

                    {/* Corner Markers */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-black/20 dark:border-white/20" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-black/20 dark:border-white/20" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-black/20 dark:border-white/20" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-black/20 dark:border-white/20" />

                    {/* Step ID (Technical Look) */}
                    <div className="flex items-baseline gap-4 mb-4">
                        <span className="font-heading text-6xl md:text-8xl text-black/20 dark:text-white/20 group-hover:text-black/40 dark:group-hover:text-white/40 transition-colors duration-500">
                            {step.id}
                        </span>
                        <div className="h-[1px] flex-grow bg-black/10 dark:bg-white/10" />
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-black dark:text-white mb-6 uppercase tracking-tighter">
                        {step.title}
                    </h3>

                    <p className="text-black/60 dark:text-zinc-400 leading-relaxed text-lg font-medium mb-10 text-pretty">
                        {step.description}
                    </p>

                    {/* Points List */}
                    <ul className="space-y-4">
                        {step.items.map((item) => (
                            <li key={item} className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-zinc-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                                <span className="w-4 h-[1px] bg-black/20 dark:bg-white/20" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>

            {/* Spacer for Desktop Alignment */}
            <div className="hidden md:block w-[46%]" />
        </div>
    )
}
