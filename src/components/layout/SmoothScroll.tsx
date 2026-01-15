import { ReactNode } from 'react'
import { ReactLenis } from 'lenis/react'

export function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
            }}
        >
            <div className="w-full min-h-screen">
                {children}
            </div>
        </ReactLenis>
    )
}
