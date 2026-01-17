import { Handle, Position, NodeProps } from '@xyflow/react'
import { cn } from '@/lib/utils'

type ProcessNodeData = {
    title: string
    items: string[]
    accent?: boolean
}

export function ProcessNode({ data, isConnectable }: NodeProps) {
    const { title, items, accent } = data as ProcessNodeData

    // Helper styles for handles
    const handleStyle = cn(
        "w-3 h-3 !bg-background border-2 transition-transform hover:scale-125 z-50",
        accent ? "!border-primary" : "!border-muted-foreground"
    )

    return (
        <div className="flex flex-col gap-2 group">
            <h3 className={cn(
                "text-xs font-bold uppercase tracking-widest pl-1 mb-2",
                accent ? "text-foreground" : "text-muted-foreground"
            )}>
                {title}
            </h3>

            <div
                className={cn(
                    'relative rounded-2xl p-4 min-w-[220px] shadow-lg border transition-all duration-300 backdrop-blur-md',
                    accent
                        ? 'bg-primary/5 border-primary text-foreground'
                        : 'bg-card/50 border-border text-card-foreground',
                    'hover:shadow-xl hover:-translate-y-1'
                )}
            >
                {/* Handles on all sides for flexible connections */}
                <Handle type="target" position={Position.Top} id="top" isConnectable={isConnectable} className={handleStyle} />
                <Handle type="target" position={Position.Left} id="left" isConnectable={isConnectable} className={handleStyle} />
                <Handle type="source" position={Position.Left} id="left-source" isConnectable={isConnectable} className={cn(handleStyle, "top-[60%]")} />
                <Handle type="source" position={Position.Right} id="right" isConnectable={isConnectable} className={handleStyle} />
                <Handle type="target" position={Position.Right} id="right-target" isConnectable={isConnectable} className={cn(handleStyle, "top-[60%]")} />
                <Handle type="source" position={Position.Bottom} id="bottom" isConnectable={isConnectable} className={handleStyle} />

                <div className="flex flex-col gap-3">
                    <ul className="space-y-1.5">
                        {items.map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-xs font-medium opacity-90">
                                <span className={cn("w-1 h-1 rounded-full", accent ? "bg-primary" : "bg-muted-foreground")} />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
