import { ThemeToggle } from '../ui/ThemeToggle'
import { Container } from '../layout/Container'

export function Footer() {
  return (
    <footer className="relative w-full border-t border-border/40 bg-background overflow-hidden pt-24 pb-12">
      <Container className="flex flex-col gap-12">
        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 border-t border-border/20 pt-16">
          {/* Col 1: Slogan */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
                Noxis<span className="text-primary">.</span>
              </h2>
              <p className="text-xl md:text-2xl font-medium leading-tight max-w-sm">
                We build digital assets that define value. <br />
                <span className="text-muted-foreground">Unconventional by design.</span>
              </p>
            </div>

            <div className="mt-12 hidden md:block">
              <a href="mailto:hello@noxis.agency" className="text-sm font-bold tracking-widest uppercase hover:text-primary transition-colors">hello@noxis.agency</a>
            </div>
          </div>

          {/* Col 2: Sitemap */}
          <div className="md:col-span-2 md:col-start-7 flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Sitemap</span>
            <ul className="flex flex-col gap-3">
              {["Home", "Services", "Method", "Quality"].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Socials */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Socials</span>
            <ul className="flex flex-col gap-3">
              {["LinkedIn", "Instagram", "Twitter", "Awwwards"].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold">Legal</span>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Mobile Email */}
          <div className="md:hidden mt-8">
            <a href="mailto:hello@noxis.agency" className="text-lg font-bold tracking-wider hover:text-primary transition-colors">hello@noxis.agency</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-center md:text-left text-[10px] uppercase tracking-widest text-muted-foreground font-bold opacity-60">
            <span>Andrea Zago</span>
            <span className="hidden md:inline text-border">|</span>
            <span>P.IVA 05668260283 — C.F. zgandr97c22b563e</span>
            <span className="hidden md:inline text-border">|</span>
            <span>Via Giuseppe Mazzini 5a, 35010 Trebaseleghe (PD)</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">All Systems Normal</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </footer>
  )
}
