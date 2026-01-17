'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useLenis } from 'lenis/react'

export function CustomScrollbar() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                html {
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                html::-webkit-scrollbar {
                    display: none;
                }
            `,
        }}
      />
      <ScrollbarInner />
    </>
  )
}

function ScrollbarInner() {
  const [isVisible, setIsVisible] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Use MotionValue for direct updates without re-renders
  const scrollProgress = useMotionValue(0)

  // Track height
  const trackHeight = 200
  // Thumb height
  const thumbHeight = 40

  // Transform progress to thumb Y position
  const thumbY = useTransform(
    scrollProgress,
    [0, 1],
    [0, trackHeight - thumbHeight],
  )

  const lenis = useLenis(({ progress }) => {
    // Direct update to motion value - no React re-render needed
    scrollProgress.set(progress)

    // Handle visibility
    if (!isVisible) setIsVisible(true)

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current)
    }
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false)
    }, 2500)
  })

  useEffect(() => {
    // Initial visibility
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !lenis) return

    const rect = trackRef.current.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const progress = Math.max(0, Math.min(1, clickY / trackHeight))

    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight

    lenis.scrollTo(progress * scrollHeight)
  }

  return (
    <motion.div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[100] mix-blend-difference"
      initial={{ opacity: 0, x: 10 }}
      animate={{
        opacity: isVisible ? 1 : 0.4,
        x: 0,
      }}
      transition={{ duration: 0.4 }}
    >
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative cursor-pointer rounded-full"
        style={{
          height: trackHeight,
          width: 6,
          backgroundColor: 'rgba(128, 128, 128, 0.2)',
        }}
      >
        <motion.div
          className="absolute left-0 right-0 rounded-full"
          style={{
            height: thumbHeight,
            y: thumbY,
            backgroundColor: '#ffffff',
          }}
        />
      </div>
    </motion.div>
  )
}
