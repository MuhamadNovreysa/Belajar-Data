'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { DayData, DailyProgress } from '@/lib/types';
import { formatDayLabel } from '@/lib/utils/helpers';

interface DailySummaryProps {
  dayId: number;
  dayProgress: DailyProgress | null;
  dayData: DayData;
  completionPercentage: number;
  totalHoursStudied: number;
  sessionsCompleted: number;
  totalSessions: number;
  subtopicsCompleted: number;
  totalSubtopics: number;
  onOpenReflection: () => void;
  onUpdateEvaluation: (data: any) => void;
  onRefresh: () => void;
}

export function DailySummary({
  dayId,
  dayProgress,
  dayData,
  completionPercentage,
  totalHoursStudied,
  sessionsCompleted,
  totalSessions,
  subtopicsCompleted,
  totalSubtopics,
  onOpenReflection,
  onUpdateEvaluation,
  onRefresh,
}: DailySummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isComplete = completionPercentage >= 100;

  const getCompletionStatus = () => {
    if (isComplete) return { label: '✅ Selesai', variant: 'success' as const };
    if (completionPercentage > 0) return { label: '🔄 Sedang Berjalan', variant: 'primary' as const };
    return { label: '⏳ Belum Dimulai', variant: 'secondary' as const };
  };

  const status = getCompletionStatus();

  return (
    <Card variant="default" padding="lg">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              📊 Ringkasan Hari {dayId}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatDayLabel(dayId)}
            </p>
          </div>
          <Badge variant={status.variant} size="lg">
            {status.label}
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(completionPercentage)}%
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
          </div>
          <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {totalHoursStudied.toFixed(1)}h
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
          label="Progress Harian"
        />

        {isExpanded && dayData && (
          <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">📋 Materi Hari Ini</h4>
              <div className="mt-2 space-y-2">
                {dayData.schedule?.sessions?.filter(s => !s.isBreak).map((session) => (
                  <div key={session.session} className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sesi {session.session}: {session.topic}
                      </span>
                      <Badge variant="secondary" size="xs">
                        {session.subtopics.length} subtopik
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {dayData.quiz && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">🧪 Quiz</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {dayData.quiz.questions?.length || 0} soal • {dayData.quiz.passingScore}% lulus
                </p>
              </div>
            )}

            {dayData.assignment && (
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">📋 Tugas</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {dayData.assignment.title}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {isExpanded ? 'Sembunyikan detail' : 'Lihat detail'}
          </button>
          {!isComplete && dayProgress && (
            <Button variant="outline" size="sm" onClick={onOpenReflection}>
              📝 Buat Refleksi
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onRefresh}>
            🔄 Refresh
          </Button>
        </div>

        {isComplete && (
          <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-xl border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎉</span>
              <div>
                <h4 className="font-semibold text-green-800 dark:text-green-300">
                  Hari {dayId} Selesai!
                </h4>
                <p className="text-sm text-green-600 dark:text-green-400">
                  Kamu berhasil menyelesaikan semua materi hari ini. Lanjutkan ke hari berikutnya!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
