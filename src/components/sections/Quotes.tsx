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

    // Split text into words, keeping track of character positions
    const words = text.split(' ')
    let charIndex = 0

    return (
        <span className="inline">
            {words.map((word, wordIndex) => {
                const wordChars = word.split('')
                const wordStartIndex = charIndex
                charIndex += word.length + 1 // +1 for space

                return (
                    <span key={wordIndex} className="inline-block whitespace-nowrap">
                        {wordChars.map((char, i) => {
                            const globalCharIndex = wordStartIndex + i
                            const charPos = globalCharIndex / charCount
                            const overlap = 0.7

                            const appearStart = charPos * 0.5
                            const appearEnd = Math.min((charPos + overlap) * 0.5, 0.5)
                            const disappearStart = 0.5 + charPos * 0.5
                            const disappearEnd = Math.min(0.5 + (charPos + overlap) * 0.5, 1.0)

                            let charOpacity: MotionValue<number>
                            let charY: MotionValue<number>

                            if (isFirst) {
                                charOpacity = useTransform(progress, [disappearStart, disappearEnd], [1, 0], { ease: easeOut })
                                charY = useTransform(progress, [disappearStart, disappearEnd], [0, -20], { ease: easeOut })
                            } else if (isLast) {
                                charOpacity = useTransform(progress, [appearStart, appearEnd], [0, 1], { ease: easeOut })
                                charY = useTransform(progress, [appearStart, appearEnd], [20, 0], { ease: easeOut })
                            } else {
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
                                    {char}
                                </motion.span>
                            )
                        })}
                        {wordIndex < words.length - 1 && <span>&nbsp;</span>}
                    </span>
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
            >
                <Container className="relative z-20 grid place-items-center h-full w-full px-[10vw] md:px-[5vw]">
                    {/* Corner Markers */}
                    <PlusMarker className="top-[10vw] left-[10vw] md:top-[5vw] md:left-[5vw] -translate-x-1/2 -translate-y-1/2" />
                    <PlusMarker className="top-[10vw] right-[10vw] md:top-[5vw] md:right-[5vw] translate-x-1/2 -translate-y-1/2" />
                    <PlusMarker className="bottom-[10vw] left-[10vw] md:bottom-[5vw] md:left-[5vw] -translate-x-1/2 translate-y-1/2" />
                    <PlusMarker className="bottom-[10vw] right-[10vw] md:bottom-[5vw] md:right-[5vw] translate-x-1/2 translate-y-1/2" />

                    {/* Animated Texts */}
                    {items.map((text, i) => (
                        <motion.h2
                            key={i}
                            style={{ opacity: containerOpacities[i] }}
                            className="col-start-1 row-start-1 text-display text-center break-words w-full"
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
