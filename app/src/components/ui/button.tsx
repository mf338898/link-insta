import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-[color:var(--alv-navy)] text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)] hover:bg-[color:var(--alv-navy)]/92",
        outline:
          "border border-[rgba(148,197,255,0.38)] bg-white/90 text-[color:var(--alv-navy)] shadow-[0_10px_22px_rgba(15,23,42,0.12)] hover:border-[rgba(148,197,255,0.5)] hover:bg-white",
        ghost: "bg-white/70 text-[color:var(--alv-navy)] shadow-sm hover:bg-white",
        subtle:
          "border border-[rgba(148,197,255,0.28)] bg-gradient-to-br from-white via-slate-50/70 to-white text-[color:var(--alv-navy)] shadow-[0_10px_22px_rgba(15,23,42,0.08)] hover:border-[rgba(148,197,255,0.4)] hover:shadow-[0_12px_26px_rgba(15,23,42,0.12)]"
      },
      size: {
        sm: "h-9 px-4 py-2",
        md: "h-10 px-4 py-2.5",
        lg: "h-11 px-5 py-3"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
);

type ButtonElement = HTMLButtonElement | HTMLAnchorElement;

type ButtonProps<T extends React.ElementType = "button"> = {
  as?: T;
  className?: string;
} & VariantProps<typeof buttonVariants> &
  Omit<React.ComponentPropsWithoutRef<T>, "as" | "className">;

const Button = React.forwardRef<ButtonElement, ButtonProps<React.ElementType>>(
  ({ as, className, variant, size, ...props }, ref) => {
    const Component = (as || "button") as React.ElementType;

    return (
      <Component
        ref={ref as React.Ref<any>}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
