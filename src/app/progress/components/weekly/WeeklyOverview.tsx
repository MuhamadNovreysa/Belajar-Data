'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProgressData } from '@/lib/types';
import { getDayId, getMonthFromDayId } from '@/lib/utils/helpers';

interface WeeklyOverviewProps {
  week: number;
  progress: ProgressData | null;
}

export function WeeklyOverview({ week, progress }: WeeklyOverviewProps) {
  const weekData = useMemo(() => {
    const month = Math.ceil(week / 4);
    const weekInMonth = ((week - 1) % 4) + 1;
    const startDay = (weekInMonth - 1) * 7 + 1 + (month - 1) * 30;
    const endDay = Math.min(startDay + 6, month * 30);

    const days = [];
    let totalMinutes = 0;
    let completedDays = 0;
    let totalSubtopics = 0;
    let completedSubtopics = 0;

    for (let d = startDay; d <= endDay; d++) {
      const dayProgress = progress?.daily[d];
      const isCompleted = dayProgress?.status === 'completed';
      const dayMinutes = dayProgress?.totalMinutesStudied || 0;

      days.push({
        day: d,
        status: dayProgress?.status || 'not_started',
        completion: dayProgress?.completionPercentage || 0,
        minutes: dayMinutes,
        subtopicsTotal: dayProgress?.subtopics?.length || 0,
        subtopicsCompleted: dayProgress?.subtopics?.filter((s: any) => s.status === 'mastered' || s.status === 'understood').length || 0,
      });

      totalMinutes += dayMinutes;
      if (isCompleted) completedDays++;
      totalSubtopics += dayProgress?.subtopics?.length || 0;
      completedSubtopics += dayProgress?.subtopics?.filter((s: any) => s.status === 'mastered' || s.status === 'understood').length || 0;
    }

    const totalDays = days.length;
    const completionPercentage = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;
    const totalHours = totalMinutes / 60;

    return {
      days,
      completedDays,
      totalDays,
      completionPercentage,
      totalHours,
      totalSubtopics,
      completedSubtopics,
      subtopicsCompletion: totalSubtopics > 0 ? (completedSubtopics / totalSubtopics) * 100 : 0,
      averageDailyHours: totalDays > 0 ? totalHours / totalDays : 0,
    };
  }, [week, progress]);

  const getWeekStatus = () => {
    if (weekData.completionPercentage === 100) return { label: '✅ Selesai', variant: 'success' as const };
    if (weekData.completionPercentage > 0) return { label: '🔄 Sedang Berjalan', variant: 'primary' as const };
    return { label: '⏳ Belum Dimulai', variant: 'secondary' as const };
  };

  const status = getWeekStatus();

  return (
    <Card variant="elevated" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            📆 Minggu {week} - Overview
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bulan {getMonthFromDayId((week - 1) * 7 + 1)}
          </p>
        </div>
        <Badge variant={status.variant} size="lg">
          {status.label}
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {Math.round(weekData.completionPercentage)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Progress</div>
        </div>
        <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {weekData.totalHours.toFixed(1)}h
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Total Jam</div>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {weekData.completedDays}/{weekData.totalDays}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Hari</div>
        </div>
        <div className="p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {Math.round(weekData.subtopicsCompletion)}%
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Subtopik</div>
        </div>
      </div>

      <ProgressBar
        value={weekData.completionPercentage}
        max={100}
        size="lg"
        color={weekData.completionPercentage === 100 ? 'green' : 'blue'}
        showPercentage
        label="Progress Minggu"
      />

      <div className="mt-4 grid grid-cols-7 gap-2">
           {weekData.days.map((day: any) => (
          <div
            key={day.day}
            className="text-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900/50"
          >
            <div className="text-xs text-gray-500 dark:text-gray-400">H-{day.day}</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(day.completion)}%
            </div>
            <div className="text-xs text-gray-400">
              {day.minutes > 0 ? `${Math.round(day.minutes / 60)}h` : '-'}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
