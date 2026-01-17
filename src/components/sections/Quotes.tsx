'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue, easeOut } from 'framer-motion'
import { Container } from '../layout/Container'
import { cn } from '../../lib/utils'

interface QuotesProps {
    items?: string[]
    backgroundColor?: string
    textColor?: string
    className?: string
}

const PlusMarker = ({ className }: { className?: string }) => (
    <div className={cn("absolute w-8 h-8", className)}>
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-white -translate-x-1/2" />
    </div>
)

// Animated text with letter-by-letter reveal (opacity + Y translation)
function AnimatedText({
    text,
    progress,
    isFirst,
    isLast
}: {
    text: string
    progress: MotionValue<number>
    isFirst: boolean
    isLast: boolean
}) {
    const chars = text.split('')
    const charCount = chars.length

    return (
        <span className="inline-block overflow-hidden">
            {chars.map((char, i) => {
                // Normalized position in the text (0 to 1)
                const charPos = i / charCount
                const overlap = 0.7 // Higher overlap = more letters animating together

                // Appear phase (0 to 0.5 of progress) - clamped to segment
                const appearStart = charPos * 0.5
                const appearEnd = Math.min((charPos + overlap) * 0.5, 0.5)

                // Disappear phase (0.5 to 1 of progress) - clamped to segment
                const disappearStart = 0.5 + charPos * 0.5
                const disappearEnd = Math.min(0.5 + (charPos + overlap) * 0.5, 1.0)

                let charOpacity: MotionValue<number>
                let charY: MotionValue<number>

                if (isFirst) {
                    // First item: start visible, only disappear
                    charOpacity = useTransform(progress, [disappearStart, disappearEnd], [1, 0], { ease: easeOut })
                    charY = useTransform(progress, [disappearStart, disappearEnd], [0, -20], { ease: easeOut })
                } else if (isLast) {
                    // Last item: only appear, stay visible
                    charOpacity = useTransform(progress, [appearStart, appearEnd], [0, 1], { ease: easeOut })
                    charY = useTransform(progress, [appearStart, appearEnd], [20, 0], { ease: easeOut })
                } else {
                    // Middle items: appear then disappear
                    charOpacity = useTransform(
                        progress,
                        [appearStart, appearEnd, disappearStart, disappearEnd],
                        [0, 1, 1, 0]
                    )
                    charY = useTransform(
                        progress,
                        [appearStart, appearEnd, disappearStart, disappearEnd],
                        [20, 0, 0, -20]
                    )
                }

                return (
                    <motion.span
                        key={i}
                        style={{
                            opacity: charOpacity,
                            y: charY,
                            display: 'inline-block',
                            willChange: 'transform, opacity'
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                )
            })}
        </span>
    )
}


export function Quotes({
    items = ["Text 1", "Text 2", "Text 3", "Text 4"],
    backgroundColor = "bg-black",
    textColor = "text-white",
    className
}: QuotesProps) {
    const sectionRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    })

    const itemCount = items.length

    // Create progress transforms for each item's segment
    // No gaps - seamless transitions
    const itemProgresses = items.map((_, i) => {
        const segmentStart = i / itemCount
        const segmentEnd = (i + 1) / itemCount
        return useTransform(scrollYProgress, [segmentStart, segmentEnd], [0, 1])
    })

    // Container opacity - overlapping at boundaries for seamless transitions
    const containerOpacities = items.map((_, i) => {
        const segmentStart = i / itemCount
        const segmentEnd = (i + 1) / itemCount
        const overlap = 0.02 // Small overlap at boundaries
        const isFirst = i === 0
        const isLast = i === itemCount - 1

        if (isFirst) {
            // First: visible from start, fade out at end
            return useTransform(scrollYProgress, [segmentStart, segmentEnd - overlap, segmentEnd], [1, 1, 0])
        }
        if (isLast) {
            // Last: fade in at start, stay visible
            return useTransform(scrollYProgress, [segmentStart - overlap, segmentStart, segmentEnd], [0, 1, 1])
        }
        // Middle: fade in at start (overlapping with previous), fade out at end (overlapping with next)
        return useTransform(scrollYProgress, [segmentStart - overlap, segmentStart, segmentEnd - overlap, segmentEnd], [0, 1, 1, 0])
    })

    return (
        <section
            ref={sectionRef}
            className={cn(
                "w-full relative",
                backgroundColor,
                textColor,
                className
            )}
            style={{
                height: `${itemCount * 100}vh`
            }}
        >
            {/* Sticky Container */}
            <div
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center"
                style={{ paddingBlock: "max(0px, calc((100vw - 90rem) / 2))" }}
            >
                <Container className="relative z-20 flex flex-col items-center justify-center h-full w-full">
                    {/* Corner Markers */}
                    <PlusMarker className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
                    <PlusMarker className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
                    <PlusMarker className="bottom-0 left-0 -translate-x-1/2 translate-y-1/2" />
                    <PlusMarker className="bottom-0 right-0 translate-x-1/2 translate-y-1/2" />

                    {/* Animated Texts */}
                    {items.map((text, i) => (
                        <motion.h2
                            key={i}
                            style={{ opacity: containerOpacities[i] }}
                            className="absolute text-5xl md:text-8xl font-heading font-black uppercase text-center break-words max-w-[90vw]"
                        >
                            <AnimatedText
                                text={text}
                                progress={itemProgresses[i]}
                                isFirst={i === 0}
                                isLast={i === items.length - 1}
                            />
                        </motion.h2>
                    ))}
                </Container>
            </div>
        </section>
    )
}
