import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full border-theme bg-[var(--theme-surface)] px-3 py-2 text-sm transition-all outline-none rounded-theme shadow-theme placeholder:text-[var(--theme-foreground)]/50 focus-visible:ring-2 focus-visible:ring-[var(--theme-primary)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
