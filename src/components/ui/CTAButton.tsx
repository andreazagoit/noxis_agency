'use client'

import { motion, useMotionValue, useSpring, AnimatePresence, LayoutGroup } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CTAButtonProps {
    email?: string
    variant?: 'primary' | 'dark' | 'light'
    className?: string
    children: React.ReactNode
    initial?: any
    animate?: any
    transition?: any
}

// Staggered letters variants
const letterVariants = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
            delay: i * 0.012,
            ease: [0.22, 1, 0.36, 1] as const
        }
    }),
    exit: (i: number) => ({
        y: -10,
        opacity: 0,
        transition: {
            duration: 0.2,
            delay: i * 0.008,
            ease: [0.22, 1, 0.36, 1] as const
        }
    })
}

function AnimatedText({ text }: { text: string }) {
    const letters = text.split('')
    return (
        <span className="inline-flex overflow-hidden">
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="inline-block"
                >
                    {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
            ))}
        </span>
    )
}

export function CTAButton({
    email = "hello@noxis.agency",
    variant = 'primary',
    className,
    children,
    initial,
    animate: customAnimate,
    transition: customTransition,
}: CTAButtonProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [displayState, setDisplayState] = useState<'default' | 'email' | 'copied'>('default')
    const [isMobile, setIsMobile] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Detect mobile
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            if (mobile) setDisplayState('email')
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // State logic based on hover/interaction
    useEffect(() => {
        if (isMobile) return
        if (displayState === 'copied') return // Prevent interrupting copy state

        if (isHovered) {
            setDisplayState('email')
        } else {
            setDisplayState('default')
        }
    }, [isHovered, displayState, isMobile])

    // Magnetic effect
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { damping: 20, stiffness: 200 })
    const springY = useSpring(y, { damping: 20, stiffness: 200 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMobile || !containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) * 0.12)
        y.set((e.clientY - centerY) * 0.12)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
        setIsHovered(false)
    }

    const handleCopy = async () => {
        if (displayState === 'copied') return
        try {
            await navigator.clipboard.writeText(email)
            setDisplayState('copied')

            // Revert state after 2 seconds
            setTimeout(() => {
                if (isMobile) {
                    setDisplayState('email')
                } else if (isHovered) {
                    setDisplayState('email')
                } else {
                    setDisplayState('default')
                }
            }, 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const buttonText = typeof children === 'string' ? children : 'Start a Project'

    const getBgColor = () => {
        if (displayState === 'copied') return 'oklch(0.627 0.194 149.21)' // Fixed Green for copy
        if (variant === 'primary') return 'var(--primary)'
        if (variant === 'light') return 'var(--foreground)'
        return 'var(--background)'
    }

    return (
        <LayoutGroup>
            <motion.div
                ref={containerRef}
                className={cn(
                    "inline-flex items-center font-bold text-caption rounded-full cursor-pointer select-none uppercase tracking-wide",
                    displayState === 'copied' ? "text-white" : variant === 'primary' ? "text-white" : variant === 'light' ? "text-background" : "text-foreground",
                    className
                )}
                style={{
                    x: springX,
                    y: springY,
                    borderRadius: 9999,
                    willChange: 'transform, background-color'
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => !isMobile && setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                onClick={handleCopy}
                initial={initial}
                animate={{
                    backgroundColor: getBgColor(),
                    ...(customAnimate || {})
                }}
                layout
                transition={{
                    backgroundColor: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    layout: { type: "spring", stiffness: 400, damping: 30 },
                    ...(customTransition || {})
                }}
            >
                <div className="px-8 md:px-12 py-3 md:py-4 flex items-center justify-center min-h-[48px] md:min-h-[56px]">
                    <AnimatePresence mode="wait" initial={false}>
                        {displayState === 'default' && (
                            <motion.div
                                key="default"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="whitespace-nowrap"
                            >
                                <AnimatedText text={buttonText} />
                            </motion.div>
                        )}

                        {displayState === 'email' && (
                            <motion.div
                                key="email"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3 whitespace-nowrap"
                            >
                                <AnimatedText text={email} />
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                >
                                    <Copy size={16} />
                                </motion.div>
                            </motion.div>
                        )}

                        {displayState === 'copied' && (
                            <motion.div
                                key="copied"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3 whitespace-nowrap"
                            >
                                <AnimatedText text="Copied!" />
                                <motion.div
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                                >
                                    <Check size={18} />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </LayoutGroup>
    )
}
