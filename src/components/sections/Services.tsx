import { GlassCard } from '../ui/GlassCard'
import { motion } from 'framer-motion'

const services = [
    {
        title: "Digital Ecosystems",
        description: "Full-stack architectures that scale effortlessly. React, Node, Cloud Native.",
        icon: "01"
    },
    {
        title: "Immersive Front-end",
        description: "Award-winning motion and interaction design. Three.js, WebGL, Framer Motion.",
        icon: "02"
    },
    {
        title: "Mobile Experiences",
        description: "Native-feel applications for iOS and Android. React Native, Expo.",
        icon: "03"
    }
]

export function Services() {
    return (
        <section id="services" className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Core Competencies</h2>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        We don't offer menus. We offer solutions.
                        Our expertise is focused, deep, and uncompromising.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <GlassCard key={index} className="min-h-[300px] flex flex-col justify-between">
                            <span className="text-6xl font-light text-white/5 opacity-50">{service.icon}</span>
                            <div>
                                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
