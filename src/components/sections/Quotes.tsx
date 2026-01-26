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
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-foreground -translate-y-1/2" />
        <div className="absolute left-1/2 top-0 h-full w-[2px] bg-foreground -translate-x-1/2" />
    </div>
)

// Individual character component to handle its own transforms
function Char({
    char,
    index,
    total,
    progress,
    isFirst,
    isLast
}: {
    char: string
    index: number
    total: number
    progress: MotionValue<number>
    isFirst: boolean
    isLast: boolean
}) {
    const charPos = index / total
    const overlap = 0.7

    const appearStart = charPos * 0.5
    const appearEnd = Math.min((charPos + overlap) * 0.5, 0.5)
    const disappearStart = 0.5 + charPos * 0.5
    const disappearEnd = Math.min(0.5 + (charPos + overlap) * 0.5, 1.0)

    const charOpacity = useTransform(
        progress,
        isFirst ? [disappearStart, disappearEnd] :
            isLast ? [appearStart, appearEnd] :
                [appearStart, appearEnd, disappearStart, disappearEnd],
        isFirst ? [1, 0] :
            isLast ? [0, 1] :
                [0, 1, 1, 0],
        { ease: easeOut }
    )

    const charY = useTransform(
        progress,
        isFirst ? [disappearStart, disappearEnd] :
            isLast ? [appearStart, appearEnd] :
                [appearStart, appearEnd, disappearStart, disappearEnd],
        isFirst ? [0, -20] :
            isLast ? [20, 0] :
                [20, 0, 0, -20],
        { ease: easeOut }
    )

    return (
        <motion.span
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
}

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
        <span className="inline">
            {chars.map((char, i) => (
                <Char
                    key={`${text}-${i}`}
                    char={char}
                    index={i}
                    total={charCount}
                    progress={progress}
                    isFirst={isFirst}
                    isLast={isLast}
                />
            ))}
        </span>
    )
}

function QuoteItem({
    text,
    index,
    total,
    scrollYProgress,
    isFirst,
    isLast
}: {
    text: string
    index: number
    total: number
    scrollYProgress: MotionValue<number>
    isFirst: boolean
    isLast: boolean
}) {
    const segmentStart = index / total
    const segmentEnd = (index + 1) / total
    const itemProgress = useTransform(scrollYProgress, [segmentStart, segmentEnd], [0, 1])

    const overlap = 0.02
    const containerOpacity = useTransform(
        scrollYProgress,
        isFirst ? [segmentStart, segmentEnd - overlap, segmentEnd] :
            isLast ? [segmentStart - overlap, segmentStart, segmentEnd] :
                [segmentStart - overlap, segmentStart, segmentEnd - overlap, segmentEnd],
        isFirst ? [1, 1, 0] :
            isLast ? [0, 1, 1] :
                [0, 1, 1, 0]
    )

    return (
        <motion.h2
            style={{ opacity: containerOpacity }}
            className="col-start-1 row-start-1 text-display text-center break-words w-full"
        >
            <AnimatedText
                text={text}
                progress={itemProgress}
                isFirst={isFirst}
                isLast={isLast}
            />
        </motion.h2>
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
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
                <Container className="relative z-20 grid place-items-center h-full w-full px-[10vw] md:px-[5vw]">
                    {/* Corner Markers */}
                    <PlusMarker className="top-[10vw] left-[10vw] md:top-[5vw] md:left-[5vw] -translate-x-1/2 -translate-y-1/2" />
                    <PlusMarker className="top-[10vw] right-[10vw] md:top-[5vw] md:right-[5vw] translate-x-1/2 -translate-y-1/2" />
                    <PlusMarker className="bottom-[10vw] left-[10vw] md:bottom-[5vw] md:left-[5vw] -translate-x-1/2 translate-y-1/2" />
                    <PlusMarker className="bottom-[10vw] right-[10vw] md:bottom-[5vw] md:right-[5vw] translate-x-1/2 translate-y-1/2" />

                    {/* Animated Texts */}
                    {items.map((text, i) => (
                        <QuoteItem
                            key={i}
                            text={text}
                            index={i}
                            total={itemCount}
                            scrollYProgress={scrollYProgress}
                            isFirst={i === 0}
                            isLast={i === items.length - 1}
                        />
                    ))}
                </Container>
            </div>
        </section>
    )
}
