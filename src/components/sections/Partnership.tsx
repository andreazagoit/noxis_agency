import { Reveal } from '../ui/Reveal'
import { Container } from '../layout/Container'
import { CTAButton } from '../ui/CTAButton'

export function Partnership() {
  return (
    <section>
      <Container className="text-center py-section">
        <Reveal width="100%">
          <h2 className="text-display mb-element">
            Ready for a{' '}
            <span className="text-primary">Partner</span>?
          </h2>
        </Reveal>

        <Reveal width="100%" delay={0.1}>
          <p className="text-body text-muted-foreground mb-element max-w-3xl mx-auto">
            We only collaborate with brands that share our vision for quality and ethics.
            We're not just suppliers; we are partners in building your digital legacy.
          </p>
        </Reveal>

        <Reveal width="100%" delay={0.2}>
          <CTAButton variant="light">
            Start a Project
          </CTAButton>
        </Reveal>
      </Container>
    </section>
  )
}
