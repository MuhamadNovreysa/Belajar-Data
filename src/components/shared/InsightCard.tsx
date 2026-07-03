'use client';

import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export interface InsightCardProps {
  type: 'positive' | 'negative' | 'neutral' | 'opportunity' | 'warning' | 'suggestion' | 'achievement';
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  recommendation?: string;
  actionItems?: {
    label: string;
    onClick: () => void;
  }[];
  className?: string;
}

export function InsightCard({
  type,
  title,
  description,
  severity = 'medium',
  recommendation,
  actionItems = [],
  className,
}: InsightCardProps) {
  const typeConfigs = {
    positive: {
      icon: '🌟',
      color: 'border-green-500 bg-green-50',
      badge: 'Positif',
      badgeVariant: 'success',
    },
    negative: {
      icon: '⚠️',
      color: 'border-red-500 bg-red-50',
      badge: 'Negatif',
      badgeVariant: 'danger',
    },
    neutral: {
      icon: 'ℹ️',
      color: 'border-gray-500 bg-gray-50',
      badge: 'Netral',
      badgeVariant: 'secondary',
    },
    opportunity: {
      icon: '💡',
      color: 'border-blue-500 bg-blue-50',
      badge: 'Peluang',
      badgeVariant: 'primary',
    },
    warning: {
      icon: '🚨',
      color: 'border-yellow-500 bg-yellow-50',
      badge: 'Peringatan',
      badgeVariant: 'warning',
    },
    suggestion: {
      icon: '💭',
      color: 'border-purple-500 bg-purple-50',
      badge: 'Saran',
      badgeVariant: 'info',
    },
    achievement: {
      icon: '🏆',
      color: 'border-yellow-500 bg-yellow-50',
      badge: 'Pencapaian',
      badgeVariant: 'primary',
    },
  };

  const severityLabels = {
    low: 'Rendah',
    medium: 'Sedang',
    high: 'Tinggi',
    critical: 'Kritis',
  };

  const severityColors = {
    low: 'text-green-600 bg-green-100',
    medium: 'text-yellow-600 bg-yellow-100',
    high: 'text-orange-600 bg-orange-100',
    critical: 'text-red-600 bg-red-100',
  };

  const config = typeConfigs[type];

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        'border-l-4',
        config.color,
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-2xl">
          {config.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <Badge variant={config.badgeVariant as any} size="sm">
              {config.badge}
            </Badge>
            {severity !== 'low' && (
              <Badge
                variant="secondary"
                size="sm"
                className={severityColors[severity]}
              >
                {severityLabels[severity]}
              </Badge>
            )}
          </div>

          <p className="text-sm text-gray-600 mt-1">{description}</p>

          {recommendation && (
            <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
              <span className="text-xs font-medium text-gray-500">💡 Rekomendasi:</span>
              <p className="text-sm text-gray-700 mt-0.5">{recommendation}</p>
            </div>
          )}

          {actionItems.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {actionItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.onClick}
                  className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default InsightCard;
