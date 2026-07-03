import { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils/helpers';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  error?: string;
  description?: string;
  variant?: 'default' | 'card' | 'button';
}

export function Checkbox({
  className,
  label,
  error,
  description,
  variant = 'default',
  id,
  disabled,
  ...props
}: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substring(2, 9)}`;

  const variants = {
    default: 'w-4 h-4',
    card: 'w-5 h-5',
    button: 'w-5 h-5',
  };

  return (
    <div className={cn('flex items-start', className)}>
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          type="checkbox"
          disabled={disabled}
          className={cn(
            'rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:ring-red-500',
            variants[variant]
          )}
          {...props}
        />
      </div>
      {(label || description) && (
        <div className="ml-3">
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'text-sm font-medium text-gray-700',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          )}
          {error && (
            <p className="text-xs text-red-600 mt-1">{error}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Checkbox;
