import { Container } from '../layout/Container'
import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="relative w-full bg-background text-foreground overflow-hidden pt-32 pb-12 transition-colors duration-300">
      <Container className="relative z-10">
        {/* Main Content: Just Contacts & Slogan */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-xl">
            <h2 className="text-[2.5rem] md:text-[4rem] font-bold leading-none tracking-tight mb-8">
              {t('footer.slogan_line1')} <br />
              <span className="text-primary opacity-80">{t('footer.slogan_line2')}</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            <span className="text-[0.6rem] uppercase tracking-[0.3em] font-bold text-muted-foreground/60">{t('footer.get_in_touch')}</span>
            <a href="mailto:hello@noxis.agency" className="text-[1.5rem] md:text-[2rem] font-medium hover:underline underline-offset-8 decoration-foreground transition-all tracking-tight text-foreground">
              hello@noxis.agency
            </a>
          </div>
        </div>

        {/* Bottom Giant Text */}
        <div className="relative border-t border-border pt-12 mt-12 overflow-hidden select-none pointer-events-none">
          <h1 className="text-[22vw] font-black uppercase leading-[0.7] tracking-[-0.05em] text-foreground/[0.03] dark:text-foreground/[0.05]">
            Noxis.
          </h1>
        </div>

        {/* Footer Bottom Bar: Legal & Office on one line */}
        <div className="mt-24 pt-8 border-t border-border/50">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-[9px] uppercase tracking-[0.25em] font-bold text-muted-foreground/50">
            <div className="flex items-center gap-6">
              <span>© 2026 Andrea Zago</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>P.IVA 05668260283 | C.F. zgandr97c22b563e</span>
            </div>

            <div className="flex items-center gap-6">
              <span>Trebaseleghe (PD), Italy</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Via G. Mazzini 5a, 35010</span>
            </div>
          </div>
        </div>
      </Container>

      {/* Decorative background mesh or gradient if needed, but keeping it flat for now */}
    </footer>
  )
}
