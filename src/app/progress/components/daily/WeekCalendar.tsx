'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressData } from '@/lib/types';
import { getDayId, getCurrentDayId } from '@/lib/utils/helpers';

interface WeekCalendarProps {
  dayId: number;
  progress: ProgressData | null;
}

export function WeekCalendar({ dayId, progress }: WeekCalendarProps) {
  const currentDayId = getCurrentDayId();

  // Get week days
  const getWeekDays = (dayId: number) => {
    const month = Math.ceil(dayId / 30);
    const dayInMonth = dayId - (month - 1) * 30;
    const week = Math.ceil(dayInMonth / 7);
    const startDay = (week - 1) * 7 + 1 + (month - 1) * 30;
    const endDay = Math.min(startDay + 6, month * 30);

    const days = [];
    for (let d = startDay; d <= endDay; d++) {
      days.push(d);
    }
    return days;
  };

  const weekDays = getWeekDays(dayId);

  const getDayStatus = (day: number) => {
    const dayProgress = progress?.daily[day];
    if (!dayProgress) return 'not_started';
    return dayProgress.status;
  };

  const getDayCompletion = (day: number) => {
    const dayProgress = progress?.daily[day];
    if (!dayProgress) return 0;
    return dayProgress.completionPercentage || 0;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white';
      case 'in_progress': return 'bg-blue-500 text-white';
      case 'reviewing': return 'bg-purple-500 text-white';
      case 'skipped': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in_progress': return '🔄';
      case 'reviewing': return '👀';
      case 'skipped': return '⏭️';
      default: return '⏳';
    }
  };

  const getDayLabel = (day: number) => {
    const date = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - (currentDayId - 1));
    const targetDate = new Date(startDate);
    targetDate.setDate(targetDate.getDate() + (day - 1));
    return targetDate.getDate();
  };

  const isToday = (day: number) => day === currentDayId;

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          📅 Kalender Mingguan
        </h3>
        <Badge variant="secondary" size="sm">
          Minggu {Math.ceil((dayId - ((Math.ceil(dayId / 30) - 1) * 30)) / 7)}
        </Badge>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sen', 'Sel', 'Rab', 'Kam', 'J
