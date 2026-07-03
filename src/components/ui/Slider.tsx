import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils/helpers';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient';
  marks?: { value: number; label: string }[];
  className?: string;
}

export function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  valuePrefix = '',
  valueSuffix = '',
  disabled = false,
  size = 'md',
  variant = 'default',
  marks,
  className,
}: SliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percentage = ((value - min) / (max - min)) * 100;

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const thumbClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const variantClasses = {
    default: 'bg-blue-600',
    gradient: 'bg-gradient-to-r from-blue-500 to-purple-500',
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || disabled) return;
    updateValue(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateValue = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const newValue = min + (x / rect.width) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    onChange(Math.min(Math.max(steppedValue, min), max));
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && (
            <span className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'opacity-50'
            )}>
              {label}
            </span>
          )}
          {showValue && (
            <span className={cn(
              'text-sm font-medium text-gray-700',
              disabled && 'opacity-50'
            )}>
              {valuePrefix}{value}{valueSuffix}
            </span>
          )}
        </div>
      )}
      <div
        ref={sliderRef}
        className={cn(
          'relative w-full rounded-full bg-gray-200 cursor-pointer',
          sizeClasses[size],
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onMouseDown={handleMouseDown}
      >
        <div
          className={cn(
            'absolute left-0 top-0 h-full rounded-full transition-all',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
        <div
          className={cn(
            'absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-md border-2 transition-all',
            'hover:scale-110 active:scale-95',
            variantClasses[variant],
            thumbClasses[size],
            disabled && 'cursor-not-allowed'
          )}
          style={{ left: `${percentage}%` }}
        />
      </div>
      {marks && marks.length > 0 && (
        <div className="relative w-full mt-1 flex justify-between">
          {marks.map((mark) => (
            <div
              key={mark.value}
              className="text-xs text-gray-500"
              style={{
                marginLeft: mark.value === min ? '0' : mark.value === max ? 'auto' : '0',
              }}
            >
              {mark.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Slider;
