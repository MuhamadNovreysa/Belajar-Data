'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DailyProgress } from '@/lib/types/progress.types';
import { formatDuration } from '@/lib/utils/helpers';

interface TodayProgressProps {
  dayId: number;
  dayProgress: DailyProgress | null;
  completionPercentage: number;
  totalHoursStudied: number;
  sessionsCompleted: number;
  totalSessions: number;
  subtopicsCompleted: number;
  totalSubtopics: number;
}

export function TodayProgress({
  dayId,
  dayProgress,
  completionPercentage,
  totalHoursStudied,
  sessionsCompleted,
  totalSessions,
  subtopicsCompleted,
  totalSubtopics,
}: TodayProgressProps) {
  const isComplete = completionPercentage >= 100;

  const statusBadge = isComplete
    ? { label: '✅ Selesai', variant: 'success' as const }
    : completionPercentage > 0
    ? { label: '🔄 Sedang Berjalan', variant: 'primary' as const }
    : { label: '⏳ Belum Dimulai', variant: 'secondary' as const };

  return (
    <Card variant="elevated" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            📅 Hari {dayId} - Progress Hari Ini
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <Badge variant={statusBadge.variant} size="lg">
          {statusBadge.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(completionPercentage)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatDuration(Math.round(totalHoursStudied * 60))}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Jam Belajar</div>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {sessionsCompleted}/{totalSessions}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Sesi</div>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {subtopicsCompleted}/{totalSubtopics}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Subtopik</div>
        </div>
      </div>

      <ProgressBar
        value={completionPercentage}
        max={100}
        size="lg"
        color={isComplete ? 'green' : 'blue'}
        showPercentage
        label="Progress Hari Ini"
      />

      {isComplete && (
        <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎉</span>
            <div>
              <h4 className="font-semibold text-green-800 dark:text-green-300">
                Hari {dayId} Selesai!
              </h4>
              <p className="text-sm text-green-600 dark:text-green-400">
                Kamu berhasil menyelesaikan semua target hari ini. Tetap semangat!
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
