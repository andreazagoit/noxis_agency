import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function Quality() {
    return (
        <section className="py-32 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-none mb-8">
                        Obsession <br />
                        <span className="text-muted-foreground">is our strategy.</span>
                    </h2>
                    <div className="space-y-8 text-lg text-muted-foreground">
                        <p>
                            We don't ship "MVP". We ship products that dominate categories.
                        </p>
                        <p>
                            Every pixel is debated. Every interaction is profiled.
                            We treat code as a craft, not a commodity.
                            The result is software that feels inevitable.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-8">
                        <div>
                            <h4 className="text-foreground font-semibold mb-2">Performance</h4>
                            <p className="text-sm text-muted-foreground">Sub-100ms interactions.<br />60fps animations.</p>
                        </div>
                        <div>
                            <h4 className="text-foreground font-semibold mb-2">Accessibility</h4>
                            <p className="text-sm text-muted-foreground">Inclusive by default.<br />WCAG 2.1 AA+.</p>
                        </div>
                    </div>
                </div>

                <div className="relative aspect-square md:aspect-[4/5] rounded-lg overflow-hidden glass-panel">
                    {/* Abstract visual representation of quality/structure */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2/3 h-px bg-white/20 rotate-45" />
                        <div className="w-2/3 h-px bg-white/20 -rotate-45" />
                        <div className="w-32 h-32 border border-white/20 rounded-full" />
                    </div>
                </div>
            </div>
        </section>
    )
}
