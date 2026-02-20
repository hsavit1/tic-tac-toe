import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-white/20 bg-white/10 text-white",
        blue: "border-sky-400/30 bg-sky-500/15 text-sky-300",
        orange: "border-orange-400/30 bg-orange-500/15 text-orange-300",
        green: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
        muted: "border-white/10 bg-white/5 text-white/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
