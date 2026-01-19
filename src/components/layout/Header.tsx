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
        className="pointer-events-auto flex items-center gap-6 p-2 pr-2 pl-6 rounded-full border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md shadow-lg"
      >
        <Link
          to="/"
          className="flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-primary overflow-hidden shadow-inner">
            <svg
              viewBox="0 0 1024 1024"
              className="w-4 h-4 fill-black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M610.031 304.344V283.25H767.844V304.344H705.344V748.094L660.812 755.906L360.031 405.125V730.906H405.344C416.281 731.948 423.312 738.979 426.438 752H264.719V730.906H327.219V304.344H264.719V283.25H396.75L672.531 606.688V304.344H610.031Z" />
            </svg>
          </div>
        </Link>

        {/* Static Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium text-black dark:text-white">
          <a
            href="#manifesto"
            className="hover:text-primary transition-colors"
          >
            Vision
          </a>
          <a
            href="#services"
            className="hover:text-primary transition-colors"
          >
            Services
          </a>
          <a
            href="#methodology"
            className="hover:text-primary transition-colors"
          >
            Method
          </a>
        </div>

        <div className="w-px h-4 bg-black/10 dark:bg-white/10" />

        <div className="pl-1 pr-1">
          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  )
}
