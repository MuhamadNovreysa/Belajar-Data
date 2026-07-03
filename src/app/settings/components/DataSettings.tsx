'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Alert } from '@/components/ui/Alert';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { ProgressData } from '@/lib/types';

interface DataSettingsProps {
  progress: ProgressData | null;
  onExport: () => string;
  onImport: (json: string) => void;
  onReset: () => void;
  onRefresh: () => void;
}

export function DataSettings({
  progress,
  onExport,
  onImport,
  onReset,
  onRefresh,
}: DataSettingsProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [resetStatus, setResetStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    setIsExporting(true);
    try {
      const data = onExport();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `progress_backup_${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus('success');
      setTimeout(() => setExportStatus('idle'), 3000);
    } catch {
      setExportStatus('error');
      setTimeout(() => setExportStatus('idle'), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        onImport(content);
        setImportStatus('success');
        setTimeout(() => setImportStatus('idle'), 3000);
      } catch {
        setImportStatus('error');
        setTimeout(() => setImportStatus('idle'), 3000);
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Yakin ingin mereset semua progress? Data akan hilang permanen!')) {
      setIsResetting(true);
      try {
        onReset();
        setResetStatus('success');
        setTimeout(() => setResetStatus('idle'), 3000);
      } catch {
        setResetStatus('error');
        setTimeout(() => setResetStatus('idle'), 3000);
      } finally {
        setIsResetting(false);
      }
    }
  };

  const progressStats = progress
    ? {
        totalDays: Object.keys(progress.daily).length,
        completedDays: Object.values(progress.daily).filter(d => d.status === 'completed').length,
        lastUpdated: new Date(progress.lastUpdated).toLocaleString('id-ID'),
      }
    : null;

  return (
    <div className="space-y-6">
      <Card variant="default" padding="lg">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">📊 Data Progress</h4>

          {progressStats && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Hari</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {progressStats.totalDays}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Hari Selesai</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {progressStats.completedDays}
                </div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-center">
                <div className="text-sm text-gray-500 dark:text-gray-400">Last Updated</div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {progressStats.lastUpdated}
                </div>
              </div>
            </div>
          )}

          {!progressStats && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              Belum ada data progress
            </div>
          )}
        </div>
      </Card>

      <Card variant="default" padding="lg">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">💾 Backup & Restore</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <h5 className="font-medium text-blue-800 dark:text-blue-300">📤 Export Data</h5>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                Download semua data progress sebagai file JSON
              </p>
              <Button
                variant="primary"
                size="sm"
                onClick={handleExport}
                disabled={isExporting || !progressStats}
                className="mt-2"
              >
                {isExporting ? '⏳ Exporting...' : '📤 Export'}
              </Button>
              {exportStatus === 'success' && (
                <Alert variant="success" className="mt-2">
                  ✅ Data berhasil diexport!
                </Alert>
              )}
              {exportStatus === 'error' && (
                <Alert variant="error" className="mt-2">
                  ❌ Gagal export data.
                </Alert>
              )}
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <h5 className="font-medium text-green-800 dark:text-green-300">📥 Import Data</h5>
              <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                Import data progress dari file JSON
              </p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                  disabled={isImporting}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImporting}
                >
                  {isImporting ? '⏳ Importing...' : '📥 Pilih File'}
                </Button>
              </div>
              {importStatus === 'success' && (
                <Alert variant="success" className="mt-2">
                  ✅ Data berhasil diimport!
                </Alert>
              )}
              {importStatus === 'error' && (
                <Alert variant="error" className="mt-2">
                  ❌ Gagal import data. Pastikan file valid.
                </Alert>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card variant="default" padding="lg">
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900 dark:text-white">🔄 Sync & Reset</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <h5 className="font-medium text-gray-700 dark:text-gray-300">🔄 Refresh</h5>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Refresh data progress dari storage
              </p>
              <Button variant="outline" size="sm" onClick={onRefresh} className="mt-2">
                🔄 Refresh
              </Button>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
              <h5 className="font-medium text-red-800 dark:text-red-300">⚠️ Reset All</h5>
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                Hapus semua data progress (tidak bisa di-undo!)
              </p>
              <Button
                variant="danger"
                size="sm"
                onClick={handleReset}
                disabled={isResetting || !progressStats}
                className="mt-2"
              >
                {isResetting ? '⏳ Resetting...' : '🗑️ Reset All'}
              </Button>
              {resetStatus === 'success' && (
                <Alert variant="success" className="mt-2">
                  ✅ Data berhasil direset!
                </Alert>
              )}
              {resetStatus === 'error' && (
                <Alert variant="error" className="mt-2">
                  ❌ Gagal reset data.
                </Alert>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
