import { Reveal } from '../ui/Reveal'
import { Container } from '../layout/Container'
import { CTAButton } from '../ui/CTAButton'

export function Partnership() {
  return (
    <section id="partner">
      <Container className="text-center py-section">
        <Reveal width="100%">
          <h2 className="text-display mb-element">
            Ready for a{' '}
            <span className="text-primary">Partner</span>?
          </h2>
        </Reveal>

        <Reveal width="100%" delay={0.1}>
          <p className="text-lead mb-element max-w-3xl mx-auto">
            We work with brands to turn their ideas into effective digital products.
            By combining design and engineering, we help you connect with your audience and achieve meaningful results. Let's build something great together.
          </p>
        </Reveal>

        <Reveal width="100%" delay={0.2} overflowVisible>
          <CTAButton variant="light">
            Start a Project
          </CTAButton>
        </Reveal>
      </Container>
    </section>
  )
}
