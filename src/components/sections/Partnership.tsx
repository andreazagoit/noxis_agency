import { Reveal } from '../ui/Reveal'
import { Container } from '../layout/Container'
import { CTAButton } from '../ui/CTAButton'
import { useTranslation } from 'react-i18next'

export function Partnership() {
  const { t } = useTranslation()
  return (
    <section id="partner">
      <Container className="text-center py-section">
        <Reveal width="100%">
          <h2 className="text-display mb-element">
            {t('partnership.title_line1')}{' '}
            <span className="text-primary">{t('partnership.title_line2')}</span>?
          </h2>
        </Reveal>

        <Reveal width="100%" delay={0.1}>
          <p className="text-lead mb-element max-w-3xl mx-auto">
            {t('partnership.description')}
          </p>
        </Reveal>

        <Reveal width="100%" delay={0.2} overflowVisible>
          <CTAButton variant="light">
            {t('partnership.cta')}
          </CTAButton>
        </Reveal>
      </Container>
    </section>
  )
}
