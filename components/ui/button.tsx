import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariants = "default" | "outline";
type ButtonSizes = "default" | "sm";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  asChild?: boolean;
};

type ButtonRef = HTMLButtonElement;

type ButtonComponent = React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<ButtonRef>
> & {
  displayName?: string;
};

export const Button: ButtonComponent = React.forwardRef<ButtonRef, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    const variants: Record<ButtonVariants, string> = {
      default: "bg-neutral-900 text-white hover:bg-neutral-800",
      outline: "border border-neutral-300 text-neutral-800 bg-white hover:bg-neutral-50"
    };
    const sizes: Record<ButtonSizes, string> = {
      default: "h-10 px-4 py-2 rounded-lg",
      sm: "h-9 px-3 rounded-lg text-sm"
    };

    const classes = cn(base, variants[variant], sizes[size], className);

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(classes, (children as React.ReactElement<any>).props?.className),
        ...props
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
