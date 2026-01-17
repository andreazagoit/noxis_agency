import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { ThemeToggle } from '../ui/ThemeToggle'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-center pt-6 px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="glass-panel rounded-full px-6 py-3 flex items-center gap-8 pointer-events-auto"
      >
        <Link
          to="/"
          className="text-lg font-bold tracking-tighter hover:opacity-70 transition-opacity"
        >
          Noxis<span className="text-primary">.</span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a
            href="#manifesto"
            className="hover:text-foreground transition-colors"
          >
            Vision
          </a>
          <a
            href="#services"
            className="hover:text-foreground transition-colors"
          >
            Services
          </a>
          <a
            href="#process"
            className="hover:text-foreground transition-colors"
          >
            Approach
          </a>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a
            href="mailto:hello@noxis.agency"
            className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact
          </a>
        </div>
      </motion.nav>
    </header>
  )
}
