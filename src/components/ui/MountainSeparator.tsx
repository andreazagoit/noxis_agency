'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, easeInOut } from 'framer-motion'
import { cn } from '../../lib/utils'

interface MountainSeparatorProps {
    topColor?: string
    bottomColor?: string
    className?: string
}

export function MountainSeparator({
    topColor = "bg-background",
    bottomColor = "bg-primary",
    className
}: MountainSeparatorProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Shrink from mountain to flat as you scroll down
    // 1 -> full height (mountain), 0 -> flat
    const heightFactor = useTransform(scrollYProgress, [0, 1], [1, 0], { ease: easeInOut })

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full h-[240px] md:h-[400px]",
                topColor,
                className
            )}
        >
            <div className="absolute bottom-0 left-0 w-full h-full flex justify-center items-end gap-0">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => {
                    let maxHeight = "30%"
                    if (i === 4) maxHeight = "100%"
                    else if (i === 3 || i === 5) maxHeight = "80%"
                    else if (i === 2 || i === 6) maxHeight = "55%"

                    return (
                        <motion.div
                            key={i}
                            style={{ height: useTransform(heightFactor, value => `${value * parseInt(maxHeight)}%`) }}
                            className={cn("w-[14.28%]", bottomColor)}
                        />
                    )
                })}
            </div>
        </div>
    )
}
