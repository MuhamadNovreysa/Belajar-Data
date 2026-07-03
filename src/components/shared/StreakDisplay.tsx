'use client';

import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface StreakDisplayProps {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  activeDays: number;
  consistencyScore: number;
  nextMilestone: {
    days: number;
    badge: string;
    description: string;
  } | null;
  className?: string;
}

export function StreakDisplay({
  currentStreak,
  longestStreak,
  totalDays,
  activeDays,
  consistencyScore,
  nextMilestone,
  className,
}: StreakDisplayProps) {
  const getStreakEmoji = (days: number) => {
    if (days >= 180) return '👑';
    if (days >= 90) return '🌟';
    if (days >= 30) return '🔥';
    if (days >= 7) return '💪';
    if (days >= 3) return '📈';
    return '🌱';
  };

  const getStreakColor = (days: number) => {
    if (days >= 180) return 'from-yellow-400 to-orange-500';
    if (days >= 90) return 'from-purple-400 to-pink-500';
    if (days >= 30) return 'from-orange-400 to-red-500';
    if (days >= 7) return 'from-blue-400 to-purple-500';
    if (days >= 3) return 'from-green-400 to-blue-500';
    return 'from-gray-400 to-gray-500';
  };

  const getConsistencyColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const streakEmoji = getStreakEmoji(currentStreak);
  const streakColor = getStreakColor(currentStreak);

  const weekDays = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  const today = new Date().getDay();
  const weekStart = (today + 6) % 7;

  return (
    <Card variant="elevated" padding="lg" className={cn('', className)}>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Streak Counter */}
        <div className="flex-shrink-0 text-center">
          <div
            className={cn(
              'w-24 h-24 rounded-full flex items-center justify-center text-4xl mx-auto shadow-lg',
              'bg-gradient-to-br',
              streakColor
            )}
          >
            {streakEmoji}
          </div>
          <div className="mt-2">
            <div className="text-3xl font-bold text-gray-900">{currentStreak}</div>
            <div className="text-sm text-gray-500">hari berturut-turut</div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex-1 min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900">{longestStreak}</div>
              <div className="text-xs text-gray-500">Terpanjang</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900">{activeDays}/{totalDays}</div>
              <div className="text-xs text-gray-500">Hari Aktif</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className={cn(
                'text-lg font-bold',
                getConsistencyColor(consistencyScore)
              )}>
                {consistencyScore}%
              </div>
              <div className="text-xs text-gray-500">Konsistensi</div>
            </div>
            {nextMilestone && (
              <div className="p-3 bg-gray-50 rounded-lg text-center">
                <div className="text-lg font-bold text-gray-900">
                  {nextMilestone.days - currentStreak} hari
                </div>
                <div className="text-xs text-gray-500">Menuju {nextMilestone.badge}</div>
              </div>
            )}
          </div>

          {/* Week Grid */}
          <div className="mt-3 flex justify-between">
            {weekDays.map((day, index) => {
              const dayIndex = (weekStart + index) % 7;
              const isToday = dayIndex === today;
              const isActive = index < currentStreak && isToday;

              return (
                <div
                  key={day}
                  className={cn(
                    'flex flex-col items-center',
                    isToday && 'font-bold'
                  )}
                >
                  <div className="text-xs text-gray-400">{day}</div>
                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs mt-1',
                      isActive
                        ? 'bg-green-500 text-white'
                        : isToday
                        ? 'border-2 border-blue-500 text-gray-700'
                        : 'bg-gray-100 text-gray-400'
                    )}
                  >
                    {isActive ? '✓' : dayIndex + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default StreakDisplay;
