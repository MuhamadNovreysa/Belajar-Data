'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProgressData } from '@/lib/types';
import { getDayId } from '@/lib/utils/helpers';

interface MonthlyOverviewProps {
  month: number;
  progress: ProgressData | null;
}

export function MonthlyOverview({ month, progress }: MonthlyOverviewProps) {
  const monthData = useMemo(() => {
    const startDay = (month - 1) * 30 + 1;
    const endDay = month * 30;

    let totalMinutes = 0;
    let completedDays = 0;
    let inProgressDays = 0;
    let totalSubtopics = 0;
    let completedSubtopics = 0;
    let totalQuizzes = 0;
    let quizzesTaken = 0;
    let quizzesPassed = 0;

    for (let d = startDay; d <= endDay; d++) {
      const dayProgress = progress?.daily[d];
      if (dayProgress) {
        const isCompleted = dayProgress.status === 'completed';
        const isInProgress = dayProgress.status === 'in_progress';

        if (isCompleted) completedDays++;
        if (isInProgress) inProgressDays++;

        totalMinutes += dayProgress.totalMinutesStudied || 0;
        totalSubtopics += dayProgress.subtopics?.length || 0;
        completedSubtopics += dayProgress.subtopics?.filter((s: any) => s.status === 'mastered' || s.status === 'understood').length || 0;
        
        if (dayProgress.quiz?.quizId) {
          totalQuizzes++;
          if (dayProgress.quiz.status !== 'not_started') quizzesTaken++;
          if (dayProgress.quiz.status === 'passed') quizzesPassed++;
        }
      }
    }

    const totalDays = 30;
    const completionPercentage = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
    const totalHours = totalMinutes / 60;
    const averageDailyHours = totalDays > 0 ? totalHours / totalDays : 0;
    const subtopicsCompletion = totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0;

    return {
      completedDays,
      inProgressDays,
      totalDays,
      completionPercentage,
      totalHours,
      averageDailyHours,
      totalSubtopics,
      completedSubtopics,
      subtopicsCompletion,
      totalQuizzes,
      quizzesTaken,
      quizzesPassed,
      quizPassRate: quizzesTaken > 0 ? (quizzesPassed / quizzesTaken) * 100 : 0,
    };
  }, [month, progress]);

  const getMonthStatus = () => {
    if (monthData.completionPercentage === 100) return { label: '✅ Selesai', variant: 'success' as const };
    if (monthData.completionPercentage > 0) return { label: '🔄 Sedang Berjalan', variant: 'primary' as const };
    return { label: '⏳ Belum Dimulai', variant: 'secondary' as const };
  };

  const status = getMonthStatus();

  return (
    <Card variant="elevated" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            📊 Bulan {month} - Overview
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {monthData.completedDays}/{monthData.totalDays} hari selesai
          </p>
        </div>
        <Badge variant={status.variant} size="lg">
          {status.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(monthData.completionPercentage)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {monthData.totalHours.toFixed(1)}h
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Jam</div>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {Math.round(monthData.subtopicsCompletion)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Subtopik</div>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {Math.round(monthData.quizPassRate)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Quiz</div>
        </div>
      </div>

      <ProgressBar
        value={monthData.completionPercentage}
        max={100}
        size="lg"
        color={monthData.completionPercentage === 100 ? 'green' : 'blue'}
        showPercentage
        label="Progress Bulan"
      />

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
        <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
          <span className="text-gray-500 dark:text-gray-400">Rata-rata Harian</span>
          <div className="font-semibold text-gray-900 dark:text-white">
            {monthData.averageDailyHours.toFixed(1)} jam
          </div>
        </div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
          <span className="text-gray-500 dark:text-gray-400">Quiz</span>
          <div className="font-semibold text-gray-900 dark:text-white">
            {monthData.quizzesPassed}/{monthData.quizzesTaken}
          </div>
        </div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
          <span className="text-gray-500 dark:text-gray-400">Hari Berjalan</span>
          <div className="font-semibold text-gray-900 dark:text-white">
            {monthData.inProgressDays}
          </div>
        </div>
      </div>
    </Card>
  );
}
