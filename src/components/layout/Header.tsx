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
        className="glass-panel rounded-full p-4 flex items-center pointer-events-auto min-w-full md:min-w-[500px]"
      >
        <Link
          to="/"
          className="flex items-center justify-center transition-transform hover:scale-105"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm shadow-sm ring-1 ring-white/5">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary overflow-hidden shadow-inner">
              <svg
                viewBox="0 0 1024 1024"
                className="w-5 h-5 fill-black"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M610.031 304.344V283.25H767.844V304.344H705.344V748.094L660.812 755.906L360.031 405.125V730.906H405.344C416.281 731.948 423.312 738.979 426.438 752H264.719V730.906H327.219V304.344H264.719V283.25H396.75L672.531 606.688V304.344H610.031Z" />
              </svg>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-12 ml-auto text-nav text-foreground/70">
          <a
            href="#manifesto"
            className="hidden md:block hover:text-foreground transition-colors"
          >
            Vision
          </a>
          <a
            href="#services"
            className="hidden md:block hover:text-foreground transition-colors"
          >
            Services
          </a>
          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  )
}
