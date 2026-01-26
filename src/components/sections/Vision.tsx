import { Container } from '../layout/Container'
import { Reveal } from '../ui/Reveal'
import { useTranslation } from 'react-i18next'

export function Vision() {
    const { t } = useTranslation()
    return (
        <section id="manifesto" className="relative w-full py-section bg-background">
            <Container className="flex flex-col gap-32 md:gap-48">
                {/* Manifesto Quote */}
                <div className="w-full py-24 md:py-32 flex flex-col items-center text-center gap-10">


                    <Reveal width="100%" yOffset={20}>
                        <div className="flex flex-col gap-10">
                            <h2 className="text-display max-w-6xl mx-auto">
                                <span className="text-foreground block mb-2">{t('vision.quote_line1')}</span>
                                <span className="text-muted-foreground/50 block mb-8">{t('vision.quote_line2')}</span>
                            </h2>
                            <p className="text-lead max-w-3xl mx-auto">
                                {t('vision.quote_description')}
                            </p>
                        </div>
                    </Reveal>
                </div>

                {/* Vision */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-start">
                    <div className="md:col-span-4">
                        <Reveal delay={0.1}>
                            <span className="text-caption text-primary mb-4 block">{t('vision.our_vision')}</span>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <h3 className="text-subtitle leading-none whitespace-pre-line">
                                {t('vision.vision_title')}
                            </h3>
                        </Reveal>
                    </div>
                    <div className="md:col-span-8 md:pl-12 pt-4">
                        <Reveal delay={0.3} width="100%">
                            <p className="text-lead">
                                {t('vision.vision_description')}
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Mission */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-start">
                    <div className="md:col-span-4">
                        <Reveal delay={0.1}>
                            <span className="text-caption text-primary mb-4 block">{t('vision.our_mission')}</span>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <h3 className="text-subtitle leading-none whitespace-pre-line">
                                {t('vision.mission_title')}
                            </h3>
                        </Reveal>
                    </div>
                    <div className="md:col-span-8 md:pl-12 pt-4">
                        <Reveal delay={0.3} width="100%">
                            <p className="text-lead">
                                {t('vision.mission_description')}
                            </p>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}
