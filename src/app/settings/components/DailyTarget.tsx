'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Switch } from '@/components/ui/Switch';
import { Alert } from '@/components/ui/Alert';

interface DailyTargetProps {
  settings: any;
  onSave: (data: any) => void;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error';
}

export function DailyTarget({ settings, onSave, saveStatus }: DailyTargetProps) {
  const [targetHours, setTargetHours] = useState(settings?.targetHours || 10);
  const [startTime, setStartTime] = useState(settings?.startTime || '08:00');
  const [endTime, setEndTime] = useState(settings?.endTime || '19:00');
  const [breakDuration, setBreakDuration] = useState(settings?.breakDuration || 30);
  const [lunchTime, setLunchTime] = useState(settings?.lunchTime || '12:30');
  const [lunchDuration, setLunchDuration] = useState(settings?.lunchDuration || 60);
  const [sessionsPerDay, setSessionsPerDay] = useState(settings?.sessionsPerDay || 8);
  const [sessionDuration, setSessionDuration] = useState(settings?.sessionDuration || 120);
  const [restDays, setRestDays] = useState<number[]>(settings?.restDays || []);
  const [studyMode, setStudyMode] = useState(settings?.studyMode || 'focus');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      targetHours,
      startTime,
      endTime,
      breakDuration,
      lunchTime,
      lunchDuration,
      sessionsPerDay,
      sessionDuration,
      restDays,
      studyMode,
    });
  };

  const toggleRestDay = (day: number) => {
    setRestDays(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  return (
    <Card variant="default" padding="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Target Jam Belajar / Hari
            </label>
            <Input
              type="number"
              min={1}
              max={24}
              value={targetHours}
              onChange={(e) => setTargetHours(parseInt(e.target.value) || 10)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Mode Belajar
            </label>
            <Select
              options={[
                { value: 'focus', label: '🎯 Fokus (Intens)' },
                { value: 'standard', label: '📖 Standar' },
                { value: 'relaxed', label: '😌 Santai' },
              ]}
              value={studyMode}
              onChange={(e) => setStudyMode(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Waktu Mulai
            </label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Waktu Selesai
            </label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Durasi Break (menit)
            </label>
            <Input
              type="number"
              min={5}
              max={60}
              value={breakDuration}
              onChange={(e) => setBreakDuration(parseInt(e.target.value) || 30)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Jam Makan Siang
            </label>
            <Input
              type="time"
              value={lunchTime}
              onChange={(e) => setLunchTime(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Durasi Makan Siang (menit)
            </label>
            <Input
              type="number"
              min={15}
              max={120}
              value={lunchDuration}
              onChange={(e) => setLunchDuration(parseInt(e.target.value) || 60)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sesi per Hari
            </label>
            <Input
              type="number"
              min={4}
              max={12}
              value={sessionsPerDay}
              onChange={(e) => setSessionsPerDay(parseInt(e.target.value) || 8)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Hari Istirahat
          </label>
          <div className="flex flex-wrap gap-2">
            {dayNames.map((day, index) => (
              <button
                key={day}
                type="button"
                onClick={() => toggleRestDay(index)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all border-2',
                  restDays.includes(index)
                    ? 'border-red-500 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-600 dark:text-gray-400'
                )}
              >
                {day}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Klik untuk menandai hari istirahat (tidak ada jadwal belajar)
          </p>
        </div>

        {saveStatus === 'error' && (
          <Alert variant="error">
            Gagal menyimpan target harian. Coba lagi.
          </Alert>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            variant="primary"
            disabled={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? '⏳ Menyimpan...' : '💾 Simpan Target'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
