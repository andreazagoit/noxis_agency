import { ThemeToggle } from '../ui/ThemeToggle'
import { Container } from '../layout/Container'

export function Footer() {
  return (
    <footer className="relative w-full border-t border-border/40 bg-background overflow-hidden">
      <Container className="py-24 md:py-32 flex flex-col gap-24">
        {/* 1. Header / CTA Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <h2 className="text-[12vw] leading-[0.8] font-bold tracking-tighter uppercase">
            Noxis<span className="text-primary">.</span>
          </h2>

          <a
            href="mailto:info@noxis.agency"
            className="group flex items-center gap-4 text-2xl md:text-3xl font-medium tracking-tight hover:text-primary transition-colors"
          >
            <span>Start a project</span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </a>
        </div>

        {/* 2. Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-border/20 pt-16">
          {/* Col 1: Sitemap */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Index
            </span>
            <ul className="flex flex-col gap-3">
              {['Home', 'Services', 'Method', 'Quality'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Socials */}
          <div className="flex flex-col gap-6">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Connect
            </span>
            <ul className="flex flex-col gap-3">
              {['LinkedIn', 'Instagram', 'X (Twitter)', 'Awwwards'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm font-medium hover:text-primary transition-colors cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Col 3: Legal Info */}
          <div className="flex flex-col gap-6 md:col-span-2 md:items-end text-right">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Legal Entity
            </span>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground font-mono">
              <p>Noxis Agency</p>
              <p>P.IVA 05668260283 — C.F. zgandr97c22b563e</p>
              <p>Via Giuseppe Mazzini 5a, 35010 Trebaseleghe (PD)</p>
              <a
                href="mailto:info@noxis.agency"
                className="text-foreground hover:text-primary mt-2"
              >
                info@noxis.agency
              </a>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-border/20">
          <p className="text-xs text-muted-foreground font-mono">
            © 2026 Noxis Agency. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground font-mono">
              System Status: Stable
            </span>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </footer>
  )
}
