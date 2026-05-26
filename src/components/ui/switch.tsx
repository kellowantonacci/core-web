"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"
import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: SwitchPrimitive.Root.Props) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center border-theme rounded-theme shadow-theme transition-all outline-none cursor-pointer data-[size=default]:h-6 data-[size=default]:w-11 theme-interactive",
        "data-checked:bg-[var(--theme-primary)] data-unchecked:bg-[var(--theme-surface)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-4 border-theme rounded-theme bg-[var(--theme-surface)] shadow-theme transition-transform group-data-checked/switch:translate-x-5 group-data-unchecked/switch:translate-x-1"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
