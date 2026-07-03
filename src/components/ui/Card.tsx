import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/helpers';

const cardVariants = cva(
  "bg-white rounded-xl transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border border-gray-200 shadow-sm hover:shadow",
        elevated: "border-0 shadow-md hover:shadow-lg",
        outline: "border-2 border-gray-200 bg-transparent",
        ghost: "border-0 shadow-none bg-transparent",
        gradient: "border-0 bg-gradient-to-br from-blue-50 to-purple-50 shadow-sm",
        dark: "bg-gray-800 text-white border-0 shadow-sm",
        glass: "bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-5",
        lg: "p-6",
        xl: "p-8",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-xl",
        lg: "rounded-2xl",
        full: "rounded-full",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1 hover:shadow-lg",
        glow: "hover:shadow-blue-200 hover:shadow-xl",
        scale: "hover:scale-[1.02]",
        border: "hover:border-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      rounded: "md",
      hover: "none",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Card({
  children,
  className,
  variant,
  padding,
  rounded,
  hover,
  header,
  footer,
  title,
  subtitle,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, rounded, hover }), className)}
      {...props}
    >
      {header && (
        <div className="border-b border-gray-200 pb-4 mb-4">
          {header}
        </div>
      )}
      {title && (
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      <div>{children}</div>
      {footer && (
        <div className="border-t border-gray-200 pt-4 mt-4">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
