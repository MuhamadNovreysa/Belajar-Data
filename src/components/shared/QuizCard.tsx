'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

export interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questions: number;
  passingScore: number;
  timeLimit: number;
  status: 'not_started' | 'in_progress' | 'submitted' | 'passed' | 'failed' | 'reviewing';
  score?: number;
  attempts: number;
  maxAttempts: number;
  topics: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  className?: string;
  onStart?: (id: string) => void;
  onReview?: (id: string) => void;
  compact?: boolean;
}

export function QuizCard({
  id,
  title,
  description,
  questions,
  passingScore,
  timeLimit,
  status,
  score,
  attempts,
  maxAttempts,
  topics,
  difficulty,
  className,
  onStart,
  onReview,
  compact = false,
}: QuizCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const statusColors = {
    not_started: 'border-gray-200 bg-gray-50',
    in_progress: 'border-blue-200 bg-blue-50',
    submitted: 'border-yellow-200 bg-yellow-50',
    passed: 'border-green-200 bg-green-50',
    failed: 'border-red-200 bg-red-50',
    reviewing: 'border-purple-200 bg-purple-50',
  };

  const statusBadges = {
    not_started: { label: '⏳ Belum Dikerjakan', variant: 'secondary' },
    in_progress: { label: '🔄 Sedang Dikerjakan', variant: 'primary' },
    submitted: { label: '📤 Dikirim', variant: 'warning' },
    passed: { label: '✅ Lulus', variant: 'success' },
    failed: { label: '❌ Gagal', variant: 'danger' },
    reviewing: { label: '👀 Sedang Ditinjau', variant: 'info' },
  } as const;

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-orange-100 text-orange-800',
    expert: 'bg-red-100 text-red-800',
  };

  const difficultyLabels = {
    beginner: 'Pemula',
    intermediate: 'Menengah',
    advanced: 'Lanjutan',
    expert: 'Expert',
  };

  const getScoreColor = (score: number) => {
    if (score >= passingScore) return 'text-green-600';
    return 'text-red-600';
  };

  const canStart = status === 'not_started' || (status === 'failed' && attempts < maxAttempts);
  const canRetry = status === 'failed' && attempts < maxAttempts;
  const isPassed = status === 'passed';
  const isFailed = status === 'failed';

  if (compact) {
    return (
      <div
        className={cn(
          'rounded-xl border-2 p-3 transition-all cursor-pointer hover:shadow-md',
          statusColors[status],
          className
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-gray-900 truncate">
                {title}
              </span>
              <Badge variant={statusBadges[status].variant as any} size="xs">
                {statusBadges[status].label}
              </Badge>
            </div>
            <div className="text-xs text-gray-500 truncate">{description}</div>
          </div>
          {score !== undefined && (
            <div className="text-right">
              <div className={cn(
                'text-sm font-bold',
                getScoreColor(score)
              )}>
                {score}%
              </div>
              <div className="text-xs text-gray-400">{questions} soal</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Card
      variant="default"
      padding="lg"
      className={cn(
        'transition-all border-l-4',
        status === 'passed' ? 'border-l-green-500' :
        status === 'failed' ? 'border-l-red-500' :
        status === 'in_progress' ? 'border-l-blue-500' :
        'border-l-gray-300',
        statusColors[status],
        className
      )}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg',
            status === 'passed' ? 'bg-green-500' :
            status === 'failed' ? 'bg-red-500' :
            'bg-gradient-to-br from-blue-500 to-purple-500'
          )}
        >
          {status === 'passed' ? '🎉' : status === 'failed' ? '😞' : '🧪'}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="text-base font-bold text-gray-900">{title}</h4>
            <Badge variant={statusBadges[status].variant as any} size="sm">
              {statusBadges[status].label}
            </Badge>
            <Badge
              variant="secondary"
              size="sm"
              className={difficultyColors[difficulty]}
            >
              {difficultyLabels[difficulty]}
            </Badge>
          </div>

          <p className="text-sm text-gray-500 mt-1">{description}</p>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mt-3">
            {topics.map((topic) => (
              <Badge key={topic} variant="secondary" size="sm">
                {topic}
              </Badge>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
            <div>
              <div className="text-xs text-gray-400">Soal</div>
              <div className="text-sm font-semibold text-gray-700">
                {questions} soal
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Waktu</div>
              <div className="text-sm font-semibold text-gray-700">
                {timeLimit} menit
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Nilai Lulus</div>
              <div className="text-sm font-semibold text-gray-700">
                {passingScore}%
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400">Percobaan</div>
              <div className="text-sm font-semibold text-gray-700">
                {attempts}/{maxAttempts}
              </div>
            </div>
          </div>

          {/* Score */}
          {score !== undefined && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Nilai:</span>
                <span className={cn(
                  'text-xl font-bold',
                  getScoreColor(score)
                )}>
                  {score}%
                </span>
                <span className="text-sm text-gray-500">
                  {score >= passingScore ? '🎉 Lulus!' : '😞 Perlu Belajar Lagi'}
                </span>
              </div>
              <ProgressBar
                value={score}
                max={100}
                size="sm"
                color={score >= passingScore ? 'green' : 'red'}
                showPercentage={false}
                className="mt-1"
              />
            </div>
          )}
        </div>

        {/* Action */}
        <div className="flex-shrink-0 flex flex-col gap-2">
          {isPassed ? (
            <Button variant="outline" size="sm" onClick={() => onReview?.(id)}>
              📋 Lihat Hasil
            </Button>
          ) : canStart ? (
            <Button variant="primary" size="sm" onClick={() => onStart?.(id)}>
              {canRetry ? '🔄 Coba Lagi' : '▶️ Mulai Quiz'}
            </Button>
          ) : status === 'in_progress' ? (
            <Button variant="primary" size="sm" onClick={() => onStart?.(id)}>
              ▶️ Lanjutkan
            </Button>
          ) : status === 'submitted' ? (
            <Button variant="secondary" size="sm" disabled>
              ⏳ Menunggu Penilaian
            </Button>
          ) : isFailed && attempts >= maxAttempts ? (
            <Button variant="secondary" size="sm" disabled>
              🔒 Maksimal Percobaan
            </Button>
          ) : null}
          {status !== 'not_started' && status !== 'in_progress' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Sembunyikan' : 'Detail'}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default QuizCard;
