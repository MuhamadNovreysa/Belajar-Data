'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';

export interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  changeLabel?: string;
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink';
  className?: string;
  onClick?: () => void;
}

export function StatsCard({
  label,
  value,
  icon,
  change,
  changeLabel,
  color = 'blue',
  className,
  onClick,
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    purple: 'bg-purple-50 text-purple-600',
    pink: 'bg-pink-50 text-pink-600',
  };

  const changeColor = (change: number) => {
    if (change > 0) return 'text-green-600';
    if (change < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  const changeArrow = (change: number) => {
    if (change > 0) return '↑';
    if (change < 0) return '↓';
    return '→';
  };

  return (
    <Card
      variant="default"
      padding="md"
      hover="lift"
      className={cn(
        'transition-all cursor-pointer',
        onClick && 'cursor-pointer hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
            colorClasses[color]
          )}
        >
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm text-gray-500">{label}</div>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              <span className={cn(
                'text-xs font-medium',
                changeColor(change)
              )}>
                {changeArrow(change)} {Math.abs(change)}%
              </span>
              {changeLabel && (
                <span className="text-xs text-gray-400">{changeLabel}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default StatsCard;
