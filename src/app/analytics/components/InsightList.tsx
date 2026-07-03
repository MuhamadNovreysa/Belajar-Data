'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AnalyticsInsight } from '@/lib/types/analytics.types';

interface InsightListProps {
  insights: AnalyticsInsight[];
  detailed?: boolean;
}

export function InsightList({ insights, detailed = false }: InsightListProps) {
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  if (insights.length === 0) {
    return (
      <Card variant="default" padding="lg">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Insights</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Belum ada insight yang tersedia
            </p>
          </div>
        </div>
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          📊 Terus belajar untuk mendapatkan insight!
        </div>
      </Card>
    );
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'positive': return '🌟';
      case 'warning': return '⚠️';
      case 'negative': return '❌';
      case 'opportunity': return '💡';
      case 'achievement': return '🏆';
      case 'suggestion': return '💭';
      default: return 'ℹ️';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'positive': return 'border-green-500 bg-green-50 dark:bg-green-950/30';
      case 'warning': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30';
      case 'negative': return 'border-red-500 bg-red-50 dark:bg-red-950/30';
      case 'opportunity': return 'border-blue-500 bg-blue-50 dark:bg-blue-950/30';
      case 'achievement': return 'border-purple-500 bg-purple-50 dark:bg-purple-950/30';
      case 'suggestion': return 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30';
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/30';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'danger' as const;
      case 'high': return 'warning' as const;
      case 'medium': return 'primary' as const;
      default: return 'secondary' as const;
    }
  };

  const displayedInsights = detailed ? insights : insights.slice(0, 3);

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white">Insights</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {insights.length} insight ditemukan
            </p>
          </div>
        </div>
        {!detailed && insights.length > 3 && (
          <Button variant="ghost" size="sm" onClick={() => {}}>
            Lihat semua →
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {displayedInsights.map((insight) => (
          <div
            key={insight.id}
            className={cn(
              'p-4 rounded-xl border-2 transition-all cursor-pointer',
              getInsightColor(insight.type),
              expandedInsight === insight.id && 'shadow-md'
            )}
            onClick={() => setExpandedInsight(expandedInsight === insight.id ? null : insight.id)}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{getInsightIcon(insight.type)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h5 className="font-semibold text-gray-900 dark:text-white">{insight.title}</h5>
                  <Badge variant={getSeverityBadge(insight.severity)} size="xs">
                    {insight.severity}
                  </Badge>
                  <Badge variant="secondary" size="xs">
                    {insight.category}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{insight.description}</p>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>📊 {insight.metric}: {insight.value.toFixed(1)}</span>
                  <span>🎯 Target: {insight.benchmark.toFixed(1)}</span>
                  <span className={cn(
                    'font-medium',
                    insight.difference > 0 ? 'text-green-600' : 'text-red-600'
                  )}>
                    {insight.difference > 0 ? '↑' : '↓'} {Math.abs(insight.percentageDifference).toFixed(1)}%
                  </span>
                </div>

                {expandedInsight === insight.id && (
                  <div className="mt-3 space-y-2">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300">💡 Rekomendasi</h6>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{insight.recommendation}</p>
                    </div>

                    {insight.actionItems && insight.actionItems.length > 0 && (
                      <div className="space-y-1">
                        <h6 className="text-xs font-medium text-gray-500 dark:text-gray-400">📋 Action Items:</h6>
                        {insight.actionItems.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded-lg text-sm">
                            <span className="text-gray-700 dark:text-gray-300">{item.action}</span>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  item.priority === 'critical' ? 'danger' :
                                  item.priority === 'high' ? 'warning' : 'primary'
                                }
                                size="xs"
                              >
                                {item.priority}
                              </Badge>
                              <span className="text-xs text-gray-400">{item.estimatedEffort}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {expandedInsight !== insight.id && (
                  <button className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Klik untuk detail
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
