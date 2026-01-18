import { useEffect } from 'react'
import {
    ReactFlow,
    Background,
    useNodesState,
    useEdgesState,
    ConnectionLineType,
    useReactFlow,
    Panel,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { ProcessNode } from './ProcessNode'
import { Container } from '../layout/Container'
import { Button } from '../ui/button'
import { RotateCcw } from 'lucide-react'
import { useIsMobile } from '../../hooks/use-mobile'

const nodeTypes = {
    process: ProcessNode,
}

// Desktop Configuration
const initialNodes = [
    // Center Flow
    {
        id: 'discovery',
        type: 'process',
        position: { x: 0, y: 150 },
        data: {
            title: 'Inception',
            accent: true,
            items: ['Market Analysis', 'User Persona', 'Core Strategy'],
        },
    },
    {
        id: 'design',
        type: 'process',
        position: { x: 300, y: 150 },
        data: {
            title: 'Creation',
            accent: true,
            items: ['UI Systems', 'Motion Design', 'Interactivity'],
        },
    },
    {
        id: 'polish',
        type: 'process',
        position: { x: 600, y: 150 },
        data: {
            title: 'Refinement',
            accent: true,
            items: ['Micro-interactions', 'Performance', 'Accessibility'],
        },
    },

    // Top/Bottom
    {
        id: 'concept',
        type: 'process',
        position: { x: 300, y: -20 }, // Above Design
        data: {
            title: 'Vision',
            accent: false, // Dark/Default
            items: ['Art Direction', 'Visual Identity', 'Storytelling'],
        },
    },
    {
        id: 'develop',
        type: 'process',
        position: { x: 300, y: 320 }, // Below Design
        data: {
            title: 'Engineering',
            accent: false,
            items: ['Creative Coding', 'WebGL & 3D', 'Scalable Arch.'],
        },
    },

    // Final
    {
        id: 'launch',
        type: 'process',
        position: { x: 900, y: 150 },
        data: {
            title: 'Elevation',
            accent: false,
            items: ['Global Launch', 'Analytics', 'Growth Support'],
        },
    },
]

const initialEdges = [
    // Horizontal Flow (Inception -> Creation -> Refinement -> Elevation)
    {
        id: 'e1-2',
        source: 'discovery',
        target: 'design',
        sourceHandle: 'left-source', // User requested 'sinistra'
        targetHandle: 'right-target', // User requested 'destra'
        animated: true,
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--primary)', strokeWidth: 2 },
    },
    {
        id: 'e2-3',
        source: 'design',
        target: 'polish',
        sourceHandle: 'right',
        targetHandle: 'left',
        animated: true,
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--primary)', strokeWidth: 2 },
    },
    {
        id: 'e3-6',
        source: 'polish',
        target: 'launch',
        sourceHandle: 'right',
        targetHandle: 'left',
        animated: true,
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--foreground)', strokeWidth: 2 },
    },

    // Vertical Branches
    // Vision (Top) -> Creation (Middle)
    {
        id: 'e4-2',
        source: 'concept',
        target: 'design',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--foreground)', strokeWidth: 1, strokeDasharray: '5,5' },
    },
    // Creation (Middle) -> Engineering (Bottom)
    {
        id: 'e2-5',
        source: 'design',
        target: 'develop',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--foreground)', strokeWidth: 1, strokeDasharray: '5,5' },
    },
]

// Mobile Configuration (Vertical Stack)
const mobileNodes = [
    {
        id: 'discovery',
        type: 'process',
        position: { x: 0, y: 0 },
        data: {
            title: 'Inception',
            accent: true,
            items: ['Market Analysis', 'User Persona', 'Core Strategy'],
        },
    },
    {
        id: 'concept',
        type: 'process',
        position: { x: 0, y: 200 },
        data: {
            title: 'Vision',
            accent: false,
            items: ['Art Direction', 'Visual Identity', 'Storytelling'],
        },
    },
    {
        id: 'design',
        type: 'process',
        position: { x: 0, y: 400 },
        data: {
            title: 'Creation',
            accent: true,
            items: ['UI Systems', 'Motion Design', 'Interactivity'],
        },
    },
    {
        id: 'develop',
        type: 'process',
        position: { x: 0, y: 600 },
        data: {
            title: 'Engineering',
            accent: false,
            items: ['Creative Coding', 'WebGL & 3D', 'Scalable Arch.'],
        },
    },
    {
        id: 'polish',
        type: 'process',
        position: { x: 0, y: 800 },
        data: {
            title: 'Refinement',
            accent: true,
            items: ['Micro-interactions', 'Performance', 'Accessibility'],
        },
    },
    {
        id: 'launch',
        type: 'process',
        position: { x: 0, y: 1000 },
        data: {
            title: 'Elevation',
            accent: false,
            items: ['Global Launch', 'Analytics', 'Growth Support'],
        },
    },
]

const mobileEdges = [
    {
        id: 'm1-2',
        source: 'discovery',
        target: 'concept',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        animated: true,
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--primary)', strokeWidth: 2 },
    },
    {
        id: 'm2-3',
        source: 'concept',
        target: 'design',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        animated: true,
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--primary)', strokeWidth: 2 },
    },
    {
        id: 'm3-4',
        source: 'design',
        target: 'develop',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        animated: true,
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--primary)', strokeWidth: 2 },
    },
    {
        id: 'm4-5',
        source: 'develop',
        target: 'polish',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        animated: true,
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--primary)', strokeWidth: 2 },
    },
    {
        id: 'm5-6',
        source: 'polish',
        target: 'launch',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        animated: true,
        type: ConnectionLineType.Bezier,
        style: { stroke: 'var(--foreground)', strokeWidth: 2 },
    },
]

function MethodControls({ isMobile }: { isMobile: boolean }) {
    const { getNodes, setNodes, fitView } = useReactFlow()
    const targetNodes = isMobile ? mobileNodes : initialNodes

    const handleReset = () => {
        const startNodes = getNodes()
        const startTime = performance.now()
        const duration = 800 // ms

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)

            // Easing function (easeOutQuart)
            const ease = 1 - Math.pow(1 - progress, 4)

            const nextNodes = startNodes.map(node => {
                const targetNode = targetNodes.find(n => n.id === node.id)
                if (!targetNode) return node

                // Interpolate position
                const startX = node.position.x
                const startY = node.position.y
                const targetX = targetNode.position.x
                const targetY = targetNode.position.y

                return {
                    ...node,
                    position: {
                        x: startX + (targetX - startX) * ease,
                        y: startY + (targetY - startY) * ease
                    }
                }
            })

            setNodes(nextNodes)

            // Also fit view on mobile reset to ensure visibility
            if (isMobile && progress === 1) {
                fitView({ duration: 800 })
            }

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }

    return (
        <Panel position="bottom-left" className="mb-4 ml-4">
            <Button
                variant="outline"
                size="icon-sm"
                onClick={handleReset}
                className="bg-background/50 backdrop-blur-md border-border hover:bg-primary/10 hover:border-primary transition-all duration-300"
            >
                <RotateCcw className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                <span className="sr-only">Reset Nodes</span>
            </Button>
        </Panel>
    )
}

export function Method() {
    const isMobile = useIsMobile()
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

    // Switch layout based on device
    useEffect(() => {
        if (isMobile) {
            setNodes(mobileNodes)
            setEdges(mobileEdges)
        } else {
            setNodes(initialNodes)
            setEdges(initialEdges)
        }
    }, [isMobile, setNodes, setEdges])

    return (
        <section className="py-24 w-full h-[90vh] bg-background relative border-t border-border/40">
            <Container className="h-full relative">
                <div className="absolute top-0 left-6 z-10 pointer-events-none">
                    <h2 className="text-6xl font-heading font-bold mb-4">
                        Our Process<span className="text-primary">.</span>
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Drag to explore our methodology.
                    </p>
                </div>

                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    nodeTypes={nodeTypes}
                    fitView
                    className="bg-transparent"
                    minZoom={isMobile ? 0.5 : 1}
                    maxZoom={isMobile ? 1.5 : 1}
                    zoomOnScroll={false}
                    zoomOnPinch={isMobile} // Allow zoom on mobile
                    zoomOnDoubleClick={false}
                    preventScrolling={false}
                    panOnDrag={isMobile} // Allow pan on mobile
                    panOnScroll={false}
                    proOptions={{ hideAttribution: true }}
                    translateExtent={isMobile ? [[-100, -100], [500, 1500]] : [[-50, -50], [1200, 500]]}
                    nodeExtent={isMobile ? [[-100, -100], [500, 1500]] : [[-50, -50], [1200, 500]]}
                >
                    <Background color="var(--border)" gap={20} size={1} />
                    <MethodControls isMobile={isMobile} />
                </ReactFlow>
            </Container>
        </section>
    )
}
