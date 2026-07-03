import { useState, useEffect, useCallback, useMemo } from 'react';
import { useProgress } from './useProgress';
import { AnalyticsTimeframe, InsightType, InsightSeverity, TrendDirection } from '@/lib/types/analytics.types';
import { TOTAL_DAYS, TOTAL_MONTHS } from '@/lib/utils/constants';
import { calculateAverage, calculateMedian, calculateTrend, calculateStandardDeviation } from '@/lib/utils/helpers';

export interface UseAnalyticsOptions {
  /** User ID untuk multi-user (optional) */
  userId?: string;
  /** Auto-recalculate */
  autoRecalculate?: boolean;
  /** Callback ketika analytics berubah */
  onAnalyticsChange?: (analytics: AnalyticsData) => void;
}

export interface AnalyticsData {
  /** Study time analytics */
  studyTime: {
    totalHours: number;
    averageDailyHours: number;
    averageWeeklyHours: number;
    averageMonthlyHours: number;
    maxDailyHours: number;
    minDailyHours: number;
    medianDailyHours: number;
    standardDeviation: number;
    consistencyScore: number;
    trend: TrendDirection;
    hourlyDistribution: { hour: number; minutes: number; percentage: number }[];
    dailyDistribution: { day: string; hours: number; percentage: number }[];
    weeklyDistribution: { week: number; hours: number; percentage: number; trend: TrendDirection }[];
    monthlyDistribution: { month: number; hours: number; percentage: number; trend: TrendDirection }[];
  };
  /** Completion analytics */
  completion: {
    overallCompletionPercentage: number;
    dailyCompletionRate: { date: string; completionPercentage: number; trend: TrendDirection }[];
    weeklyCompletionRate: { week: number; completionPercentage: number; trend: TrendDirection }[];
    monthlyCompletionRate: { month: number; completionPercentage: number; trend: TrendDirection }[];
    projectedCompletionDate: string;
    paceStatus: 'ahead' | 'on_track' | 'behind' | 'critical';
  };
  /** Quiz analytics */
  quiz: {
    totalQuizzes: number;
    quizzesTaken: number;
    quizzesPassed: number;
    passRate: number;
    averageScore: number;
    highestScore: number;
    lowestScore: number;
    scoresOverTime: { date: string; score: number; passingScore: number; status: 'passed' | 'failed' }[];
    weakTopics: { topic: string; averageScore: number; questionCount: number; urgency: 'low' | 'medium' | 'high' | 'critical' }[];
    strongTopics: { topic: string; averageScore: number; questionCount: number }[];
  };
  /** Skills analytics */
  skills: {
    skills: { name: string; level: number; category: string; status: string }[];
    overallMasteryLevel: number;
    topSkills: { skill: string; level: number; category: string }[];
    weakestSkills: { skill: string; level: number; category: string; recommendedActions: string[] }[];
    skillGaps: { gap: string; severity: 'low' | 'medium' | 'high' | 'critical'; impact: string; recommendedResources: string[] }[];
  };
  /** Productivity analytics */
  productivity: {
    overallProductivityScore: number;
    focusScore: number;
    consistencyScore: number;
    efficiencyScore: number;
    peakProductivityTimes: { time: string; productivity: number; activities: string[]; frequency: number }[];
    distractions: { source: string; frequency: number; impactScore: number; productivityLoss: number; solution: string }[];
    recommendations: { action: string; expectedImprovement: number; priority: 'low' | 'medium' | 'high' | 'critical'; implementationTime: string }[];
  };
  /** Insights */
  insights: {
    id: string;
    type: InsightType;
    severity: InsightSeverity;
    category: string;
    title: string;
    description: string;
    metric: string;
    value: number;
    benchmark: number;
    difference: number;
    percentageDifference: number;
    recommendation: string;
    actionItems: { action: string; priority: 'low' | 'medium' | 'high' | 'critical'; expectedImpact: string; estimatedEffort: string }[];
  }[];
  /** Recommendations */
  recommendations: {
    type: 'topic' | 'resource' | 'practice' | 'review' | 'project';
    title: string;
    description: string;
    urgency: 'low' | 'medium' | 'high' | 'critical';
    reason: string;
    action: { label: string; onClick: () => void; href?: string };
    tags: string[];
  }[];
  /** Predictive analytics */
  predictions: {
    estimatedCompletionDate: string;
    remainingHours: number;
    dailyAverageNeeded: number;
    weeklyAverageNeeded: number;
    confidenceLevel: number;
    scenarios: {
      scenario: 'optimistic' | 'realistic' | 'pessimistic';
      completionDate: string;
      dailyHoursNeeded: number;
    }[];
  };
}

export interface UseAnalyticsReturn {
  /** Analytics data */
  analytics: AnalyticsData | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;

  /** Recalculate analytics */
  recalculate: () => void;

  /** Get study time analytics */
  getStudyTimeAnalytics: (timeframe: AnalyticsTimeframe) => AnalyticsData['studyTime'];
  /** Get completion analytics */
  getCompletionAnalytics: (timeframe: AnalyticsTimeframe) => AnalyticsData['completion'];
  /** Get quiz analytics */
  getQuizAnalytics: (timeframe: AnalyticsTimeframe) => AnalyticsData['quiz'];
  /** Get skills analytics */
  getSkillAnalytics: () => AnalyticsData['skills'];
  /** Get productivity analytics */
  getProductivityAnalytics: (timeframe: AnalyticsTimeframe) => AnalyticsData['productivity'];

  /** Get insights */
  getInsights: () => AnalyticsData['insights'];
  /** Get recommendations */
  getRecommendations: () => AnalyticsData['recommendations'];
  /** Get predictions */
  getPredictions: () => AnalyticsData['predictions'];

  /** Refresh dari storage */
  refresh: () => void;
}

/**
 * Hook untuk analytics dan insights
 */
export function useAnalytics(options: UseAnalyticsOptions = {}): UseAnalyticsReturn {
  const { userId = 'default', autoRecalculate = true, onAnalyticsChange } = options;

  const {
    progress,
    getOverallStats,
    isLoading: progressLoading,
    error: progressError,
    refresh: progressRefresh,
  } = useProgress({ userId, autoSave: true });

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Calculate all analytics
   */
  const calculateAnalytics = useCallback((): AnalyticsData => {
    if (!progress) {
      return getDefaultAnalytics();
    }

    const stats = progress.statistics;
    const dailyEntries = Object.values(progress.daily);
    const completedDays = dailyEntries.filter((d) => d.status === 'completed');

    // --- Study Time Analytics ---
    const dailyHours = dailyEntries.map((d) => d.totalMinutesStudied / 60);
    const totalHours = dailyHours.reduce((sum, h) => sum + h, 0);
    const avgDailyHours = dailyHours.length > 0 ? calculateAverage(dailyHours) : 0;
    const maxDailyHours = dailyHours.length > 0 ? Math.max(...dailyHours) : 0;
    const minDailyHours = dailyHours.length > 0 ? Math.min(...dailyHours) : 0;
    const medianDailyHours = dailyHours.length > 0 ? calculateMedian(dailyHours) : 0;
    const stdDev = dailyHours.length > 0 ? calculateStandardDeviation(dailyHours) : 0;
    const consistencyScore = Math.min(100, (completedDays.length / (dailyEntries.length || 1)) * 100);
    const trend = calculateTrend(dailyHours.slice(-14));

    // Hourly distribution
    const hourlyDist: { hour: number; minutes: number; percentage: number }[] = [];
    for (let h = 8; h < 18; h++) {
      const minutes = dailyEntries.reduce((sum, d) => {
        const session = d.sessions.find((s) => {
          const hour = s.startTime ? parseInt(s.startTime.split(':')[0]) : 0;
          return hour === h;
        });
        return sum + (session?.durationMinutes || 0);
      }, 0);
      hourlyDist.push({
        hour: h,
        minutes,
        percentage: totalHours > 0 ? (minutes / (totalHours * 60)) * 100 : 0,
      });
    }

    // Daily distribution
    const dayNames = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
    const dailyDist = dayNames.map((day, idx) => {
      const hours = dailyEntries.reduce((sum, d) => {
        const date = new Date(d.date);
        if (date.getDay() === idx + 1) {
          return sum + d.totalMinutesStudied / 60;
        }
        return sum;
      }, 0);
      return {
        day,
        hours,
        percentage: totalHours > 0 ? (hours / totalHours) * 100 : 0,
      };
    });

    // Weekly distribution
    const weeklyDist = [];
    for (let w = 1; w <= 24; w++) {
      const weekEntries = dailyEntries.filter((d) => d.week === w);
      const hours = weekEntries.reduce((sum, d) => sum + d.totalMinutesStudied / 60, 0);
      const weekTrend = weekEntries.length > 0 ? calculateTrend(weekEntries.map((d) => d.totalMinutesStudied / 60)) : 'stable';
      weeklyDist.push({
        week: w,
        hours,
        percentage: totalHours > 0 ? (hours / totalHours) * 100 : 0,
        trend: weekTrend,
      });
    }

    // Monthly distribution
    const monthlyDist = [];
    for (let m = 1; m <= TOTAL_MONTHS; m++) {
      const monthEntries = dailyEntries.filter((d) => d.month === m);
      const hours = monthEntries.reduce((sum, d) => sum + d.totalMinutesStudied / 60, 0);
      const monthTrend = monthEntries.length > 0 ? calculateTrend(monthEntries.map((d) => d.totalMinutesStudied / 60)) : 'stable';
      monthlyDist.push({
        month: m,
        hours,
        percentage: totalHours > 0 ? (hours / totalHours) * 100 : 0,
        trend: monthTrend,
      });
    }

    // --- Completion Analytics ---
    const overallCompletion = (completedDays.length / (dailyEntries.length || 1)) * 100;

    const dailyCompletionRate = dailyEntries.map((d) => ({
      date: d.date,
      completionPercentage: d.completionPercentage,
      trend: 'stable' as TrendDirection,
    }));

    const weeklyCompletionRate = weeklyDist.map((w) => ({
      week: w.week,
      completionPercentage: (dailyEntries.filter((d) => d.week === w.week && d.status === 'completed').length / 7) * 100,
      trend: w.trend,
    }));

    const monthlyCompletionRate = monthlyDist.map((m) => ({
      month: m.month,
      completionPercentage: (dailyEntries.filter((d) => d.month === m.month && d.status === 'completed').length / 30) * 100,
      trend: m.trend,
    }));

    // Projected completion date
    const daysPerMonth = completedDays.length / (dailyEntries.length / 12 || 1);
    const remainingDays = TOTAL_DAYS - completedDays.length;
    const projectedDays = remainingDays / (daysPerMonth / 30 || 1);
    const projectedDate = new Date();
    projectedDate.setDate(projectedDate.getDate() + projectedDays);

    const paceStatus = overallCompletion >= 90 ? 'ahead' :
                       overallCompletion >= 70 ? 'on_track' :
                       overallCompletion >= 50 ? 'behind' : 'critical';

    // --- Quiz Analytics ---
    const quizzes = dailyEntries.filter((d) => d.quiz.quizId);
    const quizzesTaken = quizzes.filter((d) => d.quiz.status !== 'not_started');
    const quizzesPassed = quizzes.filter((d) => d.quiz.status === 'passed');
    const quizScores = quizzesTaken.map((d) => d.quiz.score || 0);
    const avgQuizScore = quizScores.length > 0 ? calculateAverage(quizScores) : 0;

    // Weak topics from quiz
    const weakTopics: { topic: string; averageScore: number; questionCount: number; urgency: 'low' | 'medium' | 'high' | 'critical' }[] = [];
    const strongTopics: { topic: string; averageScore: number; questionCount: number }[] = [];

    const topicScores: Record<string, { scores: number[]; count: number }> = {};
    dailyEntries.forEach((d) => {
      d.quiz.answers.forEach((a) => {
        const topic = a.questionId.split('_')[0] || 'general';
        if (!topicScores[topic]) {
          topicScores[topic] = { scores: [], count: 0 };
        }
        if (a.isCorrect) {
          topicScores[topic].scores.push(100);
        } else {
          topicScores[topic].scores.push(0);
        }
        topicScores[topic].count += 1;
      });
    });

    Object.entries(topicScores).forEach(([topic, data]) => {
      const avg = calculateAverage(data.scores);
      if (avg < 50) {
        weakTopics.push({
          topic,
          averageScore: avg,
          questionCount: data.count,
          urgency: avg < 30 ? 'critical' : avg < 40 ? 'high' : 'medium',
        });
      } else if (avg > 80) {
        strongTopics.push({
          topic,
          averageScore: avg,
          questionCount: data.count,
        });
      }
    });

    // --- Skills Analytics ---
    const skillLevels = stats.skillLevels || [];
    const overallMasteryLevel = skillLevels.length > 0
      ? calculateAverage(skillLevels.map((s) => s.percentage))
      : 0;

    const topSkills = [...skillLevels]
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3)
      .map((s) => ({
        skill: s.skillName,
        level: s.level,
        category: s.category,
      }));

    const weakestSkills = [...skillLevels]
      .sort((a, b) => a.percentage - b.percentage)
      .slice(0, 3)
      .map((s) => ({
        skill: s.skillName,
        level: s.level,
        category: s.category,
        recommendedActions: [
          'Latih lebih banyak soal',
          'Cari resource tambahan',
          'Tonton video tutorial',
        ],
      }));

    const skillGaps = weakestSkills.slice(0, 2).map((s) => ({
      gap: `Kemampuan ${s.skill} masih rendah`,
      severity: 'medium' as const,
      impact: `Mempengaruhi kemampuan analisis data ${s.category}`,
      recommendedResources: [
        `Cari kursus ${s.skill}`,
        `Praktek ${s.skill} setiap hari`,
      ],
    }));

    // --- Productivity Analytics ---
    const focusScore = dailyEntries.reduce((sum, d) => sum + d.focusScore, 0) / (dailyEntries.length || 1);
    const avgConsistency = dailyEntries.length > 0
      ? (completedDays.length / dailyEntries.length) * 100
      : 0;

    const efficiencyScore = totalHours > 0
      ? (completedDays.length / totalHours) * 10
      : 0;

    const overallProductivity = (focusScore + avgConsistency + Math.min(efficiencyScore, 100)) / 3;

    // Peak productivity times
    const hourlyProductivity: { hour: number; productivity: number }[] = [];
    for (let h = 8; h < 18; h++) {
      const hours = dailyEntries.reduce((sum, d) => {
        const session = d.sessions.find((s) => {
          const hour = s.startTime ? parseInt(s.startTime.split(':')[0]) : 0;
          return hour === h;
        });
        return sum + (session?.understandingLevel || 0);
      }, 0);
      const count = dailyEntries.filter((d) =>
        d.sessions.some((s) => {
          const hour = s.startTime ? parseInt(s.startTime.split(':')[0]) : 0;
          return hour === h;
        })
      ).length;
      hourlyProductivity.push({
        hour: h,
        productivity: count > 0 ? hours / count : 0,
      });
    }

    const peakTimes = hourlyProductivity
      .sort((a, b) => b.productivity - a.productivity)
      .slice(0, 2)
      .map((h) => ({
        time: `${String(h.hour).padStart(2, '0')}:00`,
        productivity: h.productivity,
        activities: ['Belajar'],
        frequency: Math.floor(h.productivity / 10) + 1,
      }));

    const distractions = [
      {
        source: 'HP',
        frequency: 5,
        impactScore: 30,
        productivityLoss: 15,
        solution: 'Gunakan mode fokus di HP',
      },
    ];

    const recommendations = [
      {
        action: 'Tingkatkan fokus di pagi hari',
        expectedImprovement: 20,
        priority: 'high' as const,
        implementationTime: '1 minggu',
      },
      {
        action: 'Kurangi distraksi HP',
        expectedImprovement: 15,
        priority: 'medium' as const,
        implementationTime: '3 hari',
      },
    ];

    // --- Insights ---
    const insights = [];

    // Study time insight
    if (avgDailyHours < 5) {
      insights.push({
        id: 'insight_1',
        type: 'warning' as InsightType,
        severity: 'high' as InsightSeverity,
        category: 'study_time',
        title: 'Waktu Belajar Rendah',
        description: `Rata-rata belajar ${avgDailyHours.toFixed(1)} jam/hari. Target ideal adalah 10 jam/hari.`,
        metric: 'avg_daily_hours',
        value: avgDailyHours,
        benchmark: 10,
        difference: avgDailyHours - 10,
        percentageDifference: ((avgDailyHours - 10) / 10) * 100,
        recommendation: 'Tingkatkan durasi belajar menjadi 10 jam/hari',
        actionItems: [
          {
            action: 'Tambah 2 jam belajar setiap hari',
            priority: 'high',
            expectedImpact: 'Meningkatkan completion rate',
            estimatedEffort: '1 minggu',
          },
        ],
      });
    }

    // Consistency insight
    if (consistencyScore < 80) {
      insights.push({
        id: 'insight_2',
        type: 'warning' as InsightType,
        severity: 'medium' as InsightSeverity,
        category: 'consistency',
        title: 'Konsistensi Rendah',
        description: `Skor konsistensi ${consistencyScore.toFixed(1)}%. Butuh konsistensi tinggi untuk mencapai target.`,
        metric: 'consistency_score',
        value: consistencyScore,
        benchmark: 80,
        difference: consistencyScore - 80,
        percentageDifference: ((consistencyScore - 80) / 80) * 100,
        recommendation: 'Buat jadwal belajar yang tetap setiap hari',
        actionItems: [
          {
            action: 'Buat jadwal belajar tetap',
            priority: 'high',
            expectedImpact: 'Meningkatkan konsistensi',
            estimatedEffort: '3 hari',
          },
        ],
      });
    }

    // Quiz insight
    if (avgQuizScore < 70 && quizScores.length > 0) {
      insights.push({
        id: 'insight_3',
        type: 'warning' as InsightType,
        severity: 'high' as InsightSeverity,
        category: 'quiz',
        title: 'Nilai Quiz Perlu Ditingkatkan',
        description: `Rata-rata nilai quiz ${avgQuizScore.toFixed(1)}%. Target minimal 70%.`,
        metric: 'avg_quiz_score',
        value: avgQuizScore,
        benchmark: 70,
        difference: avgQuizScore - 70,
        percentageDifference: ((avgQuizScore - 70) / 70) * 100,
        recommendation: 'Review materi yang belum dikuasai',
        actionItems: [
          {
            action: 'Review weak topics',
            priority: 'high',
            expectedImpact: 'Meningkatkan nilai quiz',
            estimatedEffort: '1 minggu',
          },
        ],
      });
    }

    // --- Predictions ---
    const remainingHours = TOTAL_HOURS - totalHours;
    const daysRemaining = TOTAL_DAYS - completedDays.length;
    const dailyNeeded = daysRemaining > 0 ? remainingHours / daysRemaining : 0;

    const confidenceLevel = Math.min(100, (completedDays.length / TOTAL_DAYS) * 100);

    const predictedDate = new Date();
    predictedDate.setDate(predictedDate.getDate() + daysRemaining);

    // --- Final Analytics Object ---
    return {
      studyTime: {
        totalHours,
        averageDailyHours: avgDailyHours,
        averageWeeklyHours: avgDailyHours * 7,
        averageMonthlyHours: avgDailyHours * 30,
        maxDailyHours,
        minDailyHours,
        medianDailyHours,
        standardDeviation: stdDev,
        consistencyScore,
        trend,
        hourlyDistribution: hourlyDist,
        dailyDistribution: dailyDist,
        weeklyDistribution: weeklyDist,
        monthlyDistribution: monthlyDist,
      },
      completion: {
        overallCompletionPercentage: overallCompletion,
        dailyCompletionRate,
        weeklyCompletionRate,
        monthlyCompletionRate,
        projectedCompletionDate: projectedDate.toISOString(),
        paceStatus,
      },
      quiz: {
        totalQuizzes: quizzes.length,
        quizzesTaken: quizzesTaken.length,
        quizzesPassed: quizzesPassed.length,
        passRate: quizzesTaken.length > 0 ? (quizzesPassed.length / quizzesTaken.length) * 100 : 0,
        averageScore: avgQuizScore,
        highestScore: quizScores.length > 0 ? Math.max(...quizScores) : 0,
        lowestScore: quizScores.length > 0 ? Math.min(...quizScores) : 0,
        scoresOverTime: quizzesTaken.map((d) => ({
          date: d.date,
          score: d.quiz.score || 0,
          passingScore: d.quiz.passingScore || 70,
          status: (d.quiz.status === 'passed' ? 'passed' : 'failed') as 'passed' | 'failed',
        })),
        weakTopics,
        strongTopics,
      },
      skills: {
        skills: skillLevels,
        overallMasteryLevel,
        topSkills,
        weakestSkills,
        skillGaps,
      },
      productivity: {
        overallProductivityScore: overallProductivity,
        focusScore,
        consistencyScore: avgConsistency,
        efficiencyScore,
        peakProductivityTimes: peakTimes,
        distractions,
        recommendations,
      },
      insights,
      recommendations: weakTopics.slice(0, 3).map((w) => ({
        type: 'topic' as const,
        title: `Pelajari ${w.topic}`,
        description: `Kemampuan ${w.topic} masih rendah (${w.averageScore.toFixed(0)}%). Perlu belajar lebih banyak.`,
        urgency: w.urgency,
        reason: `Nilai ${w.averageScore.toFixed(0)}% di bawah standar`,
        action: {
          label: 'Mulai belajar',
          onClick: () => {},
          href: `/learning/topics/${w.topic}`,
        },
        tags: [w.topic, 'review'],
      })),
      predictions: {
        estimatedCompletionDate: predictedDate.toISOString(),
        remainingHours,
        dailyAverageNeeded: dailyNeeded,
        weeklyAverageNeeded: dailyNeeded * 7,
        confidenceLevel,
        scenarios: [
          {
            scenario: 'optimistic',
            completionDate: new Date(Date.now() + (remainingHours / (dailyNeeded * 1.5)) * 24 * 60 * 60 * 1000).toISOString(),
            dailyHoursNeeded: dailyNeeded * 0.7,
          },
          {
            scenario: 'realistic',
            completionDate: predictedDate.toISOString(),
            dailyHoursNeeded: dailyNeeded,
          },
          {
            scenario: 'pessimistic',
            completionDate: new Date(Date.now() + (remainingHours / (dailyNeeded * 0.5)) * 24 * 60 * 60 * 1000).toISOString(),
            dailyHoursNeeded: dailyNeeded * 1.5,
          },
        ],
      },
    };
  }, [progress]);

  /**
   * Get default analytics (empty)
   */
  const getDefaultAnalytics = useCallback((): AnalyticsData => {
    const now = new Date().toISOString();
    return {
      studyTime: {
        totalHours: 0,
        averageDailyHours: 0,
        averageWeeklyHours: 0,
        averageMonthlyHours: 0,
        maxDailyHours: 0,
        minDailyHours: 0,
        medianDailyHours: 0,
        standardDeviation: 0,
        consistencyScore: 0,
        trend: 'stable',
        hourlyDistribution: [],
        dailyDistribution: [],
        weeklyDistribution: [],
        monthlyDistribution: [],
      },
      completion: {
        overallCompletionPercentage: 0,
        dailyCompletionRate: [],
        weeklyCompletionRate: [],
        monthlyCompletionRate: [],
        projectedCompletionDate: now,
        paceStatus: 'critical',
      },
      quiz: {
        totalQuizzes: 0,
        quizzesTaken: 0,
        quizzesPassed: 0,
        passRate: 0,
        averageScore: 0,
        highestScore: 0,
        lowestScore: 0,
        scoresOverTime: [],
        weakTopics: [],
        strongTopics: [],
      },
      skills: {
        skills: [],
        overallMasteryLevel: 0,
        topSkills: [],
        weakestSkills: [],
        skillGaps: [],
      },
      productivity: {
        overallProductivityScore: 0,
        focusScore: 0,
        consistencyScore: 0,
        efficiencyScore: 0,
        peakProductivityTimes: [],
        distractions: [],
        recommendations: [],
      },
      insights: [],
      recommendations: [],
      predictions: {
        estimatedCompletionDate: now,
        remainingHours: 0,
        dailyAverageNeeded: 0,
        weeklyAverageNeeded: 0,
        confidenceLevel: 0,
        scenarios: [],
      },
    };
  }, []);

  /**
   * Recalculate analytics
   */
  const recalculate = useCallback(() => {
    try {
      const data = calculateAnalytics();
      setAnalytics(data);
      setError(null);
      onAnalyticsChange?.(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to calculate analytics'));
    }
  }, [calculateAnalytics, onAnalyticsChange]);

  /**
   * Get study time analytics
   */
  const getStudyTimeAnalytics = useCallback((timeframe: AnalyticsTimeframe): AnalyticsData['studyTime'] => {
    if (!analytics) return getDefaultAnalytics().studyTime;
    return analytics.studyTime;
  }, [analytics, getDefaultAnalytics]);

  /**
   * Get completion analytics
   */
  const getCompletionAnalytics = useCallback((timeframe: AnalyticsTimeframe): AnalyticsData['completion'] => {
    if (!analytics) return getDefaultAnalytics().completion;
    return analytics.completion;
  }, [analytics, getDefaultAnalytics]);

  /**
   * Get quiz analytics
   */
  const getQuizAnalytics = useCallback((timeframe: AnalyticsTimeframe): AnalyticsData['quiz'] => {
    if (!analytics) return getDefaultAnalytics().quiz;
    return analytics.quiz;
  }, [analytics, getDefaultAnalytics]);

  /**
   * Get skills analytics
   */
  const getSkillAnalytics = useCallback((): AnalyticsData['skills'] => {
    if (!analytics) return getDefaultAnalytics().skills;
    return analytics.skills;
  }, [analytics, getDefaultAnalytics]);

  /**
   * Get productivity analytics
   */
  const getProductivityAnalytics = useCallback((timeframe: AnalyticsTimeframe): AnalyticsData['productivity'] => {
    if (!analytics) return getDefaultAnalytics().productivity;
    return analytics.productivity;
  }, [analytics, getDefaultAnalytics]);

  /**
   * Get insights
   */
  const getInsights = useCallback((): AnalyticsData['insights'] => {
    if (!analytics) return [];
    return analytics.insights;
  }, [analytics]);

  /**
   * Get recommendations
   */
  const getRecommendations = useCallback((): AnalyticsData['recommendations'] => {
    if (!analytics) return [];
    return analytics.recommendations;
  }, [analytics]);

  /**
   * Get predictions
   */
  const getPredictions = useCallback((): AnalyticsData['predictions'] => {
    if (!analytics) return getDefaultAnalytics().predictions;
    return analytics.predictions;
  }, [analytics, getDefaultAnalytics]);

  // Initialize analytics
  useEffect(() => {
    if (progress && autoRecalculate) {
      recalculate();
    }
    setIsLoading(progressLoading);
    setError(progressError);
  }, [progress, progressLoading, progressError, autoRecalculate, recalculate]);

  // Recalculate when progress changes
  useEffect(() => {
    if (progress && autoRecalculate) {
      recalculate();
    }
  }, [progress, autoRecalculate, recalculate]);

  return {
    analytics,
    isLoading,
    error,

    recalculate,

    getStudyTimeAnalytics,
    getCompletionAnalytics,
    getQuizAnalytics,
    getSkillAnalytics,
    getProductivityAnalytics,

    getInsights,
    getRecommendations,
    getPredictions,

    refresh: progressRefresh,
  };
}

export default useAnalytics;
