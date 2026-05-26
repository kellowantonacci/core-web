import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border-theme rounded-theme shadow-theme text-sm font-medium transition-all duration-theme ease-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-border)] disabled:cursor-not-allowed disabled:opacity-50 hover:[transform:var(--theme-hover-transform)] active:translate-x-[var(--theme-active-translate-x)] active:translate-y-[var(--theme-active-translate-y)] active:shadow-[var(--theme-active-box-shadow)]",
  {
    variants: {
      variant: {
        primary: "border-[var(--theme-border)] bg-[var(--theme-primary)] text-[var(--theme-primary-foreground)] hover:bg-[var(--theme-accent)] hover:text-[var(--theme-foreground)]",
        secondary: "border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-foreground)] hover:bg-[var(--theme-muted)]",
        outline: "border-[var(--theme-border)] bg-transparent text-[var(--theme-foreground)] hover:bg-[var(--theme-muted)]",
        ghost: "border-transparent bg-transparent text-[var(--theme-foreground)] hover:bg-[var(--theme-muted)]",
        link: "border-transparent bg-transparent p-0 underline underline-offset-4 text-[var(--theme-foreground)]",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-10 px-4",
        lg: "h-12 px-5",
        "icon-sm": "size-7 rounded-[min(var(--radius-md),12px)]",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
