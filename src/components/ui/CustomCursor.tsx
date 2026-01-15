import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [clicked, setClicked] = useState(false)
    const [linkHovered, setLinkHovered] = useState(false)

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener('mousemove', mMove)
            document.addEventListener('mousedown', mDown)
            document.addEventListener('mouseup', mUp)
        }

        const removeEventListeners = () => {
            document.removeEventListener('mousemove', mMove)
            document.removeEventListener('mousedown', mDown)
            document.removeEventListener('mouseup', mUp)
        }

        const mMove = (el: MouseEvent) => {
            setPosition({ x: el.clientX, y: el.clientY })

            // Check if hovering over a clickable element
            const target = el.target as HTMLElement
            const isClickable = target.closest('a') || target.closest('button') || target.closest('.glass-panel')
            setLinkHovered(!!isClickable)
        }

        const mDown = () => setClicked(true)
        const mUp = () => setClicked(false)

        addEventListeners()
        return () => removeEventListeners()
    }, [])

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary pointer-events-none z-50 hidden md:block mix-blend-difference"
                animate={{
                    x: position.x - 16,
                    y: position.y - 16,
                    scale: clicked ? 0.8 : linkHovered ? 1.5 : 1,
                    opacity: 1
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-50 hidden md:block"
                animate={{
                    x: position.x - 4,
                    y: position.y - 4,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />
        </>
    )
}
