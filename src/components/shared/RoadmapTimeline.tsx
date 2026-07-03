'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Tooltip } from '@/components/ui/Tooltip';

export interface RoadmapTimelineProps {
  months: {
    month: number;
    title: string;
    subtitle: string;
    status: 'completed' | 'in_progress' | 'not_started' | 'locked';
    progress: number;
    totalDays: number;
    completedDays: number;
    skills: string[];
    tools: string[];
    icon?: string;
    color?: string;
  }[];
  currentMonth?: number;
  onMonthClick?: (month: number) => void;
  variant?: 'default' | 'compact' | 'detailed' | 'minimal';
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function RoadmapTimeline({
  months,
  currentMonth,
  onMonthClick,
  variant = 'default',
  orientation = 'vertical',
  className,
}: RoadmapTimelineProps) {
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const statusColors = {
    completed: 'bg-green-500',
    in_progress: 'bg-blue-500',
    not_started: 'bg-gray-300',
    locked: 'bg-gray-400',
  };

  const statusLabels = {
    completed: '✅ Selesai',
    in_progress: '🔄 Sedang Berjalan',
    not_started: '⏳ Belum Dimulai',
    locked: '🔒 Terkunci',
  };

  const statusBadgeVariants = {
    completed: 'success',
    in_progress: 'primary',
    not_started: 'secondary',
    locked: 'secondary',
  } as const;

  const getMonthColor = (month: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-green-500 to-green-600',
      'from-yellow-500 to-yellow-600',
      'from-orange-500 to-orange-600',
      'from-purple-500 to-purple-600',
      'from-pink-500 to-pink-600',
    ];
    return colors[(month - 1) % colors.length];
  };

  const getMonthIcon = (month: number) => {
    const icons = ['📗', '📘', '📙', '📕', '📚', '🎯'];
    return icons[(month - 1) % icons.length];
  };

  if (orientation === 'horizontal') {
    return (
      <div className={cn('w-full overflow-x-auto', className)}>
        <div className="flex gap-4 pb-4 min-w-max">
          {months.map((month) => {
            const isActive = month.month === currentMonth;
            const isHovered = hoveredMonth === month.month;
            const monthColor = getMonthColor(month.month);
            const icon = month.icon || getMonthIcon(month.month);

            return (
              <div
                key={month.month}
                className="flex flex-col items-center"
                onMouseEnter={() => setHoveredMonth(month.month)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                <Tooltip
                  content={
                    <div className="text-center">
                      <div className="font-bold">{month.title}</div>
                      <div className="text-xs text-gray-400">{month.subtitle}</div>
                      <div className="text-xs mt-1">
                        {month.completedDays}/{month.totalDays} hari selesai
                      </div>
                      <div className="mt-1">
                        <ProgressBar
                          value={month.progress}
                          max={100}
                          size="sm"
                          color="blue"
                          showPercentage={false}
                        />
                      </div>
                    </div>
                  }
                  position="top"
                >
                  <button
                    onClick={() => onMonthClick?.(month.month)}
                    disabled={month.status === 'locked'}
                    className={cn(
                      'relative flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-300',
                      'w-32 cursor-pointer',
                      isActive && 'ring-2 ring-blue-500 ring-offset-2',
                      isHovered && 'transform scale-105',
                      month.status === 'locked' && 'opacity-50 cursor-not-allowed',
                      variant === 'compact' && 'w-24 p-3',
                      variant === 'minimal' && 'w-20 p-2'
                    )}
                  >
                    <div
                      className={cn(
                        'w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-lg transition-all',
                        'bg-gradient-to-br',
                        monthColor,
                        isHovered && 'shadow-xl',
                        variant === 'compact' && 'w-12 h-12 text-2xl',
                        variant === 'minimal' && 'w-10 h-10 text-xl'
                      )}
                    >
                      {icon}
                    </div>
                    <div className="text-center">
                      <div className={cn(
                        'font-semibold text-sm',
                        variant === 'compact' && 'text-xs',
                        variant === 'minimal' && 'text-xs'
                      )}>
                        Bulan {month.month}
                      </div>
                      {variant !== 'minimal' && (
                        <div className="text-xs text-gray-500 line-clamp-1">
                          {month.title}
                        </div>
                      )}
                    </div>
                    <Badge
                      variant={statusBadgeVariants[month.status]}
                      size="xs"
                      className="mt-1"
                    >
                      {statusLabels[month.status]}
                    </Badge>
                    {variant === 'detailed' && (
                      <div className="w-full mt-2">
                        <ProgressBar
                          value={month.progress}
                          max={100}
                          size="xs"
                          color="blue"
                          showPercentage={false}
                        />
                        <div className="flex justify-between text-xs text-gray-400 mt-0.5">
                          <span>{month.completedDays}/{month.totalDays}</span>
                          <span>{Math.round(month.progress)}%</span>
                        </div>
                      </div>
                    )}
                  </button>
                </Tooltip>
                {isActive && (
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Vertical orientation
  return (
    <div className={cn('relative space-y-0', className)}>
      {/* Timeline line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

      {months.map((month, index) => {
        const isActive = month.month === currentMonth;
        const isLast = index === months.length - 1;
        const monthColor = getMonthColor(month.month);
        const icon = month.icon || getMonthIcon(month.month);

        return (
          <div
            key={month.month}
            className={cn(
              'relative flex gap-4 pl-14 pb-8',
              isLast && 'pb-0'
            )}
          >
            {/* Timeline dot */}
            <div
              className={cn(
                'absolute left-4 top-1 w-4 h-4 rounded-full border-4 border-white shadow transition-all',
                statusColors[month.status],
                isActive && 'ring-4 ring-blue-200 scale-110'
              )}
            />

            <Card
              variant={isActive ? 'elevated' : 'default'}
              padding="md"
              hover={isActive ? 'lift' : 'none'}
              className={cn(
                'flex-1 transition-all cursor-pointer',
                month.status === 'locked' && 'opacity-60 cursor-not-allowed',
                isActive && 'border-blue-200'
              )}
              onClick={() => month.status !== 'locked' && onMonthClick?.(month.month)}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md',
                    'bg-gradient-to-br',
                    monthColor
                  )}
                >
                  {icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-gray-900">
                      Bulan {month.month}: {month.title}
                    </h3>
                    <Badge variant={statusBadgeVariants[month.status]} size="sm">
                      {statusLabels[month.status]}
                    </Badge>
                  </div>

                  <p className="text-sm text-gray-500 mt-1">{month.subtitle}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {month.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="secondary" size="sm">
                        {skill}
                      </Badge>
                    ))}
                    {month.skills.length > 3 && (
                      <Badge variant="secondary" size="sm">
                        +{month.skills.length - 3} lagi
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {month.tools.map((tool) => (
                      <Badge key={tool} variant="primary" size="xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex-1">
                      <ProgressBar
                        value={month.progress}
                        max={100}
                        size="sm"
                        color={month.status === 'completed' ? 'green' : 'blue'}
                        showPercentage={false}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 whitespace-nowrap">
                      {Math.round(month.progress)}%
                    </span>
                    <span className="text-xs text-gray-400">
                      {month.completedDays}/{month.totalDays} hari
                    </span>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0"
                  disabled={month.status === 'locked'}
                  onClick={(e) => {
                    e.stopPropagation();
                    onMonthClick?.(month.month);
                  }}
                >
                  {month.status === 'completed' ? 'Review' : 'Mulai'}
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export default RoadmapTimeline;
