'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState<'loading' | 'complete' | 'reveal' | 'hidden'>('loading')

    // Simulate loading progress
    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                // Accelerating progress for natural feel
                const increment = Math.max(1, Math.floor((100 - prev) / 10))
                return Math.min(100, prev + increment)
            })
        }, 50)

        return () => clearInterval(interval)
    }, [])

    // Handle phase transitions
    useEffect(() => {
        if (progress === 100 && phase === 'loading') {
            // Wait a moment, then transition to complete
            setTimeout(() => setPhase('complete'), 300)
        }
        if (phase === 'complete') {
            // Text fades out, then reveal
            setTimeout(() => setPhase('reveal'), 800)
        }
        if (phase === 'reveal') {
            // After mountain animation, hide completely
            setTimeout(() => setPhase('hidden'), 1500)
        }
    }, [progress, phase])

    if (phase === 'hidden') return null

    // 7 strips for mountain effect
    const strips = Array.from({ length: 7 }, (_, i) => i)

    return (
        <div className="fixed inset-0 z-[200] pointer-events-none">
            <AnimatePresence>
                <>
                    {strips.map((i) => {
                        // Mountain effect: center strip (index 3) has longest delay
                        // Outer strips have shortest delay
                        const distanceFromCenter = Math.abs(i - 3)
                        const maxDelay = 0.4
                        const delay = maxDelay - (distanceFromCenter * 0.1)

                        return (
                            <motion.div
                                key={i}
                                className="absolute top-0 bottom-0 bg-primary"
                                style={{
                                    left: `${(i / 7) * 100}%`,
                                    width: `${100 / 7 + 0.5}%`,
                                }}
                                initial={{ y: 0 }}
                                animate={
                                    phase === 'reveal'
                                        ? { y: '-100vh' }
                                        : { y: 0 }
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: phase === 'reveal' ? delay : 0,
                                    ease: [0.65, 0, 0.35, 1],
                                }}
                            />
                        )
                    })}

                    {/* Loading Content */}
                    <AnimatePresence>
                        {(phase === 'loading' || phase === 'complete') && (
                            <motion.div
                                className="absolute inset-0 flex flex-col items-center justify-center z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Top Left */}
                                <div className="absolute top-8 left-8">
                                    <span className="text-lg md:text-xl font-black text-black tracking-tight">
                                        LOADING
                                    </span>
                                </div>

                                {/* Top Right */}
                                <div className="absolute top-8 right-8">
                                    <span className="text-sm text-black/60">
                                        PLEASE WAIT
                                    </span>
                                </div>

                                {/* Center - Big Number */}
                                <motion.span
                                    className="text-[20vw] md:text-[15vw] font-black text-black leading-none"
                                    key={progress}
                                >
                                    {progress}
                                </motion.span>

                                {/* Bottom Left */}
                                <div className="absolute bottom-8 left-8">
                                    <span className="text-sm text-black/60">
                                        PREPARING EXPERIENCE
                                    </span>
                                </div>

                                {/* Bottom Right */}
                                <div className="absolute bottom-8 right-8">
                                    <motion.span
                                        className="text-sm font-bold text-black"
                                        animate={{ opacity: phase === 'complete' ? 1 : 0.6 }}
                                    >
                                        {phase === 'complete' ? 'READY' : '...'}
                                    </motion.span>
                                </div>

                                {/* Progress Line */}
                                <div className="absolute bottom-20 left-8 right-8 h-px bg-black/20">
                                    <motion.div
                                        className="h-full bg-black"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.1 }}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            </AnimatePresence>
        </div>
    )
}
