'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Alert } from '@/components/ui/Alert';

interface NotesSectionProps {
  notes: string;
  onUpdate: (notes: string) => void;
  dayId: number;
}

export function NotesSection({
  notes,
  onUpdate,
  dayId,
}: NotesSectionProps) {
  const [localNotes, setLocalNotes] = useState(notes);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = localNotes.trim() ? localNotes.trim().split(/\s+/).length : 0;
    setWordCount(words);
  }, [localNotes]);

  const handleSave = () => {
    setIsSaving(true);
    setSaveStatus('saving');
    try {
      onUpdate(localNotes);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Card variant="default" padding="lg">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              📝 Catatan Pribadi
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tulis catatan, kesulitan, atau insight dari pembelajaran hari ini
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" size="xs">
              {wordCount} kata
            </Badge>
            {saveStatus === 'saved' && (
              <Badge variant="success" size="xs">✅ Tersimpan</Badge>
            )}
            {saveStatus === 'error' && (
              <Badge variant="danger" size="xs">❌ Gagal</Badge>
            )}
            {saveStatus === 'saving' && (
              <Badge variant="primary" size="xs">⏳ Menyimpan...</Badge>
            )}
          </div>
        </div>

        <Textarea
          placeholder="Tulis catatanmu di sini... (Ctrl+S untuk menyimpan)"
          value={localNotes}
          onChange={(e) => setLocalNotes(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={8}
          className="min-h-[200px]"
          showCount
          maxLength={5000}
        />

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={isSaving || localNotes === notes}
            >
              {isSaving ? '⏳ Menyimpan...' : '💾 Simpan'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setLocalNotes(notes);
                setSaveStatus('idle');
              }}
              disabled={localNotes === notes}
            >
              ↩️ Reset
            </Button>
          </div>
          <div className="text-xs text-gray-400">
            {localNotes.length}/5000 karakter
          </div>
        </div>

        {saveStatus === 'saved' && (
          <Alert variant="success" className="mt-2">
            Catatan berhasil disimpan! ✅
          </Alert>
        )}

        {saveStatus === 'error' && (
          <Alert variant="error" className="mt-2">
            Gagal menyimpan catatan. Coba lagi.
          </Alert>
        )}
      </div>
    </Card>
  );
}
