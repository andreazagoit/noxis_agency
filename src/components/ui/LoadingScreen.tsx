import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useProgress } from '@react-three/drei'
import { useLoading } from '../../context/LoadingContext'

export function LoadingScreen() {
    const { progress: realProgress, active } = useProgress()
    const [progress, setProgress] = useState(0)
    const [phase, setPhase] = useState<'loading' | 'complete' | 'reveal' | 'hidden'>('loading')
    const { setIsLoading } = useLoading()

    // Smart Progress Logic:
    // 1. Advance linear progress to ensure minimum 1s duration
    // 2. But CAP it at realProgress so we wait for actual assets
    useEffect(() => {
        // If nothing is loading initially/yet, treat realProgress as 100 or 0? 
        // Usually drei reports 0 initially. We'll assume if !active & progress=0 it might be starting.
        // But if we have assets, it usually flips active=true quickly.
        // Let's rely on a sanitized Real Progress.
        // If not active and progress=0, it's either done or not started. We'll start ramping anyway.
        // If active becomes true, we Clamp.

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) return 100

                // Desired increment for 1s duration (approx 60fps or 20ms interval)
                // 100% / (1000ms / 20ms) = 2% per tick
                const step = 2
                const nextPotential = prev + step

                // Determine effective real progress. 
                // If inactive and 0, we assume loading hasn't 'registered' fully or is instant. 
                // We'll trust the simulation unless active tells us to wait.
                // Actually, safeguard: let's cap at realProgress ONLY if active is true.
                const effectiveReal = active ? realProgress : 100

                // The displayed progress is the minimum of (Potential Simulated, Real Asset Progress)
                // allowing it to flow smoothly but stop for assets.
                // We add a small buffer (e.g. allow it to go slightly ahead? No, strict wait is better for "real feel")
                return Math.min(nextPotential, Math.max(prev, effectiveReal))
            })
        }, 20)

        return () => clearInterval(interval)
    }, [active, realProgress])

    // Handle phases
    useEffect(() => {
        if (progress === 100 && phase === 'loading') {
            setPhase('complete')
            setTimeout(() => setPhase('reveal'), 500) // Wait a bit before revealing
        }
    }, [progress, phase])

    // Cleanup phase
    useEffect(() => {
        if (phase === 'reveal') {
            // 1. Start Hero animations early (mid-reveal)
            const startHeroTimer = setTimeout(() => {
                setIsLoading(false)
            }, 500)

            // 2. Wait for full mountain animation to finish before unmounting (0.4 delay + 0.6 duration = 1.0s)
            const hideTimer = setTimeout(() => {
                setPhase('hidden')
            }, 1100)

            return () => {
                clearTimeout(startHeroTimer)
                clearTimeout(hideTimer)
            }
        }
    }, [phase, setIsLoading])

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
