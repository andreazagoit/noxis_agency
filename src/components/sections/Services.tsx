import { motion } from 'framer-motion'
import { BentoWireframe } from '../3d/BentoWireframe'
import { Container } from '../layout/Container'

type GeometryType =
  | 'icosahedron'
  | 'octahedron'
  | 'torus'
  | 'torusKnot'
  | 'dodecahedron'

const bentoItems: Array<{
  title: string
  description: string
  span: string
  accent?: boolean
  geometry: GeometryType
}> = [
    {
      title: 'Digital Ecosystems',
      description: 'Full-stack architectures that scale effortlessly.',
      span: 'md:col-span-2 md:row-span-2',
      accent: true,
      geometry: 'icosahedron',
    },
    {
      title: 'Immersive Front-end',
      description: 'Award-winning motion and interaction design.',
      span: 'md:col-span-1 md:row-span-2',
      geometry: 'torusKnot',
    },
    {
      title: 'Mobile Experiences',
      description: 'Native-feel applications for iOS and Android.',
      span: 'md:col-span-1 md:row-span-1',
      geometry: 'octahedron',
    },
    {
      title: 'Cloud Native',
      description: 'Serverless, edge-first, infinitely scalable.',
      span: 'md:col-span-1 md:row-span-1',
      geometry: 'torus',
    },
    {
      title: 'Design Systems',
      description: 'Consistent, beautiful, reusable components.',
      span: 'md:col-span-1 md:row-span-1',
      geometry: 'dodecahedron',
    },
  ]

export function Services() {
  return (
    <section id="services">
      <Container className="py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight mb-4">
            What We Build<span className="text-primary">.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl">
            We don't offer menus. We offer solutions. Our expertise is focused,
            deep, and uncompromising.
          </p>
        </motion.div>

        {/* Bento Grid - 3 columns, auto rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-[240px]">
          {bentoItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                                group relative overflow-hidden rounded-3xl
                                ${item.span}
                                ${item.accent
                  ? 'bg-gradient-to-br from-primary/80 to-primary text-primary-foreground border border-transparent hover:border-white'
                  : 'glass-panel hover:border-primary/50'
                }
                                transition-all duration-500
                            `}
            >
              {/* Content Layout */}
              <div className="relative h-full">
                {/* Text Content - Left Side */}
                <div className="relative z-10 w-1/2 h-full p-8 flex flex-col justify-end">
                  <h3
                    className={`
                                          text-lg md:text-xl font-semibold mb-2 tracking-tight leading-tight
                                          ${item.accent ? '' : 'group-hover:text-primary transition-colors'}
                                      `}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`
                                          text-xs md:text-sm leading-relaxed
                                          ${item.accent ? 'text-white/80' : 'text-muted-foreground'}
                                      `}
                  >
                    {item.description}
                  </p>
                </div>

                {/* 3D Full Cover */}
                <BentoWireframe
                  geometry={item.geometry}
                  accentColor={item.accent}
                  useGlass={true}
                  position={item.span.includes('col-span-2') ? [2, 0, 0] : [1, 0, 0]}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
