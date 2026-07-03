'use client';

import { Session } from '@/lib/types/roadmap.types';
import { DailyProgress, SessionProgress } from '@/lib/types/progress.types';
import { SessionCard } from '@/components/shared/SessionCard';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface DailyScheduleProps {
  sessions: Session[];
  dayProgress: DailyProgress | null;
  onUpdateSession: (sessionNumber: number, data: Partial<SessionProgress>) => void;
  onStartTimer: () => void;
  onPauseTimer: () => void;
  onResumeTimer: () => void;
  onStopTimer: () => void;
  onSkipSession: () => void;
  isTimerRunning: boolean;
  elapsedSeconds: number;
}

export function DailySchedule({
  sessions,
  dayProgress,
  onUpdateSession,
  onStartTimer,
  onPauseTimer,
  onResumeTimer,
  onStopTimer,
  onSkipSession,
  isTimerRunning,
  elapsedSeconds,
}: DailyScheduleProps) {
  const totalSessions = sessions.filter(s => !s.isBreak).length;
  const completedSessions = dayProgress?.sessions?.filter(s => s.status === 'completed').length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">Jadwal Hari Ini</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {completedSessions}/{totalSessions} sesi selesai
          </p>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {Math.round((completedSessions / totalSessions) * 100)}%
          </div>
          <ProgressBar
            value={(completedSessions / totalSessions) * 100}
            max={100}
            size="sm"
            color="blue"
            showPercentage={false}
            className="w-32"
          />
        </div>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => {
          const sessionProgress = dayProgress?.sessions?.find(
            (s) => s.sessionNumber === session.session
          );

          return (
            <SessionCard
              key={session.session}
              session={session.session}
              title={session.topic}
              description={session.isBreak ? `Break ${session.duration} menit` : session.subtopics.map(s => s.name).join(', ')}
              time={session.time}
              duration={session.duration}
              status={session.isBreak ? 'completed' : (sessionProgress?.status === 'reviewing' ? 'pending' : sessionProgress?.status || 'pending')}
              type={session.isBreak ? 'break' : 'learning'}
              topics={session.subtopics.map(s => s.name)}
              resources={{
                videos: session.resources?.videos?.length || 0,
                articles: session.resources?.articles?.length || 0,
                practices: session.practice ? 1 : 0,
              }}
              progress={sessionProgress?.completionPercentage || 0}
              isBreak={session.isBreak}
              breakActivity={session.isBreak ? '☕ Istirahat' : undefined}
              onClick={() => {
                if (!session.isBreak && sessionProgress?.status === 'pending') {
                  onStartTimer();
                }
              }}
              compact={false}
            />
          );
        })}
      </div>

      {dayProgress?.status === 'in_progress' && !dayProgress?.isComplete && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">⏰ Sedang Belajar</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {isTimerRunning ? 'Timer sedang berjalan' : 'Timer dijeda'}
              </p>
            </div>
            <div className="flex gap-2">
              {!isTimerRunning ? (
                <Button variant="primary" size="sm" onClick={onResumeTimer}>
                  ▶️ Lanjutkan
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={onPauseTimer}>
                  ⏸️ Jeda
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={onStopTimer}>
                ⏹️ Selesai
              </Button>
              <Button variant="secondary" size="sm" onClick={onSkipSession}>
                ⏭️ Lewati
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
