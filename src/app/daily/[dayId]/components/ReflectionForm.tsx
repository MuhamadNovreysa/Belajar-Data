'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Radio } from '@/components/ui/Radio';
import { Alert } from '@/components/ui/Alert';
import { DayData } from '@/lib/types';

interface ReflectionFormProps {
  isOpen: boolean;
  onClose: () => void;
  dayId: number;
  dayData: DayData;
  onSave: (reflection: {
    understanding: number;
    focus: number;
    energy: number;
    satisfaction: number;
    difficulty: number;
    easiestTopics: string[];
    hardestTopics: string[];
    needsReview: string[];
    keyLearnings: string[];
    improvementSuggestions: string;
    personalNotes: string;
  }) => void;
}

export function ReflectionForm({
  isOpen,
  onClose,
  dayId,
  dayData,
  onSave,
}: ReflectionFormProps) {
  const [understanding, setUnderstanding] = useState(5);
  const [focus, setFocus] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [satisfaction, setSatisfaction] = useState(5);
  const [difficulty, setDifficulty] = useState(5);
  const [easiestTopics, setEasiestTopics] = useState('');
  const [hardestTopics, setHardestTopics] = useState('');
  const [needsReview, setNeedsReview] = useState('');
  const [keyLearnings, setKeyLearnings] = useState('');
  const [improvementSuggestions, setImprovementSuggestions] = useState('');
  const [personalNotes, setPersonalNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    onSave({
      understanding,
      focus,
      energy,
      satisfaction,
      difficulty,
      easiestTopics: easiestTopics.split(',').map(s => s.trim()).filter(Boolean),
      hardestTopics: hardestTopics.split(',').map(s => s.trim()).filter(Boolean),
      needsReview: needsReview.split(',').map(s => s.trim()).filter(Boolean),
      keyLearnings: keyLearnings.split(',').map(s => s.trim()).filter(Boolean),
      improvementSuggestions,
      personalNotes,
    });
    setIsSubmitting(false);
    onClose();
  };

  const renderRating = (
    label: string,
    value: number,
    onChange: (v: number) => void,
    emojis: string[]
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="flex gap-2">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((v) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            className={cn(
              'w-10 h-10 rounded-lg border-2 transition-all font-semibold flex items-center justify-center',
              value === v
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600'
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-500'
            )}
          >
            {v <= 3 ? emojis[0] : v <= 6 ? emojis[1] : emojis[2]}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`📝 Refleksi Hari ${dayId}`}
      size="lg"
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Refleksikan pembelajaran hari ini untuk meningkatkan pemahamanmu.
        </p>

        {dayData.reflection?.questions && dayData.reflection.questions.length > 0 && (
          <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 text-sm mb-2">📋 Pertanyaan Refleksi</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              {dayData.reflection.questions.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {renderRating('Pemahaman', understanding, setUnderstanding, ['😞', '🤔', '😊'])}
          {renderRating('Fokus', focus, setFocus, ['😴', '😐', '🧠'])}
          {renderRating('Energi', energy, setEnergy, ['😫', '😌', '⚡'])}
          {renderRating('Kepuasan', satisfaction, setSatisfaction, ['😟', '😐', '😄'])}
          {renderRating('Kesulitan', difficulty, setDifficulty, ['😊', '🤔', '😰'])}
        </div>

        <Textarea
          label="📌 Topik yang Paling Mudah"
          placeholder="Contoh: Navigasi Excel, Format Cell..."
          value={easiestTopics}
          onChange={(e) => setEasiestTopics(e.target.value)}
          description="Pisahkan dengan koma"
          rows={2}
        />

        <Textarea
          label="📌 Topik yang Paling Sulit"
          placeholder="Contoh: VLOOKUP, Pivot Table..."
          value={hardestTopics}
          onChange={(e) => setHardestTopics(e.target.value)}
          description="Pisahkan dengan koma"
          rows={2}
        />

        <Textarea
          label="📌 Topik yang Perlu Diulang"
          placeholder="Contoh: Conditional Formatting, Data Validation..."
          value={needsReview}
          onChange={(e) => setNeedsReview(e.target.value)}
          description="Pisahkan dengan koma"
          rows={2}
        />

        <Textarea
          label="💡 Hal yang Dipelajari Hari Ini"
          placeholder="Contoh: Cara membuat dropdown, Shortcut keyboard Excel..."
          value={keyLearnings}
          onChange={(e) => setKeyLearnings(e.target.value)}
          description="Pisahkan dengan koma"
          rows={3}
        />

        <Textarea
          label="💡 Saran Perbaikan"
          placeholder="Contoh: Kurangi distraksi HP, Belajar lebih pagi..."
          value={improvementSuggestions}
          onChange={(e) => setImprovementSuggestions(e.target.value)}
          rows={2}
        />

        <Textarea
          label="📝 Catatan Pribadi"
          placeholder="Tulis catatan tambahan..."
          value={personalNotes}
          onChange={(e) => setPersonalNotes(e.target.value)}
          rows={3}
        />

        <Alert variant="info">
          Refleksi ini akan membantumu melacak perkembangan dan memperbaiki strategi belajar.
        </Alert>
      </div>

      <div className="flex gap-2 mt-4 justify-end">
        <Button variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Menyimpan...' : '💾 Simpan Refleksi'}
        </Button>
      </div>
    </Modal>
  );
}
