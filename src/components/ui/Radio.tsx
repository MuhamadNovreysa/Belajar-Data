import { cn } from '@/lib/utils/helpers';

export interface RadioOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
  description?: string;
}

export interface RadioProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  description?: string;
  variant?: 'default' | 'card' | 'button';
  size?: 'sm' | 'md' | 'lg';
  direction?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

export function Radio({
  options,
  value,
  onChange,
  label,
  error,
  description,
  variant = 'default',
  size = 'md',
  direction = 'vertical',
  fullWidth = false,
  className,
  disabled = false,
}: RadioProps) {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const labelSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const directionClasses = {
    horizontal: 'flex-row flex-wrap gap-4',
    vertical: 'flex-col gap-2',
  };

  const variantClasses = {
    default: {
      container: 'flex items-start gap-3',
      radio: 'rounded-full border-2 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
      checked: 'border-blue-600 bg-blue-600',
    },
    card: {
      container: cn(
        'flex items-center gap-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
        'hover:border-blue-300',
        fullWidth && 'flex-1'
      ),
      radio: 'rounded-full border-2 border-gray-300',
      checked: 'border-blue-600 bg-blue-600',
    },
    button: {
      container: cn(
        'flex items-center justify-center px-4 py-2 rounded-lg border-2 transition-all cursor-pointer',
        'hover:bg-gray-50 hover:border-gray-300',
        fullWidth && 'flex-1'
      ),
      radio: 'hidden',
      checked: 'border-blue-600 bg-blue-50 text-blue-700',
    },
  };

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-2 text-sm font-medium text-gray-700">{label}</div>
      )}
      <div className={cn('flex', directionClasses[direction])}>
        {options.map((option) => {
          const isChecked = value === option.value;
          const isDisabled = disabled || option.disabled;
          const currentVariant = variantClasses[variant];

          return (
            <label
              key={option.value}
              className={cn(
                'cursor-pointer transition-all',
                isDisabled && 'opacity-50 cursor-not-allowed',
                variant === 'card' && currentVariant.container,
                variant === 'button' && currentVariant.container,
                variant === 'default' && 'flex items-start gap-3',
                isChecked && variant === 'button' && 'border-blue-600 bg-blue-50 text-blue-700',
                isChecked && variant === 'card' && 'border-blue-600 bg-blue-50'
              )}
            >
              <input
                type="radio"
                value={option.value}
                checked={isChecked}
                onChange={() => !isDisabled && onChange(option.value)}
                disabled={isDisabled}
                className={cn(
                  'flex-shrink-0 transition-all',
                  variant === 'default' && currentVariant.radio,
                  variant === 'card' && currentVariant.radio,
                  variant === 'button' && currentVariant.radio,
                  sizeClasses[size],
                  isChecked && currentVariant.checked,
                  isChecked && variant === 'button' && 'hidden'
                )}
              />
              <div className={cn(
                'flex-1',
                labelSizeClasses[size],
                variant === 'button' && 'text-center'
              )}>
                {option.label}
                {option.description && (
                  <div className="text-sm text-gray-500">{option.description}</div>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {description && !error && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}

export default Radio;
