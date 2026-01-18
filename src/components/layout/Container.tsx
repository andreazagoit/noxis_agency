import React from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType
}

export function Container({
  className,
  as: Component = 'div',
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn('w-full px-[5vw]', className)}
      {...(props as any)}
    />
  )
}
