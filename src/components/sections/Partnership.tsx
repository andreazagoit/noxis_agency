import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'

export function Partnership() {
    return (
        <section className="py-40 px-6 text-center">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-8xl font-bold tracking-tighter mb-12"
                >
                    Ready to <span className="text-primary mix-blend-screen">ascend?</span>
                </motion.h2>

                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                    We only partner with brands ready to redefine their industry.
                    If that's you, let's talk business.
                </p>

                <a
                    href="mailto:hello@noxis.agency"
                    className="inline-block px-10 py-5 bg-foreground text-background font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300"
                >
                    Start a Project
                </a>
            </div>
        </section>
    )
}
