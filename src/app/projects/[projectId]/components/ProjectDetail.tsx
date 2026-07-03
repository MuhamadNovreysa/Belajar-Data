'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { FinalProject } from '@/lib/types/roadmap.types';
import { ProjectProgress } from '@/lib/types/progress.types';

interface ProjectDetailProps {
  project: FinalProject;
  progress: ProjectProgress | null;
  onUpdateProgress: (data: Partial<ProjectProgress>) => void;
}

export function ProjectDetail({ project, progress, onUpdateProgress }: ProjectDetailProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isStarted = progress?.status !== 'not_started' && progress?.status !== undefined;

  const handleStart = () => {
    onUpdateProgress({
      status: 'planning',
      startDate: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-6">
      {/* Description */}
      <Card variant="default" padding="lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          📋 Deskripsi Project
        </h4>
        <p className="text-gray-600 dark:text-gray-400">{project.description}</p>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">📊 Dataset</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">{project.dataset}</p>
          </div>
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">⏱️ Estimasi Waktu</h5>
            <p className="text-sm text-gray-500 dark:text-gray-400">{project.estimatedTime}</p>
          </div>
        </div>

        {!isStarted && (
          <div className="mt-6">
            <Button variant="primary" size="lg" onClick={handleStart}>
              🚀 Mulai Project
            </Button>
          </div>
        )}
      </Card>

      {/* Skills & Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="default" padding="lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            🛠️ Tools yang Digunakan
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.toolsUsed.map((tool) => (
              <Badge key={tool} variant="primary" size="md">
                {tool}
              </Badge>
            ))}
          </div>
        </Card>

        <Card variant="default" padding="lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            📚 Skills yang Diuji
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.skillsTested.map((skill) => (
              <Badge key={skill} variant="secondary" size="md">
                {skill}
              </Badge>
            ))}
          </div>
        </Card>
      </div>

      {/* Deliverables */}
      <Card variant="default" padding="lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          📦 Deliverables
        </h4>
        <ul className="space-y-2">
          {project.deliverables.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="text-blue-500">▸</span>
              {item}
            </li>
          ))}
        </ul>
      </Card>

      {/* Evaluation Criteria */}
      <Card variant="default" padding="lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          📊 Kriteria Penilaian
        </h4>
        <div className="space-y-3">
          {project.evaluationCriteria.map((criteria) => (
            <div key={criteria.category} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {criteria.category}
              </span>
              <div className="flex items-center gap-3">
                <ProgressBar
                  value={criteria.weight}
                  max={100}
                  size="xs"
                  color="blue"
                  showPercentage={false}
                  className="w-20"
                />
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {criteria.weight}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          {project.evaluationCriteria.map((c) => c.description).join(' • ')}
        </p>
      </Card>

      {/* Tips */}
      {project.tips && project.tips.length > 0 && (
        <Card variant="default" padding="lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            💡 Tips Pengerjaan
          </h4>
          <ul className="space-y-2">
            {project.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="text-blue-500">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {isStarted && progress && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">📝 Project Status</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Status: {progress.status} • Progress: {Math.round(progress.completionPercentage || 0)}%
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Sembunyikan' : 'Lihat Detail'}
            </Button>
          </div>

          {isExpanded && (
            <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Mulai:</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    {progress.startDate ? new Date(progress.startDate).toLocaleDateString('id-ID') : '-'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Deadline:</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    {progress.deadline ? new Date(progress.deadline).toLocaleDateString('id-ID') : '-'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Hari Dikerjakan:</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    {progress.daysWorked || 0} hari
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">Skills Digunakan:</span>
                  <span className="text-gray-700 dark:text-gray-300 ml-2">
                    {progress.skillsUsed?.length || 0} skill
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
