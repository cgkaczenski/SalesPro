import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950",
  {
    variants: {
      variant: {
        default:
          "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90 rounded-full disabled:bg-grey-800/50 disabled:cursor-not-allowed",
        destructive:
          "bg-red-500 text-zinc-50 shadow-sm hover:bg-red-500/90 disabled:bg-red-500/50 disabled:cursor-not-allowed",
        outline:
          "border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900 disabled:bg-white/50 disabled:text-zinc-500 disabled:cursor-not-allowed",
        secondary:
          "bg-zinc-200 text-zinc-900 shadow-sm hover:bg-zinc-300 rounded-full disabled:bg-zinc-200/50 disabled:text-zinc-500 disabled:cursor-not-allowed",
        ghost:
          "hover:bg-zinc-100/50 hover:text-zinc-900 rounded-full disabled:bg-transparent disabled:text-zinc-500 disabled:cursor-not-allowed",
        link: "text-zinc-900 underline-offset-4 hover:underline rounded-full disabled:text-zinc-500 disabled:no-underline disabled:cursor-not-allowed",
        green:
          "bg-green-500 text-white hover:bg-green-600 active:bg-green-800 active:text-green-100 focus-visible:outline-green-600 rounded-full disabled:bg-green-500/50 disabled:text-white/50 disabled:cursor-not-allowed",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
