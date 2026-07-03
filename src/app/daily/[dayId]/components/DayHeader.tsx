'use client';

import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDayLabel } from '@/lib/utils/helpers';

interface DayHeaderProps {
  dayId: number;
  month: number;
  week: number;
  dayInMonth: number;
  title: string;
  subtitle: string;
  completionPercentage: number;
  isComplete: boolean;
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export function DayHeader({
  dayId,
  month,
  week,
  dayInMonth,
  title,
  subtitle,
  completionPercentage,
  isComplete,
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
}: DayHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            {formatDayLabel(dayId)}
          </h1>
          {isComplete ? (
            <Badge variant="success" size="lg">✅ Selesai</Badge>
          ) : completionPercentage > 0 ? (
            <Badge variant="primary" size="lg">🔄 {Math.round(completionPercentage)}%</Badge>
          ) : (
            <Badge variant="secondary" size="lg">⏳ Belum Dimulai</Badge>
          )}
          <Badge variant="secondary" size="sm">Bulan {month}</Badge>
          <Badge variant="secondary" size="sm">Minggu {week}</Badge>
        </div>
        <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300 mt-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={isPrevDisabled}
          aria-label="Previous day"
        >
          ←
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={isNextDisabled}
          aria-label="Next day"
        >
          →
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/daily'}
          aria-label="Go to today"
        >
          📅 Hari Ini
        </Button>
      </div>
    </div>
  );
}
