import { cn } from '@/lib/utils/helpers';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  labelClassName?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  size = 'md',
  className,
  labelClassName,
}: ToggleProps) {
  const sizeClasses = {
    sm: {
      track: 'w-8 h-5',
      thumb: 'w-3 h-3',
      thumbTranslate: 'translate-x-3',
    },
    md: {
      track: 'w-11 h-6',
      thumb: 'w-4 h-4',
      thumbTranslate: 'translate-x-5',
    },
    lg: {
      track: 'w-14 h-7',
      thumb: 'w-5 h-5',
      thumbTranslate: 'translate-x-7',
    },
  };

  const handleClick = () => {
    if (disabled) return;
    onChange(!checked);
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          'relative inline-flex flex-shrink-0 rounded-full transition-colors duration-200 ease-in-out',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          checked ? 'bg-blue-600' : 'bg-gray-300',
          sizeClasses[size].track
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block rounded-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out',
            sizeClasses[size].thumb,
            checked && sizeClasses[size].thumbTranslate
          )}
        />
      </button>
      {label && (
        <span className={cn(
          'text-sm font-medium text-gray-700',
          disabled && 'opacity-50 cursor-not-allowed',
          labelClassName
        )}>
          {label}
        </span>
      )}
    </div>
  );
}

export default Toggle;
