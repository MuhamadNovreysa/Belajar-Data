'use client';

import { Badge } from '@/components/ui/Badge';

interface MonthHeaderProps {
  month: number;
  title: string;
  subtitle: string;
  completionPercentage: number;
  completedDays: number;
  totalDays: number;
  skills: string[];
  tools: string[];
}

export function MonthHeader({
  month,
  title,
  subtitle,
  completionPercentage,
  completedDays,
  totalDays,
  skills,
  tools,
}: MonthHeaderProps) {
  const getStatusBadge = () => {
    if (completionPercentage === 100) {
      return { label: '✅ Selesai', variant: 'success' as const };
    }
    if (completionPercentage > 0) {
      return { label: '🔄 Sedang Berjalan', variant: 'primary' as const };
    }
    return { label: '⏳ Belum Dimulai', variant: 'secondary' as const };
  };

  const status = getStatusBadge();

  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Bulan {month}: {title}
          </h1>
          <Badge variant={status.variant} size="lg">
            {status.label}
          </Badge>
        </div>
        <p className="mt-1 text-gray-500 dark:text-gray-400">{subtitle}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" size="sm">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-1">
          {tools.map((tool) => (
            <Badge key={tool} variant="primary" size="xs">
              {tool}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex-shrink-0 text-right">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {Math.round(completionPercentage)}%
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {completedDays}/{totalDays} hari selesai
        </div>
      </div>
    </div>
  );
}
