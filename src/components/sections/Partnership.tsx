import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

export function Partnership() {
  return (
    <section>
      <Container className="text-center py-40">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-heading font-bold tracking-tighter mb-12"
        >
          Ready to{' '}
          <span className="text-primary">ascend?</span>
        </motion.h2>

        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          We only partner with brands ready to redefine their industry. If
          that's you, let's talk business.
        </p>

        <a
          href="mailto:hello@noxis.agency"
          className="inline-block px-10 py-5 bg-foreground text-background font-bold text-lg rounded-full hover:scale-105 transition-transform duration-300"
        >
          Start a Project
        </a>
      </Container>
    </section>
  )
}
