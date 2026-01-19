'use client'

import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

export function Vision() {
    return (
        <section className="relative w-full py-section bg-background">
            <Container className="flex flex-col gap-32 md:gap-48">
                {/* Manifesto Quote */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="w-full py-24 md:py-32 flex flex-col items-center text-center gap-8"
                >
                    <p className="text-3xl md:text-5xl font-bold leading-tight max-w-5xl text-balance">
                        <span className="text-muted-foreground">Design without functionality is empty.</span><br />
                        <span className="text-muted-foreground">Functionality without design is incomplete.</span><br />
                        <span className="text-primary">We build digital products that respect both — and the people who use them.</span>
                    </p>
                </motion.div>

                {/* Vision */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
                >
                    <div className="md:col-span-4">
                        <span className="text-caption text-primary mb-4 block">Our Vision</span>
                        <h3 className="text-subtitle leading-none">
                            Beauty,<br />
                            Function,<br />
                            <span className="text-muted-foreground">Ethics.</span>
                        </h3>
                    </div>
                    <div className="md:col-span-8 md:pl-12 pt-4">
                        <p className="text-2xl md:text-4xl font-medium leading-tight text-foreground">
                            Becoming a benchmark in premium digital product creation, proving that technical excellence and impeccable design can — and must — go hand in hand with ethics and respect for people.
                        </p>
                    </div>
                </motion.div>

                {/* Mission */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start"
                >
                    <div className="md:col-span-4">
                        <span className="text-caption text-primary mb-4 block">Our Mission</span>
                        <h3 className="text-subtitle leading-none">
                            Make it<br />
                            <span className="text-muted-foreground">Matter.</span>
                        </h3>
                    </div>
                    <div className="md:col-span-8 md:pl-12 pt-4">
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                            We create highest-quality digital products, uniting <span className="text-foreground">design, technology, and ethics</span>, to bring to life premium solutions that truly work and do good. We build only what we believe in, aiming to improve people's experience through a fairer digital world.
                        </p>
                    </div>
                </motion.div>
            </Container>
        </section>
    )
}
