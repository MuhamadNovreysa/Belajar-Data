'use client';

import { Button } from '@/components/ui/Button';

interface DayNavigatorProps {
  currentDay: number;
  totalDays: number;
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

export function DayNavigator({
  currentDay,
  totalDays,
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
}: DayNavigatorProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrev}
        disabled={isPrevDisabled}
        className="flex-1"
      >
        ← Hari {currentDay - 1}
      </Button>
      <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
        {currentDay} / {totalDays}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={onNext}
        disabled={isNextDisabled}
        className="flex-1"
      >
        Hari {currentDay + 1} →
      </Button>
    </div>
  );
}
