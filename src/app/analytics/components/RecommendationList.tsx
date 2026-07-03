'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnalyticsData } from '@/lib/types/analytics.types';

interface RecommendationListProps {
  recommendations: AnalyticsData['recommendations'];
  detailed?: boolean;
}

export function RecommendationList({ recommendations, detailed = false }: RecommendationListProps) {
  const [expandedRecommendation, setExpandedRecommendation] = useState<string | null>(null);

  if (!recommendations || recommendations.length === 0) {
    return (
      <Card variant="default" padding="lg">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">📋</span>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Rekomendasi</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Belum ada rekomendasi yang tersedia
            </p>
          </div>
        </div>
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          🎯 Terus belajar untuk mendapatkan rekomendasi!
        </div>
      </Card>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'topic': return '📚';
      case 'resource': return '📖';
      case 'practice': return '💻';
      case 'review': return '🔄';
      case 'project': return '📊';
      default: return '📌';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'border-red-500 bg-red-50 dark:bg-red-950/30';
      case 'high': return 'border-orange-500 bg-orange-50 dark:bg-orange-950/30';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30';
      default: return 'border-blue-500 bg-blue-50 dark:bg-blue-950/30';
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'danger' as const;
      case 'high': return 'warning' as const;
      case 'medium': return 'primary' as const;
      default: return 'secondary' as const;
    }
  };

  const displayedRecommendations = detailed ? recommendations : recommendations.slice(0, 3);

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📋</span>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Rekomendasi</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {recommendations.length} rekomendasi untukmu
            </p>
          </div>
        </div>
        {!detailed && recommendations.length > 3 && (
          <Button variant="ghost" size="sm" onClick={() => {}}>
            Lihat semua →
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {displayedRecommendations.map((rec, index) => (
          <div
            key={index}
            className={cn(
              'p-4 rounded-xl border-2 transition-all cursor-pointer',
              getUrgencyColor(rec.urgency),
              expandedRecommendation === String(index) && 'shadow-md'
            )}
            onClick={() => setExpandedRecommendation(
              expandedRecommendation === String(index) ? null : String(index)
            )}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{getTypeIcon(rec.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h5 className="font-semibold text-gray-900 dark:text-white">{rec.title}</h5>
                  <Badge variant={getUrgencyBadge(rec.urgency)} size="xs">
                    {rec.urgency}
                  </Badge>
                  <Badge variant="secondary" size="xs">
                    {rec.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{rec.description}</p>

                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>💡 {rec.reason}</span>
                </div>

                {rec.tags && rec.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {rec.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" size="xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {expandedRecommendation === String(index) && (
                  <div className="mt-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        rec.action.onClick?.();
                      }}
                    >
                      {rec.action.label}
                    </Button>
                  </div>
                )}

                {expandedRecommendation !== String(index) && (
                  <button className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Klik untuk aksi
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
