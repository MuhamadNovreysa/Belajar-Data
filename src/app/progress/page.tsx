'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProgressContext } from '@/app/providers/ProgressProvider';
import { useAnalytics } from '@/lib/hooks/useAnalytics';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Tabs } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { TodayProgress } from './components/daily/TodayProgress';
import { HourlyTracker } from './components/daily/HourlyTracker';
import { DailyStreak } from './components/daily/DailyStreak';
import { WeekCalendar } from './components/daily/WeekCalendar';
import { WeeklyOverview } from './components/weekly/WeeklyOverview';
import { WeeklyChart } from './components/weekly/WeeklyChart';
import { WeeklyGoals } from './components/weekly/WeeklyGoals';
import { MonthlyOverview } from './components/monthly/MonthlyOverview';
import { MonthlyChart } from './components/monthly/MonthlyChart';
import { MonthlyStats } from './components/monthly/MonthlyStats';
import { OverallProgress } from './components/overall/OverallProgress';
import { SkillRadar } from './components/overall/SkillRadar';
import { TotalStats } from './components/overall/TotalStats';
import { ProgressSummary } from '@/components/shared/ProgressSummary';
import { StreakDisplay } from '@/components/shared/StreakDisplay';
import { LevelDisplay } from '@/components/shared/LevelDisplay';
import { StatsCard } from '@/components/shared/StatsCard';
import { getCurrentDayId, getMonthFromDayId, getWeekFromDayId } from '@/lib/utils/helpers';
import { TOTAL_DAYS, TOTAL_MONTHS } from '@/lib/utils/constants';

export default function ProgressPage() {
  const { progress, dailyProgress, streak, isLoading, error, refresh } = useProgressContext();
  const { analytics, getInsights, getRecommendations } = useAnalytics({ autoRecalculate: true });
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedMonth, setSelectedMonth] = useState(getMonthFromDayId(getCurrentDayId()));
  const [selectedWeek, setSelectedWeek] = useState(getWeekFromDayId(getCurrentDayId()));

  const stats = useMemo(() => {
    if (!progress) return null;

    const dailyEntries = Object.values(progress.daily);
    const totalDays = dailyEntries.length;
    const completedDays = dailyEntries.filter((d: any) => d.status === 'completed').length;
    const inProgressDays = dailyEntries.filter((d: any) => d.status === 'in_progress').length;
    const totalHours = dailyEntries.reduce((sum: number, d: any) => sum + d.totalMinutesStudied / 60, 0);
    const totalSubtopics = dailyEntries.reduce((sum: number, d: any) => sum + d.subtopics.length, 0);
    const subtopicsCompleted = dailyEntries.reduce(
      (sum: number, d: any) => sum + d.subtopics.filter((s: any) => s.status === 'mastered' || s.status === 'understood').length,
      0
    );
    const totalQuizzes = dailyEntries.filter((d: any) => d.quiz.quizId).length;
    const quizzesTaken = dailyEntries.filter((d: any) => d.quiz.status !== 'not_started').length;
    const quizzesPassed = dailyEntries.filter((d: any) => d.quiz.status === 'passed').length;

    return {
      totalDays,
      completedDays,
      inProgressDays,
      totalHours,
      totalSubtopics,
      subtopicsCompleted,
      totalQuizzes,
      quizzesTaken,
      quizzesPassed,
      completionPercentage: totalDays > 0 ? (completedDays / totalDays) * 100 : 0,
      averageDailyHours: totalDays > 0 ? totalHours / totalDays : 0,
    };
  }, [progress]);

  const insights = getInsights();
  const recommendations = getRecommendations();

  const nextMilestone = streak?.milestones?.find((m: any) => !m.isUnlocked);
  const nextMilestoneData = nextMilestone ? {
    days: nextMilestone.day,
    badge: nextMilestone.badge,
    description: nextMilestone.description,
  } : null;

  const tabs = [
    {
      id: 'overview',
      label: '📊 Overview',
      content: (
        <div className="space-y-6">
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatsCard
                label="Hari Selesai"
                value={`${stats.completedDays}/${stats.totalDays}`}
                icon={<span className="text-2xl">📅</span>}
                color="blue"
              />
              <StatsCard
                label="Total Jam Belajar"
                value={stats.totalHours.toFixed(1)}
                icon={<span className="text-2xl">⏰</span>}
                color="green"
              />
              <StatsCard
                label="Subtopik"
                value={`${stats.subtopicsCompleted}/${stats.totalSubtopics}`}
                icon={<span className="text-2xl">📚</span>}
                color="purple"
              />
              <StatsCard
                label="Quiz"
                value={`${stats.quizzesPassed}/${stats.quizzesTaken}`}
                icon={<span className="text-2xl">🧪</span>}
                color="yellow"
              />
            </div>
          )}

          {streak && (
            <StreakDisplay
              currentStreak={streak.currentStreak}
              longestStreak={streak.longestStreak}
              totalDays={stats?.totalDays || 0}
              activeDays={stats?.completedDays || 0}
              consistencyScore={streak.consistencyScore || 0}
              nextMilestone={nextMilestoneData}
            />
          )}

          {progress?.statistics && (
            <LevelDisplay
              level={progress.statistics.currentLevel || 1}
              xp={Math.floor(progress.statistics.totalPoints || 0)}
              nextLevelXp={progress.statistics.nextLevelPoints || 100}
              totalXp={Math.floor(progress.statistics.totalPoints || 0)}
              rank={progress.statistics.rank || 'Data Explorer'}
              title={progress.statistics.rank || 'Data Explorer'}
            />
          )}

          {dailyProgress && (
            <TodayProgress
              dayId={getCurrentDayId()}
              dayProgress={dailyProgress}
              completionPercentage={stats?.completionPercentage || 0}
              totalHoursStudied={dailyProgress?.totalMinutesStudied || 0}
              sessionsCompleted={dailyProgress?.sessions?.filter((s: any) => s.status === 'completed').length || 0}
              totalSessions={8}
              subtopicsCompleted={dailyProgress?.subtopics?.filter((s: any) => s.status === 'mastered' || s.status === 'understood').length || 0}
              totalSubtopics={dailyProgress?.subtopics?.length || 0}
            />
          )}

          {insights.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">💡 Insights</h3>
              {insights.slice(0, 3).map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">
                      {insight.type === 'positive' ? '🌟' :
                       insight.type === 'warning' ? '⚠️' :
                       insight.type === 'negative' ? '❌' : 'ℹ️'}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{insight.description}</p>
                      {insight.recommendation && (
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">💡 {insight.recommendation}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {recommendations.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">📋 Rekomendasi</h3>
              {recommendations.slice(0, 3).map((rec, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">
                      {rec.type === 'topic' ? '📚' :
                       rec.type === 'resource' ? '📖' :
                       rec.type === 'practice' ? '💻' :
                       rec.type === 'review' ? '🔄' : '📊'}
                    </span>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{rec.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{rec.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="secondary" size="xs">{rec.urgency}</Badge>
                        {rec.tags?.map((tag) => (
                          <Badge key={tag} variant="secondary" size="xs">#{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'daily',
      label: '📅 Harian',
      content: (
        <div className="space-y-6">
          {dailyProgress && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <HourlyTracker
                  dayId={getCurrentDayId()}
                  dayProgress={dailyProgress}
                />
                <WeekCalendar
                  dayId={getCurrentDayId()}
                  progress={progress}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DailyStreak streak={streak} />
                {stats && (
                  <ProgressSummary
                    totalDays={stats.totalDays}
                    completedDays={stats.completedDays}
                    totalHours={stats.totalHours}
                    completedHours={stats.totalHours}
                    totalTopics={stats.totalSubtopics}
                    completedTopics={stats.subtopicsCompleted}
                    totalQuizzes={stats.totalQuizzes}
                    completedQuizzes={stats.quizzesTaken}
                    totalAssignments={stats.totalDays}
                    completedAssignments={0}
                    streakDays={streak?.currentStreak || 0}
                  />
                )}
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      id: 'weekly',
      label: '📆 Mingguan',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pilih Minggu:</label>
            <select
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
            >
              {Array.from({ length: 24 }, (_, i) => i + 1).map((w) => (
                <option key={w} value={w}>Minggu {w}</option>
              ))}
            </select>
          </div>
          <WeeklyOverview week={selectedWeek} progress={progress} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeeklyChart week={selectedWeek} progress={progress} />
            <WeeklyGoals week={selectedWeek} progress={progress} />
          </div>
        </div>
      ),
    },
    {
      id: 'monthly',
      label: '📊 Bulanan',
      content: (
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pilih Bulan:</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
            >
              {Array.from({ length: TOTAL_MONTHS }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>Bulan {m}</option>
              ))}
            </select>
          </div>
          <MonthlyOverview month={selectedMonth} progress={progress} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MonthlyChart month={selectedMonth} progress={progress} />
            <MonthlyStats month={selectedMonth} progress={progress} />
          </div>
        </div>
      ),
    },
    {
      id: 'overall',
      label: '🏆 Keseluruhan',
      content: (
        <div className="space-y-6">
          <OverallProgress progress={progress} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillRadar progress={progress} />
            <TotalStats progress={progress} />
          </div>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return <ProgressLoading />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="container-custom">
          <Alert variant="error" title="Gagal Memuat Progress">
            {error.message || 'Terjadi kesalahan saat memuat data progress'}
            <Button variant="primary" size="sm" onClick={refresh} className="mt-2">
              🔄 Coba Lagi
            </Button>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              📊 Dashboard Progress
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Pantau perkembangan belajarmu dari hari ke hari
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="lg">
              🔥 {streak?.currentStreak || 0} hari streak!
            </Badge>
            <Button variant="outline" size="sm" onClick={refresh}>
              🔄 Refresh
            </Button>
          </div>
        </div>

        <Tabs
          tabs={tabs}
          defaultTab="overview"
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="box"
          size="md"
        />
      </div>
    </div>
  );
}

function ProgressLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Skeleton variant="text" width="300px" height="32px" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-1" />
          </div>
          <Skeleton variant="rect" width="120px" height="36px" className="rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="100px" className="rounded-xl" />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton variant="card" height="300px" className="rounded-xl" />
          <Skeleton variant="card" height="300px" className="rounded-xl" />
        </div>
      </div>
    </div>
  );
}
