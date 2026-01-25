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

// Animated text component with staggered letter animation
function AnimatedText({ text, direction }: { text: string; direction: 'in' | 'out' }) {
    const letters = text.split('')

    return (
        <span className="inline-flex">
            {letters.map((letter, i) => (
                <motion.span
                    key={i}
                    initial={{ y: direction === 'in' ? 10 : 0, opacity: direction === 'in' ? 0 : 1 }}
                    animate={{ y: direction === 'in' ? 0 : -10, opacity: direction === 'in' ? 1 : 0 }}
                    transition={{
                        duration: 0.2,
                        delay: i * 0.012,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    style={{ willChange: 'transform, opacity' }}
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
    animate,
    transition: customTransition,
}: CTAButtonProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [displayState, setDisplayState] = useState<'default' | 'email' | 'copied'>('default')
    const [animDirection, setAnimDirection] = useState<'in' | 'out'>('in')
    const [isMobile, setIsMobile] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Detect mobile and set initial state
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            if (mobile) {
                setDisplayState('email')
                setAnimDirection('in')
            } else {
                setDisplayState('default')
                setAnimDirection('in')
            }
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Magnetic effect
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const springX = useSpring(x, { damping: 20, stiffness: 200 })
    const springY = useSpring(y, { damping: 20, stiffness: 200 })

    // Handle hover state changes - only on desktop
    useEffect(() => {
        if (isMobile) return

        if (isHovered && displayState === 'default') {
            setAnimDirection('out')
            const timer = setTimeout(() => {
                setDisplayState('email')
                setAnimDirection('in')
            }, 120)
            return () => clearTimeout(timer)
        } else if (!isHovered && (displayState === 'email' || displayState === 'copied')) {
            setAnimDirection('out')
            const timer = setTimeout(() => {
                setDisplayState('default')
                setAnimDirection('in')
            }, 120)
            return () => clearTimeout(timer)
        }
    }, [isHovered, displayState, isMobile])

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
            setAnimDirection('out')
            setTimeout(() => {
                setDisplayState('copied')
                setAnimDirection('in')
            }, 120)

            // Return to appropriate state after 2 seconds
            setTimeout(() => {
                setAnimDirection('out')
                setTimeout(() => {
                    if (isMobile) {
                        setDisplayState('email')
                    } else if (isHovered) {
                        setDisplayState('email')
                    } else {
                        setDisplayState('default')
                    }
                    setAnimDirection('in')
                }, 120)
            }, 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const buttonText = typeof children === 'string' ? children : 'Start a Project'

    const getBgColor = () => {
        if (displayState === 'copied') return 'oklch(0.627 0.194 149.21)'
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
                    ...(animate || {})
                }}
                layout
                transition={{
                    backgroundColor: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                    layout: { type: "spring", stiffness: 400, damping: 30 },
                    ...(customTransition as any || {})
                }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {displayState === 'default' && (
                        <motion.div
                            key="default"
                            className="px-8 md:px-12 py-3 md:py-4 whitespace-nowrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                        >
                            <AnimatedText text={buttonText} direction={animDirection} />
                        </motion.div>
                    )}

                    {displayState === 'email' && (
                        <motion.div
                            key="email"
                            className="flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 whitespace-nowrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                        >
                            <AnimatedText text={email} direction={animDirection} />

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
                            className="flex items-center gap-3 px-8 md:px-12 py-3 md:py-4 whitespace-nowrap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1, ease: "easeOut" }}
                        >
                            <AnimatedText text="Copied to clipboard" direction={animDirection} />

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
            </motion.div>
        </LayoutGroup>
    )
}
