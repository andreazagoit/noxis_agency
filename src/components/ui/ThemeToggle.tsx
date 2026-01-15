import { Moon, Sun } from "lucide-react"
import { useTheme } from "../theme-provider"
import { motion } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full hover:bg-secondary/80 transition-colors"
            aria-label="Toggle theme"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180, scale: theme === "dark" ? 1 : 0 }}
                className="absolute inset-0 m-auto w-5 h-5 flex items-center justify-center text-foreground"
            >
                <Moon size={20} />
            </motion.div>

            <motion.div
                initial={false}
                animate={{ rotate: theme === "light" ? 0 : -180, scale: theme === "light" ? 1 : 0 }}
                className="w-5 h-5 flex items-center justify-center text-foreground"
            >
                <Sun size={20} />
            </motion.div>
        </button>
    )
}
