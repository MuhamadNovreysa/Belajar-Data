'use client';

import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

interface MonthProgressProps {
  month: number;
  completionPercentage: number;
  completedDays: number;
  totalDays: number;
  inProgressDays: number;
}

export function MonthProgress({
  month,
  completionPercentage,
  completedDays,
  totalDays,
  inProgressDays,
}: MonthProgressProps) {
  const notStartedDays = totalDays - completedDays - inProgressDays;

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">Progress Bulan {month}</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {Math.round(completionPercentage)}%
            </span>
          </div>
          <ProgressBar
            value={completionPercentage}
            max={100}
            size="lg"
            color={completionPercentage === 100 ? 'green' : 'blue'}
            showPercentage={false}
            animated
          />
        </div>
        <div className="flex flex-wrap gap-3 text-xs">
          <Badge variant="success" size="sm">
            ✅ {completedDays} selesai
          </Badge>
          <Badge variant="primary" size="sm">
            🔄 {inProgressDays} berjalan
          </Badge>
          <Badge variant="secondary" size="sm">
            ⏳ {notStartedDays} belum
          </Badge>
        </div>
      </div>
    </div>
  );
}
