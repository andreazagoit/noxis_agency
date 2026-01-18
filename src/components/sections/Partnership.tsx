import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

export function Partnership() {
  return (
    <section>
      <Container className="text-center py-section">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-display mb-element"
        >
          Ready for a{' '}
          <span className="text-primary italic">Partner</span>?
        </motion.h2>

        <p className="text-body text-muted-foreground mb-element max-w-3xl mx-auto">
          We only collaborate with brands that share our vision for quality and ethics.
          We're not just suppliers; we are partners in building your digital legacy.
        </p>

        <a
          href="mailto:hello@noxis.agency"
          className="inline-block px-12 py-4 bg-foreground text-background font-bold text-caption rounded-full hover:scale-105 transition-transform duration-300"
        >
          Start a Project
        </a>
      </Container>
    </section>
  )
}
