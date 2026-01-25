'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
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
        <motion.div
            className={cn(
                "inline-flex items-center font-bold text-caption rounded-full cursor-pointer select-none uppercase tracking-wide overflow-hidden relative z-10 transition-colors duration-300",
                displayState === 'copied' ? "text-white" : variant === 'primary' ? "text-white" : variant === 'light' ? "text-background" : "text-foreground",
                className
            )}
            style={{
                borderRadius: 9999,
                backgroundColor: getBgColor()
            }}
            onMouseEnter={() => !isMobile && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleCopy}
            initial={initial}
            animate={customAnimate}
            layout
            transition={{ layout: { duration: 0.3, type: "spring", stiffness: 300, damping: 30 }, ...customTransition }}
        >
            <div className="px-8 md:px-12 py-3 md:py-4 flex items-center justify-center min-h-[48px] md:min-h-[56px] relative">
                {displayState === 'default' && (
                    <div className="whitespace-nowrap flex items-center justify-center">
                        {buttonText}
                    </div>
                )}

                {displayState === 'email' && (
                    <div className="flex items-center gap-3 whitespace-nowrap justify-center">
                        {email}
                        <Copy size={16} />
                    </div>
                )}

                {displayState === 'copied' && (
                    <div className="flex items-center gap-3 whitespace-nowrap justify-center">
                        Copied!
                        <Check size={18} />
                    </div>
                )}
            </div>
        </motion.div>
    )
}
