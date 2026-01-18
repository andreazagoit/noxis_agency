import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Container } from '../layout/Container'
import { cn } from '../../lib/utils'

interface FeaturedWorkProps {
    title?: string
    items?: string[]
    backgroundColor?: string
    textColor?: string
    className?: string
}

export function FeaturedWork({
    title = "Featured Work",
    items = [],
    backgroundColor = "bg-primary",
    textColor = "text-primary-foreground",
    className
}: FeaturedWorkProps) {
    const containerRef = useRef<HTMLElement>(null)
    const isStory = items.length > 0

    // Story animation (Pinned Text sequence)
    // Only meaningful if isStory is true (container will be taller)
    const { scrollYProgress: storyProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    return (
        <section
            ref={containerRef}
            className={cn(
                "w-full relative flex flex-col items-center justify-center",
                isStory ? "h-[400vh]" : "h-screen",
                backgroundColor,
                textColor,
                className
            )}
        >
            <div className={cn(
                "w-full flex flex-col items-center justify-center relative",
                isStory ? "sticky top-0 h-screen" : "h-full"
            )}>

                <Container className="relative z-20 flex flex-col items-center justify-center h-full w-full">
                    {/* Standard Title Mode */}
                    {!isStory && (
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-9xl font-heading font-black uppercase text-center"
                        >
                            {title}
                        </motion.h2>
                    )}

                    {/* Story Mode (Sequential Texts) */}
                    {isStory && items.map((item, index) => {
                        // Calculate time slot for each item
                        const step = 1 / items.length
                        const start = index * step
                        const end = start + step

                        // Fade in/out logic
                        // Example: Item 0 (0 to 0.25) -> Fade in at 0, stay, fade out at 0.25
                        const opacity = useTransform(
                            storyProgress,
                            [start, start + 0.1, end - 0.1, end],
                            [0, 1, 1, 0]
                        )

                        const y = useTransform(
                            storyProgress,
                            [start, start + 0.1, end - 0.1, end],
                            [50, 0, 0, -50]
                        )

                        return (
                            <motion.h2
                                key={index}
                                style={{ opacity, y }}
                                className="absolute text-8xl font-heading font-black uppercase text-center w-full px-[5vw]"
                            >
                                {item}
                            </motion.h2>
                        )
                    })}
                </Container>
            </div>
        </section>
    )
}
