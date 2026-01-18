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
      title: 'Digital Strategy',
      description: 'Strategic foundations rooted in ambition and long-term vision.',
      span: 'md:col-span-2 md:row-span-2',
      accent: true,
      geometry: 'icosahedron',
    },
    {
      title: 'Creative Excellence',
      description: 'Design that delivers real value beyond mere aesthetics.',
      span: 'md:col-span-1 md:row-span-2',
      geometry: 'torusKnot',
    },
    {
      title: 'Ethical Engineering',
      description: 'Technology as a positive force for human impact.',
      span: 'md:col-span-1 md:row-span-1',
      geometry: 'octahedron',
    },
    {
      title: 'Solid Systems',
      description: 'Scalable architectures built without shortcuts.',
      span: 'md:col-span-1 md:row-span-1',
      geometry: 'torus',
    },
    {
      title: 'User Respect',
      description: 'Functional products that honor the people using them.',
      span: 'md:col-span-1 md:row-span-1',
      geometry: 'dodecahedron',
    },
  ]

export function Services() {
  return (
    <section id="services">
      <Container className="py-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-element"
        >
          <h2 className="text-title mb-element">
            Premium <br />
            <span className="text-primary italic">Digital Products.</span>
          </h2>
          <p className="text-body max-w-xl text-muted-foreground">
            We unite high-level design, solid technology, and professional ethics
            to create products that are just, useful, and reliable.
          </p>
        </motion.div>

        {/* Bento Grid - 3 columns, auto rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-element auto-rows-[240px]">
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
                      text-body font-semibold mb-2 tracking-tight leading-tight
                      ${item.accent ? '' : 'group-hover:text-primary transition-colors'}
                    `}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`
                                          text-caption leading-relaxed
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
