'use client'

import Marquee from 'react-fast-marquee'
import { Container } from '../layout/Container'
import { cn } from '@/lib/utils'

const BRANDS = [
    { name: 'Accenture', logo: '/assets/accenture.png', className: "h-20" },
    { name: 'Reply', logo: '/assets/reply.png', className: "h-12 translate-y-[12px]" },
    { name: 'Generali', logo: '/assets/generali.png', className: "h-6 translate-y-[8px]" },
    // Add more brands here in the future
]

export function BrandSlider() {
    return (
        <div className="w-full py-16 overflow-hidden relative">
            <Container className="mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/80">TRUSTED BY</span>
            </Container>

            <Marquee
                gradient={false}
                speed={50}
                pauseOnHover={true}
                className="flex items-center"
            >
                <div className="flex items-center gap-40 pr-40">
                    {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, i) => (
                        <div key={i} className="flex-shrink-0 flex items-center justify-center">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className={cn(
                                    "w-auto object-contain opacity-70 dark:invert transition-all duration-500 hover:opacity-100",
                                    brand.className
                                )}
                            />
                        </div>
                    ))}
                </div>
            </Marquee>
        </div>
    )
}
