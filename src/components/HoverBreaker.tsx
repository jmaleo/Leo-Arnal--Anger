import React from "react"
import { cn } from "@/lib/utils"

interface HoverBreakerProps {
  text: string
  className?: string
  wordClassName?: string
}

export const HoverBreaker = ({ text, className, wordClassName }: HoverBreakerProps) => {
  const words = text.split(" ")

  return (
    <div className={cn("flex flex-wrap justify-center gap-x-2 gap-y-1", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            "relative inline-block cursor-pointer select-none px-1",
            "transition-all duration-100",
            "hover:bg-white hover:text-black hover:-translate-y-1",
            wordClassName
          )}
          style={{
            "--rotate-direction": i % 2 === 0 ? "1" : "-1",
          } as React.CSSProperties}
        >
          <span className="block hover:rotate-[calc(var(--rotate-direction)*3deg)] font-mono">
            {word}
          </span>
        </span>
      ))}
    </div>
  )
}