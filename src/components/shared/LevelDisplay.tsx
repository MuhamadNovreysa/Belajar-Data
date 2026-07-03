'use client';

import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

export interface LevelDisplayProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  totalXp: number;
  rank: string;
  title: string;
  className?: string;
  compact?: boolean;
}

export function LevelDisplay({
  level,
  xp,
  nextLevelXp,
  totalXp,
  rank,
  title,
  className,
  compact = false,
}: LevelDisplayProps) {
  const progress = (xp / nextLevelXp) * 100;

  if (compact) {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg">
          {rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-gray-900">Level {level}</span>
            <span className="text-xs text-gray-500">{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <ProgressBar
              value={progress}
              max={100}
              size="xs"
              color="yellow"
              showPercentage={false}
              className="flex-1"
            />
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {xp}/{nextLevelXp} XP
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card variant="elevated" padding="lg" className={cn('', className)}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Level Badge */}
        <div className="flex-shrink-0 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-4xl shadow-lg">
            {rank}
          </div>
          <div className="mt-2">
            <div className="text-2xl font-bold text-gray-900">Level {level}</div>
            <div className="text-sm text-gray-500">{title}</div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="flex-1 min-w-0 w-full">
          <div className="flex justify-between text-sm mb-1">
            <span className="font-medium text-gray-700">Progress ke Level {level + 1}</span>
            <span className="font-semibold text-gray-900">{xp} / {nextLevelXp} XP</span>
          </div>
          <ProgressBar
            value={progress}
            max={100}
            size="lg"
            color="gradient"
            showPercentage={false}
            animated
          />

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Total XP: {totalXp}</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default LevelDisplay;
