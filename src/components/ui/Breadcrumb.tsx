import { ReactNode } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
  activeClassName?: string;
}

export function Breadcrumb({
  items,
  separator = '/',
  className,
  itemClassName,
  activeClassName,
}: BreadcrumbProps) {
  return (
    <nav
      className={cn('flex items-center gap-2 text-sm', className)}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isActive = item.active || isLast;

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-gray-400">{separator}</span>
            )}
            {item.href && !isActive ? (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors',
                  itemClassName
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'flex items-center gap-1.5 text-gray-900 font-medium',
                  isActive && activeClassName,
                  itemClassName
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.icon}
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default Breadcrumb;
