import { SelectHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils/helpers';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  error?: string;
  description?: string;
  options: SelectOption[];
  placeholder?: string;
  variant?: 'default' | 'outline' | 'filled' | 'flushed';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      description,
      options,
      placeholder,
      variant = 'default',
      size = 'md',
      fullWidth = true,
      leftIcon,
      id,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;

    const variants = {
      default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
      outline: 'border-2 border-gray-300 focus:border-blue-500 focus:ring-0',
      filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-blue-500',
      flushed: 'border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-500 focus:ring-0',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-5 py-3.5 text-base',
    };

    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'block text-sm font-medium text-gray-700 mb-1.5',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            value={value}
            className={cn(
              'w-full rounded-lg transition-colors duration-200 appearance-none',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'focus:outline-none',
              variants[variant],
              sizes[size],
              leftIcon && 'pl-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {description && !error && (
          <p className="mt-1 text-xs text-gray-500">{description}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
