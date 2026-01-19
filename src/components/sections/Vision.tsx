'use client'

import { Container } from '../layout/Container'
import { Reveal } from '../ui/Reveal'

export function Vision() {
    return (
        <section id="manifesto" className="relative w-full py-section bg-background">
            <Container className="flex flex-col gap-32 md:gap-48">
                {/* Manifesto Quote */}
                <div className="w-full py-24 md:py-32 flex flex-col items-center text-center gap-8">
                    <Reveal width="100%" yOffset={50}>
                        <p className="text-3xl md:text-5xl font-bold leading-tight max-w-5xl text-balance mx-auto">
                            <span className="text-muted-foreground">Quality is our form of respect.</span><br />
                            <span className="text-muted-foreground">In a noisy world, clarity is the only luxury worth pursuing.</span><br />
                            <span className="text-primary">We build for those who know the difference.</span>
                        </p>
                    </Reveal>
                </div>

                {/* Vision */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-start">
                    <div className="md:col-span-4">
                        <Reveal delay={0.1}>
                            <span className="text-caption text-primary mb-4 block">Our Vision</span>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <h3 className="text-subtitle leading-none">
                                Setting<br />
                                The<br />
                                <span className="text-muted-foreground">Standard.</span>
                            </h3>
                        </Reveal>
                    </div>
                    <div className="md:col-span-8 md:pl-12 pt-4">
                        <Reveal delay={0.3} width="100%">
                            <p className="text-2xl md:text-4xl font-medium leading-tight text-foreground">
                                To redefine the benchmark of digital products. We envision a web where speed never compromises soul, and every interaction feels inevitable. Eliminating the unnecessary to reveal the essential.
                            </p>
                        </Reveal>
                    </div>
                </div>

                {/* Mission */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-12 items-start">
                    <div className="md:col-span-4">
                        <Reveal delay={0.1}>
                            <span className="text-caption text-primary mb-4 block">Our Mission</span>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <h3 className="text-subtitle leading-none">
                                Engineering<br />
                                <span className="text-muted-foreground">Value.</span>
                            </h3>
                        </Reveal>
                    </div>
                    <div className="md:col-span-8 md:pl-12 pt-4">
                        <Reveal delay={0.3} width="100%">
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                                We don't just write code; we forge assets. Through rigorous engineering and obsessive art direction, we turn complex problems into seamless, reliable solutions. <span className="text-foreground">We craft the tools that power your future.</span>
                            </p>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}
