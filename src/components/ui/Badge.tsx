import { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils/helpers';

const badgeVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        primary: "bg-blue-100 text-blue-800",
        secondary: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        danger: "bg-red-100 text-red-800",
        warning: "bg-yellow-100 text-yellow-800",
        info: "bg-cyan-100 text-cyan-800",
        purple: "bg-purple-100 text-purple-800",
        pink: "bg-pink-100 text-pink-800",
        dark: "bg-gray-800 text-white",
        light: "bg-white text-gray-800 border border-gray-200",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
      },
      size: {
        xs: "px-1.5 py-0.5 text-[10px]",
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      dot: {
        true: "pl-1.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      rounded: "full",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode;
  icon?: ReactNode;
  dotColor?: string;
  removable?: boolean;
  onRemove?: () => void;
}

export function Badge({
  children,
  className,
  variant,
  size,
  rounded,
  dot,
  icon,
  dotColor,
  removable = false,
  onRemove,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size, rounded, dot }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "w-2 h-2 rounded-full mr-1.5 flex-shrink-0",
            dotColor || "bg-current"
          )}
        />
      )}
      {icon && <span className="mr-1.5 flex-shrink-0">{icon}</span>}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1.5 hover:opacity-70 focus:outline-none"
          aria-label="Remove badge"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

export default Badge;
