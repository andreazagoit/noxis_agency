import { ThemeToggle } from '../ui/ThemeToggle'

export function Footer() {
    return (
        <footer className="relative py-20 px-6 md:px-12 border-t border-border/40 mt-20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                        Let's build <br />
                        <span className="text-muted-foreground">the unlikely.</span>
                    </h2>
                    <a
                        href="mailto:hello@noxis.agency"
                        className="text-xl hover:text-primary transition-colors border-b border-sidebar-border pb-1"
                    >
                        hello@noxis.agency
                    </a>
                </div>

                <div className="flex gap-6 text-sm text-muted-foreground">
                    <p>© 2026 Noxis Agency</p>
                    <div className="flex gap-4 items-center">
                        <ThemeToggle />
                        <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
                        <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
