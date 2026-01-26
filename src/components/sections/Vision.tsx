'use client'

import { Container } from '../layout/Container'
import { Reveal } from '../ui/Reveal'


export function Vision() {
    return (
        <section id="manifesto" className="relative w-full py-section bg-background">
            <Container className="flex flex-col gap-32 md:gap-48">
                {/* Manifesto Quote */}
                <div className="w-full py-24 md:py-32 flex flex-col items-center text-center gap-10">


                    <Reveal width="100%" yOffset={20}>
                        <h2 className="font-heading text-5xl md:text-8xl font-bold uppercase leading-[0.9] max-w-6xl mx-auto tracking-tight">
                            <span className="text-foreground block mb-2">Impact is engineered,</span>
                            <span className="text-black/50 dark:text-white/50 block mb-8">not guessed.</span>
                            <div className="text-xl md:text-3xl font-sans normal-case font-medium text-black/80 dark:text-white/80 max-w-3xl mx-auto leading-relaxed tracking-normal">
                                Design without functionality is hollow. Functionality without design is incomplete.
                                We build digital products that respect both and the people who use them.
                            </div>
                        </h2>
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
                                We envision a digital world where every product is beautiful, functional, and ethically responsible. We aim to prove that technology can be a force for good, improving people's lives without shortcuts or compromises. Our ambition is to become a benchmark for excellence, where design and technology merge into premium digital experiences that leave a lasting positive impact.
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
                            <p className="text-2xl md:text-4xl font-medium leading-tight text-foreground">
                                We create web and mobile solutions of the highest quality, combining innovative design, flawless functionality, and obsessive attention to detail. Every project is born from respect for people and our clients' values. We reject shortcuts and unethical practices, collaborating with those who share our vision to produce digital tools that are truly useful, ethical, and sustainable. Our mission is to transform ideas into premium digital experiences that empower people and generate concrete value.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </section>
    )
}
