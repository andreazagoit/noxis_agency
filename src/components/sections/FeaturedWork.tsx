import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { GlassCard } from '../ui/glass-card'
import { GlassBadge } from '../ui/glass-badge'
import { cn } from '../../lib/utils'
import { Reveal } from '../ui/Reveal'
import { useTranslation } from 'react-i18next'

interface Stage {
    id: string;
    title: string;
    description: string;
    items: string[];
}

export function FeaturedWork() {
    const { t } = useTranslation()
    const containerRef = useRef<HTMLDivElement>(null)

    const PROCESS_STEPS: Stage[] = [
        {
            id: "01",
            title: t('methodology.steps.discovery.title'),
            description: t('methodology.steps.discovery.description'),
            items: t('methodology.steps.discovery.items', { returnObjects: true }) as string[]
        },
        {
            id: "02",
            title: t('methodology.steps.concept.title'),
            description: t('methodology.steps.concept.description'),
            items: t('methodology.steps.concept.items', { returnObjects: true }) as string[]
        },
        {
            id: "03",
            title: t('methodology.steps.design.title'),
            description: t('methodology.steps.design.description'),
            items: t('methodology.steps.design.items', { returnObjects: true }) as string[]
        },
        {
            id: "04",
            title: t('methodology.steps.develop.title'),
            description: t('methodology.steps.develop.description'),
            items: t('methodology.steps.develop.items', { returnObjects: true }) as string[]
        },
        {
            id: "05",
            title: t('methodology.steps.polish.title'),
            description: t('methodology.steps.polish.description'),
            items: t('methodology.steps.polish.items', { returnObjects: true }) as string[]
        },
        {
            id: "06",
            title: t('methodology.steps.launch.title'),
            description: t('methodology.steps.launch.description'),
            items: t('methodology.steps.launch.items', { returnObjects: true }) as string[]
        }
    ]

    return (
        <section
            ref={containerRef}
            className="relative py-48 md:py-64 bg-primary overflow-hidden"
            id="methodology"
        >
            <Container>
                <div className="flex flex-col items-center mb-32 text-center">
                    <Reveal width="100%">
                        <div className="flex flex-col items-center">
                            <span className="text-caption mb-4 text-white selection:bg-white selection:text-primary">
                                {t('methodology.subtitle')}
                            </span>
                            <h2 className="text-display text-white selection:bg-white selection:text-primary">
                                {t('methodology.title_prefix')}<span>{t('methodology.title_main')}</span><span className="opacity-30">.</span>
                            </h2>
                        </div>
                    </Reveal>
                </div>

                <div className="relative max-w-6xl mx-auto">

                    <div className="space-y-8 md:space-y-24 relative">
                        {PROCESS_STEPS.map((step, index) => (
                            <TimelineStep key={step.id} step={step} index={index} isLast={index === PROCESS_STEPS.length - 1} />
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}

function TimelineStep({ step, index, isLast }: { step: Stage, index: number, isLast: boolean }) {
    const isEven = index % 2 === 1

    return (
        <div className={cn(
            "relative flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-0 pl-16 md:pl-0",
            isEven ? "md:flex-row-reverse" : ""
        )}>
            {/* Node Marker with Ripple */}
            <div className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                <motion.div
                    className="absolute w-6 h-6 rounded-full bg-white"
                    animate={{ scale: [0.5, 1.2, 1.8], opacity: [0, 0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: index * 0.3 }}
                />
                <div className="w-3 h-3 rounded-full bg-white relative z-10" />
            </div>

            {/* Connecting Line to Next Step */}
            {!isLast && (
                <div className="absolute left-4 md:left-1/2 top-1/2 w-[1px] bg-white/30 -translate-x-1/2 h-[calc(100%+2rem)] md:h-[calc(100%+6rem)] z-0" />
            )}

            {/* Card Wrapper handled by div to avoid Reveal style conflict */}
            <div className="w-full md:w-[46%] group">
                <Reveal
                    width="100%"
                    delay={0.1}
                    yOffset={40}
                >
                    <GlassCard>
                        {/* Step Number - Large Accent */}
                        <span className="absolute top-6 right-8 font-heading text-[5rem] md:text-[7rem] leading-none text-white/10 dark:text-black/10 group-hover:text-white/20 dark:group-hover:text-black/20 transition-colors duration-300 select-none">
                            {step.id}
                        </span>

                        {/* Content */}
                        <div className="relative z-10">
                            <h3 className="text-card-title text-2xl md:text-3xl text-white mb-3">
                                {step.title}
                            </h3>

                            <p className="text-card-body text-white/80 mb-6">
                                {step.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {step.items.map((item) => (
                                    <GlassBadge key={item}>
                                        {item}
                                    </GlassBadge>
                                ))}
                            </div>
                        </div>
                    </GlassCard>
                </Reveal>
            </div>

            {/* Spacer */}
            <div className="hidden md:block w-[46%]" />
        </div>
    )
}
