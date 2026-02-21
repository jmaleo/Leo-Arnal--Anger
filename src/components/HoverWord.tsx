import React from "react"
import { cn } from "@/lib/utils"

interface HoverWordProps {
  children: string
  className?: string
  rotation?: number
}

export const HoverWord = ({ children, className, rotation }: HoverWordProps) => {
  const rotateDeg = rotation || (children.length % 2 === 0 ? 3 : -3)

  return (
    <span
      className={cn(
        "relative inline-block cursor-pointer", 
        "pointer-events-auto", 
        "transition-all duration-100",
        "hover:bg-white hover:text-black hover:-translate-y-0.5",
        "active:translate-y-0.5",
        className
      )}
      style={{
        "--rotate-target": `${rotateDeg}deg`,
      } as React.CSSProperties}
    >
      <span className="block px-1 transition-transform duration-100 hover:rotate-[var(--rotate-target)] font-mono font-bold">
        {children}
      </span>
    </span>
  )
}