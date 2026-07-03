import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { ProgressStatus, DailyProgress, MonthlyProgress, WeeklyProgress, UserStatistics } from '@/lib/types/progress.types';
import { TOTAL_DAYS, TOTAL_MONTHS } from '@/lib/utils/constants';
import { getMonthFromDayId, getWeekFromDayId, calculateCompletion, calculateAverage, calculateStreak } from '@/lib/utils/helpers';

export interface UseProgressOptions {
  /** User ID untuk multi-user (optional) */
  userId?: string;
  /** Auto-save setiap perubahan */
  autoSave?: boolean;
  /** Callback ketika progress berubah */
  onProgressChange?: (progress: ProgressData) => void;
}

export interface ProgressData {
  /** Progress harian per dayId */
  daily: Record<number, DailyProgress>;
  /** Progress bulanan per month */
  monthly: Record<number, MonthlyProgress>;
  /** Progress mingguan per week */
  weekly: Record<number, WeeklyProgress>;
  /** Total statistik */
  statistics: UserStatistics;
  /** Last updated timestamp */
  lastUpdated: string;
}

export interface UseProgressReturn {
  /** Semua data progress */
  progress: ProgressData;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;

  /** Ambil progress hari tertentu */
  getDayProgress: (dayId: number) => DailyProgress | null;
  /** Update progress hari tertentu */
  updateDayProgress: (dayId: number, data: Partial<DailyProgress>) => void;
  /** Ambil progress bulan tertentu */
  getMonthProgress: (month: number) => MonthlyProgress | null;
  /** Update progress bulan tertentu */
  updateMonthProgress: (month: number, data: Partial<MonthlyProgress>) => void;
  /** Ambil progress minggu tertentu */
  getWeekProgress: (week: number) => WeeklyProgress | null;
  /** Update progress minggu tertentu */
  updateWeekProgress: (week: number, data: Partial<WeeklyProgress>) => void;

  /** Total statistik keseluruhan */
  getOverallStats: () => UserStatistics;
  /** Reset semua progress */
  resetProgress: () => void;
  /** Export progress ke JSON */
  exportProgress: () => string;
  /** Import progress dari JSON */
  importProgress: (json: string) => void;

  /** Total hari selesai */
  totalDaysCompleted: number;
  /** Total jam belajar */
  totalHoursStudied: number;
  /** Persentase completion keseluruhan */
  completionPercentage: number;
  /** Streak saat ini */
  currentStreak: number;
  /** Streak terpanjang */
  longestStreak: number;

  /** Refresh progress dari localStorage */
  refresh: () => void;
}

/**
 * Hook utama untuk mengelola semua progress belajar
 */
export function useProgress(options: UseProgressOptions = {}): UseProgressReturn {
  const { userId = 'default', autoSave = true, onProgressChange } = options;
  const storageKey = `progress_${userId}`;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Default progress data
  const defaultProgress: ProgressData = {
    daily: {},
    monthly: {},
    weekly: {},
    statistics: {
      totalDays: 0,
      totalDaysCompleted: 0,
      totalDaysInProgress: 0,
      totalDaysNotStarted: 0,
      overallCompletionPercentage: 0,
      totalHoursStudied: 0,
      totalHoursPlanned: 0,
      averageDailyHours: 0,
      totalSubtopics: 0,
      subtopicsCompleted: 0,
      subtopicsMastered: 0,
      subtopicsNeedsReview: 0,
      totalQuizzes: 0,
      quizzesTaken: 0,
      quizzesPassed: 0,
      averageQuizScore: 0,
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
      nextLevelPoints: 100,
      rank: 'Pemula',
      badges: [],
      skillLevels: [],
      strongestSkills: [],
      weakestSkills: [],
      improvementAreas: [],
      recommendedTopics: [],
      achievements: [],
      weeklyStats: [],
      monthlyStats: [],
      dailyStats: [],
      productivityScore: 0,
      consistencyScore: 0,
      learningStreak: {
        type: 'daily',
        currentStreak: 0,
        longestStreak: 0,
        lastDate: '',
        streakHistory: [],
        totalDaysActive: 0,
        totalWeeksActive: 0,
        totalMonthsActive: 0,
        bestMonth: '',
        bestWeek: '',
        averageDailyActivity: 0,
        consistencyScore: 0,
        streakTarget: 0,
        currentTargetProgress: 0,
        isOnTrack: false,
        milestones: [],
        notes: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    lastUpdated: new Date().toISOString(),
  };

  // Inisialisasi localStorage
  const {
    value: progress,
    setValue: setProgress,
    isLoading: storageLoading,
    error: storageError,
    reload: refresh,
  } = useLocalStorage<ProgressData>(storageKey, defaultProgress, {
    serialize: true,
    onStorageChange: () => {
      if (autoSave) {
        calculateAndUpdateStats();
      }
    },
  });

  /**
   * Hitung dan update statistik
   */
  const calculateAndUpdateStats = useCallback(() => {
    if (!progress) return;

    const dailyEntries = Object.values(progress.daily);
    const totalDays = dailyEntries.length;
    const completedDays = dailyEntries.filter((d) => d.status === 'completed').length;
    const inProgressDays = dailyEntries.filter((d) => d.status === 'in_progress').length;
    const notStartedDays = dailyEntries.filter((d) => d.status === 'not_started').length;

    const totalHours = dailyEntries.reduce((sum, d) => sum + d.totalMinutesStudied / 60, 0);
    const totalSubtopics = dailyEntries.reduce((sum, d) => sum + d.subtopics.length, 0);
    const subtopicsCompleted = dailyEntries.reduce(
      (sum, d) => sum + d.subtopics.filter((s) => s.status === 'mastered' || s.status === 'understood').length,
      0
    );

    const totalQuizzes = dailyEntries.filter((d) => d.quiz.quizId).length;
    const quizzesTaken = dailyEntries.filter((d) => d.quiz.status !== 'not_started').length;
    const quizzesPassed = dailyEntries.filter((d) => d.quiz.status === 'passed').length;
    const quizScores = dailyEntries.filter((d) => d.quiz.score !== undefined).map((d) => d.quiz.score || 0);
    const averageQuizScore = quizScores.length > 0 ? calculateAverage(quizScores) : 0;

    const totalPractices = dailyEntries.reduce((sum, d) => sum + d.practice.length, 0);
    const practicesCompleted = dailyEntries.reduce(
      (sum, d) => sum + d.practice.filter((p) => p.status === 'completed').length,
      0
    );

    const assignmentsSubmitted = dailyEntries.filter((d) => d.assignment.status !== 'not_started').length;
    const assignmentsAccepted = dailyEntries.filter((d) => d.assignment.status === 'accepted').length;

    const completionPercentage = totalDays > 0 ? (completedDays / totalDays) * 100 : 0;

    const streak = calculateStreak(
      dailyEntries.filter((d) => d.status === 'completed').map((d) => d.completedAt || '')
    );

    // Update statistik
    const updatedStats: UserStatistics = {
      ...progress.statistics,
      totalDays,
      totalDaysCompleted: completedDays,
      totalDaysInProgress: inProgressDays,
      totalDaysNotStarted: notStartedDays,
      overallCompletionPercentage: completionPercentage,
      totalHoursStudied: totalHours,
      totalHoursPlanned: totalDays * 10,
      averageDailyHours: totalDays > 0 ? totalHours / totalDays : 0,
      totalSubtopics,
      subtopicsCompleted,
      subtopicsMastered: 0,
      subtopicsNeedsReview: 0,
      totalQuizzes,
      quizzesTaken,
      quizzesPassed,
      averageQuizScore,
      totalPractices,
      practicesCompleted,
      totalAssignments: totalDays,
      assignmentsSubmitted,
      assignmentsAccepted,
      totalProjects: 0,
      projectsCompleted: 0,
      projectsApproved: 0,
      totalPoints: Math.floor(completedDays * 10),
      currentLevel: Math.floor(completedDays / 10) + 1,
      nextLevelPoints: (Math.floor(completedDays / 10) + 1) * 100,
      rank: getRank(completedDays),
      learningStreak: {
        ...progress.statistics.learningStreak,
        currentStreak: streak.current,
        longestStreak: streak.longest,
        totalDaysActive: completedDays,
        lastDate: new Date().toISOString(),
      },
      updatedAt: new Date().toISOString(),
    };

    setProgress({
      ...progress,
      statistics: updatedStats,
      lastUpdated: new Date().toISOString(),
    });

    onProgressChange?.(progress);
  }, [progress, setProgress, onProgressChange]);

  /**
   * Dapatkan rank berdasarkan hari selesai
   */
  const getRank = (days: number): string => {
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

  /**
   * Ambil progress hari tertentu
   */
  const getDayProgress = useCallback((dayId: number): DailyProgress | null => {
    if (!progress) return null;
    return progress.daily[dayId] || null;
  }, [progress]);

  /**
   * Update progress hari tertentu
   */
  const updateDayProgress = useCallback((dayId: number, data: Partial<DailyProgress>) => {
    if (!progress) return;

    const current = progress.daily[dayId] || {
      dayId,
      month: getMonthFromDayId(dayId),
      week: getWeekFromDayId(dayId),
      day: dayId,
      date: new Date().toISOString(),
      status: 'not_started',
      totalMinutesStudied: 0,
      totalMinutesPlanned: 600,
      completionPercentage: 0,
      isComplete: false,
      isOverdue: false,
      sessions: [],
      subtopics: [],
      quiz: {
        quizId: '',
        title: '',
        status: 'not_started',
        totalQuestions: 0,
        answeredQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        skippedQuestions: 0,
        score: 0,
        percentageScore: 0,
        passingScore: 0,
        isPassed: false,
        attempts: 0,
        maxAttempts: 0,
        answers: [],
        flaggedQuestions: [],
        timePerQuestion: [],
        weakestTopics: [],
        strongestTopics: [],
        reviewRecommended: false,
        reviewTopics: [],
        notes: '',
        createdAt: '',
        updatedAt: '',
        startTime: '',
        submittedAt: '',
        timeSpentMinutes: 0,
        timeLimitMinutes: 0,
      },
      practice: [],
      assignment: {
        assignmentId: '',
        title: '',
        status: 'not_started',
        isSubmitted: false,
        isLate: false,
        attempts: 0,
        maxAttempts: 0,
        filesSubmitted: [],
        rubricScores: [],
        strengths: [],
        weaknesses: [],
        improvements: [],
        notes: '',
        createdAt: '',
        updatedAt: '',
        startTime: '',
        submittedAt: '',
        timeSpentMinutes: 0,
        estimatedTimeMinutes: 0,
        score: 0,
        maxScore: 0,
        percentageScore: 0,
        feedback: '',
        reviewerNotes: '',
        revisionNotes: '',
        revisionDeadline: '',
        lateDays: 0,
      },
      reflectionCompleted: false,
      personalNotes: '',
      difficulties: [],
      achievements: [],
      focusScore: 0,
      understandingScore: 0,
      energyScore: 0,
      satisfactionScore: 0,
      distractions: [],
      topicsNeedsReview: [],
      reviewPriority: 'low',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = {
      ...current,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    // Update completion
    if (updated.sessions.length > 0) {
      const completedSessions = updated.sessions.filter((s) => s.status === 'completed').length;
      updated.completionPercentage = (completedSessions / updated.sessions.length) * 100;
      updated.isComplete = updated.completionPercentage >= 100;
      updated.status = updated.isComplete ? 'completed' : 'in_progress';
    }

    setProgress({
      ...progress,
      daily: {
        ...progress.daily,
        [dayId]: updated,
      },
      lastUpdated: new Date().toISOString(),
    });

    // Auto calculate stats
    if (autoSave) {
      setTimeout(calculateAndUpdateStats, 100);
    }
  }, [progress, setProgress, autoSave, calculateAndUpdateStats]);

  /**
   * Ambil progress bulan tertentu
   */
  const getMonthProgress = useCallback((month: number): MonthlyProgress | null => {
    if (!progress) return null;
    return progress.monthly[month] || null;
  }, [progress]);

  /**
   * Update progress bulan tertentu
   */
  const updateMonthProgress = useCallback((month: number, data: Partial<MonthlyProgress>) => {
    if (!progress) return;

    const current = progress.monthly[month] || {
      month,
      year: new Date().getFullYear(),
      title: `Bulan ${month}`,
      status: 'not_started',
      totalDays: 0,
      daysCompleted: 0,
      daysInProgress: 0,
      daysNotStarted: 0,
      completionPercentage: 0,
      totalHoursStudied: 0,
      totalHoursPlanned: 0,
      averageDailyHours: 0,
      totalSubtopics: 0,
      subtopicsCompleted: 0,
      subtopicsMastered: 0,
      subtopicsNeedsReview: 0,
      totalQuizzes: 0,
      quizzesTaken: 0,
      quizzesPassed: 0,
      averageQuizScore: 0,
      totalPractices: 0,
      practicesCompleted: 0,
      totalAssignments: 0,
      assignmentsSubmitted: 0,
      assignmentsAccepted: 0,
      projectStatus: 'not_started',
      skillLevels: [],
      strengths: [],
      weaknesses: [],
      improvementAreas: [],
      nextMonthGoals: [],
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = {
      ...current,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    setProgress({
      ...progress,
      monthly: {
        ...progress.monthly,
        [month]: updated,
      },
      lastUpdated: new Date().toISOString(),
    });

    if (autoSave) {
      setTimeout(calculateAndUpdateStats, 100);
    }
  }, [progress, setProgress, autoSave, calculateAndUpdateStats]);

  /**
   * Ambil progress minggu tertentu
   */
  const getWeekProgress = useCallback((week: number): WeeklyProgress | null => {
    if (!progress) return null;
    return progress.weekly[week] || null;
  }, [progress]);

  /**
   * Update progress minggu tertentu
   */
  const updateWeekProgress = useCallback((week: number, data: Partial<WeeklyProgress>) => {
    if (!progress) return;

    const current = progress.weekly[week] || {
      week,
      month: Math.ceil(week / 4),
      year: new Date().getFullYear(),
      title: `Minggu ${week}`,
      status: 'not_started',
      totalDays: 0,
      daysCompleted: 0,
      completionPercentage: 0,
      totalHoursStudied: 0,
      totalHoursPlanned: 0,
      averageDailyHours: 0,
      totalSubtopics: 0,
      subtopicsCompleted: 0,
      quizzesTaken: 0,
      averageQuizScore: 0,
      assignmentsSubmitted: 0,
      assignmentsAccepted: 0,
      skillImprovements: [],
      challenges: [],
      nextWeekGoals: [],
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = {
      ...current,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    setProgress({
      ...progress,
      weekly: {
        ...progress.weekly,
        [week]: updated,
      },
      lastUpdated: new Date().toISOString(),
    });

    if (autoSave) {
      setTimeout(calculateAndUpdateStats, 100);
    }
  }, [progress, setProgress, autoSave, calculateAndUpdateStats]);

  /**
   * Dapatkan statistik keseluruhan
   */
  const getOverallStats = useCallback((): UserStatistics => {
    if (!progress) return defaultProgress.statistics;
    return progress.statistics;
  }, [progress]);

  /**
   * Reset semua progress
   */
  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    if (autoSave) {
      setTimeout(calculateAndUpdateStats, 100);
    }
  }, [setProgress, autoSave, calculateAndUpdateStats]);

  /**
   * Export progress ke JSON
   */
  const exportProgress = useCallback((): string => {
    if (!progress) return '{}';
    return JSON.stringify(progress, null, 2);
  }, [progress]);

  /**
   * Import progress dari JSON
   */
  const importProgress = useCallback((json: string) => {
    try {
      const data = JSON.parse(json) as ProgressData;
      setProgress(data);
      if (autoSave) {
        setTimeout(calculateAndUpdateStats, 100);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to import progress'));
    }
  }, [setProgress, autoSave, calculateAndUpdateStats]);

  // Memoized computed values
  const totalDaysCompleted = useMemo(() => {
    if (!progress) return 0;
    return Object.values(progress.daily).filter((d) => d.status === 'completed').length;
  }, [progress]);

  const totalHoursStudied = useMemo(() => {
    if (!progress) return 0;
    return Object.values(progress.daily).reduce((sum, d) => sum + d.totalMinutesStudied / 60, 0);
  }, [progress]);

  const completionPercentage = useMemo(() => {
    if (!progress) return 0;
    const total = Object.values(progress.daily).length;
    const completed = Object.values(progress.daily).filter((d) => d.status === 'completed').length;
    return total > 0 ? (completed / total) * 100 : 0;
  }, [progress]);

  const currentStreak = useMemo(() => {
    if (!progress) return 0;
    return progress.statistics.learningStreak.currentStreak;
  }, [progress]);

  const longestStreak = useMemo(() => {
    if (!progress) return 0;
    return progress.statistics.learningStreak.longestStreak;
  }, [progress]);

  // Initialize
  useEffect(() => {
    if (progress && autoSave) {
      calculateAndUpdateStats();
    }
    setIsLoading(storageLoading);
    setError(storageError);
  }, [progress, storageLoading, storageError, autoSave, calculateAndUpdateStats]);

  return {
    progress: progress || defaultProgress,
    isLoading,
    error,

    getDayProgress,
    updateDayProgress,
    getMonthProgress,
    updateMonthProgress,
    getWeekProgress,
    updateWeekProgress,

    getOverallStats,
    resetProgress,
    exportProgress,
    importProgress,

    totalDaysCompleted,
    totalHoursStudied,
    completionPercentage,
    currentStreak,
    longestStreak,

    refresh,
  };
}

export default useProgress;
