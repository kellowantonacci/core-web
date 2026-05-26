import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 border-theme bg-[var(--theme-surface)] px-3 py-1.5 text-sm transition-all outline-none rounded-theme shadow-theme placeholder:text-[var(--theme-foreground)]/50 focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Input }
