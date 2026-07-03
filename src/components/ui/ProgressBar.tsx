import { cn } from '@/lib/utils/helpers';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  showLabel?: boolean;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'gradient';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
  labelClassName?: string;
  barClassName?: string;
}

const colorClasses = {
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  red: 'bg-red-600',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-600',
  pink: 'bg-pink-600',
  gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
};

const sizeClasses = {
  xs: 'h-1',
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
  xl: 'h-6',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercentage = true,
  showLabel = true,
  color = 'blue',
  size = 'md',
  animated = true,
  className,
  labelClassName,
  barClassName,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const isComplete = percentage >= 100;

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {showLabel && label && (
            <span className={cn('text-sm font-medium text-gray-700', labelClassName)}>
              {label}
            </span>
          )}
          {showPercentage && (
            <span className={cn('text-sm font-medium text-gray-600', labelClassName)}>
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden relative',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'rounded-full transition-all duration-500 ease-out',
            colorClasses[color],
            isComplete && 'bg-green-600',
            animated && 'transition-all duration-1000 ease-out',
            sizeClasses[size],
            barClassName
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {size === 'lg' || size === 'xl' ? (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
              {Math.round(percentage)}%
            </span>
          ) : null}
        </div>
        {animated && (
          <div
            className="absolute inset-0 overflow-hidden rounded-full"
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        )}
      </div>
      {isComplete && (
        <div className="mt-1 text-xs font-medium text-green-600">✅ Selesai!</div>
      )}
    </div>
  );
}

export default ProgressBar;
