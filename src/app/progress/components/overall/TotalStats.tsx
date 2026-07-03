'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressData } from '@/lib/types';

interface TotalStatsProps {
  progress: ProgressData | null;
}

export function TotalStats({ progress }: TotalStatsProps) {
  const stats = useMemo(() => {
    if (!progress) {
      return {
        totalDays: 0,
        completedDays: 0,
        totalHours: 0,
        totalSubtopics: 0,
        completedSubtopics: 0,
        totalQuizzes: 0,
        quizzesTaken: 0,
        quizzesPassed: 0,
        totalPractices: 0,
        practicesCompleted: 0,
        totalAssignments: 0,
        assignmentsSubmitted: 0,
        assignmentsAccepted: 0,
        totalProjects: 0,
        projectsCompleted: 0,
        projectsApproved: 0,
        totalPoints: 0,
        currentLevel: 1,
        rank: 'Data Explorer',
      };
    }

    const dailyEntries = Object.values(progress.daily);
    const totalDays = dailyEntries.length;
    const completedDays = dailyEntries.filter(d => d.status === 'completed').length;
    const totalHours = dailyEntries.reduce((sum, d) => sum + d.totalMinutesStudied / 60, 0);
    const totalSubtopics = dailyEntries.reduce((sum, d) => sum + d.subtopics.length, 0);
    const completedSubtopics = dailyEntries.reduce(
      (sum, d) => sum + d.subtopics.filter(s => s.status === 'mastered' || s.status === 'understood').length,
      0
    );
    const totalQuizzes = dailyEntries.filter(d => d.quiz.quizId).length;
    const quizzesTaken = dailyEntries.filter(d => d.quiz.status !== 'not_started').length;
    const quizzesPassed = dailyEntries.filter(d => d.quiz.status === 'passed').length;
    const totalPractices = dailyEntries.reduce((sum, d) => sum + d.practice.length, 0);
    const practicesCompleted = dailyEntries.reduce(
      (sum, d) => sum + d.practice.filter(p => p.status === 'completed').length,
      0
    );
    const assignmentsSubmitted = dailyEntries.filter(d => d.assignment.status !== 'not_started').length;
    const assignmentsAccepted = dailyEntries.filter(d => d.assignment.status === 'accepted').length;

    const totalPoints = Math.floor(completedDays * 10 + completedSubtopics * 5 + quizzesPassed * 20);
    const currentLevel = Math.floor(totalPoints / 100) + 1;

    const getRank = (days: number) => {
      if (days >= 180) return 'Data Analyst Master';
      if (days >= 150) return 'Senior Data Analyst';
      if (days >= 120) return 'Data Analyst Pro';
      if (days >= 90) return 'Data Analyst';
      if (days >= 60) return 'Junior Data Analyst';
      if (days >= 30) return 'Data Analyst Intern';
      if (days >= 14) return 'Data Learner';
      if (days >= 7) return 'Data Beginner';
      return 'Data Explorer';
    };

    return {
      totalDays,
      completedDays,
      totalHours,
      totalSubtopics,
      completedSubtopics,
      totalQuizzes,
      quizzesTaken,
      quizzesPassed,
      totalPractices,
      practicesCompleted,
      totalAssignments: totalDays,
      assignmentsSubmitted,
      assignmentsAccepted,
      totalProjects: 0,
      projectsCompleted: 0,
      projectsApproved: 0,
      totalPoints,
      currentLevel,
      rank: getRank(completedDays),
    };
  }, [progress]);

  const statItems = [
    { label: 'Total Hari', value: stats.totalDays, icon: '📅' },
    { label: 'Hari Selesai', value: stats.completedDays, icon: '✅' },
    { label: 'Total Jam', value: stats.totalHours.toFixed(1) + 'h', icon: '⏰' },
    { label: 'Subtopik', value: `${stats.completedSubtopics}/${stats.totalSubtopics}`, icon: '📚' },
    { label: 'Quiz', value: `${stats.quizzesPassed}/${stats.quizzesTaken}`, icon: '🧪' },
    { label: 'Praktik', value: `${stats.practicesCompleted}/${stats.totalPractices}`, icon: '💻' },
    { label: 'Tugas', value: `${stats.assignmentsAccepted}/${stats.assignmentsSubmitted}`, icon: '📋' },
    { label: 'Project', value: `${stats.projectsCompleted}/${stats.totalProjects}`, icon: '📊' },
  ];

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          🏅 Total Statistik
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="lg">
            ⭐ Level {stats.currentLevel}
          </Badge>
          <Badge variant="secondary" size="lg">
            {stats.rank}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statItems.map((item) => (
          <div key={item.label} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
            <div className="text-2xl mb-1">{item.icon}</div>
            <div className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="text-center">
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {stats.totalPoints}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Poin</div>
          <div className="mt-2 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <span>📅 {stats.completedDays} hari</span>
            <span>📚 {stats.completedSubtopics} subtopik</span>
            <span>🧪 {stats.quizzesPassed} quiz</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
