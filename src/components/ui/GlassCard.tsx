import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
      transition={{ duration: 0.3 }}
      className={cn(
        'glass-panel rounded-2xl p-8 border border-white/10 relative overflow-hidden group',
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
