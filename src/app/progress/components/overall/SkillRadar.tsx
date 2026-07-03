'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressData } from '@/lib/types';

interface SkillRadarProps {
  progress: ProgressData | null;
}

export function SkillRadar({ progress }: SkillRadarProps) {
  const skillData = useMemo(() => {
    if (!progress) {
      return [
        { name: 'Excel', value: 0, max: 100 },
        { name: 'SQL', value: 0, max: 100 },
        { name: 'Power BI', value: 0, max: 100 },
        { name: 'Python', value: 0, max: 100 },
        { name: 'Statistika', value: 0, max: 100 },
        { name: 'Visualisasi', value: 0, max: 100 },
      ];
    }

    const dailyEntries = Object.values(progress.daily);

    // Hitung skill dari progress
    const skills = {
      Excel: { total: 0, count: 0 },
      SQL: { total: 0, count: 0 },
      'Power BI': { total: 0, count: 0 },
      Python: { total: 0, count: 0 },
      Statistika: { total: 0, count: 0 },
      Visualisasi: { total: 0, count: 0 },
    };

    dailyEntries.forEach((day) => {
      // Dari subtopics
      day.subtopics.forEach((subtopic) => {
        const skill = Object.keys(skills).find(s =>
          subtopic.subtopicName.toLowerCase().includes(s.toLowerCase()) ||
          subtopic.subtopicName.includes(s)
        );
        if (skill) {
          skills[skill as keyof typeof skills].total += subtopic.understandingLevel || 0;
          skills[skill as keyof typeof skills].count++;
        }
      });

      // Dari sessions
      day.sessions.forEach((session) => {
        const skill = Object.keys(skills).find(s =>
          session.title.toLowerCase().includes(s.toLowerCase()) ||
          session.title.includes(s)
        );
        if (skill) {
          skills[skill as keyof typeof skills].total += session.understandingLevel || 0;
          skills[skill as keyof typeof skills].count++;
        }
      });
    });

    return Object.entries(skills).map(([name, data]) => ({
      name,
      value: data.count > 0 ? Math.min((data.total / data.count) * 10, 100) : 0,
      max: 100,
    }));
  }, [progress]);

  const getLevel = (value: number) => {
    if (value >= 80) return { label: 'Expert', color: 'text-purple-600' };
    if (value >= 60) return { label: 'Mahir', color: 'text-blue-600' };
    if (value >= 40) return { label: 'Menengah', color: 'text-yellow-600' };
    if (value >= 20) return { label: 'Pemula', color: 'text-orange-600' };
    return { label: 'Belum', color: 'text-gray-400' };
  };

  const maxValue = Math.max(...skillData.map(s => s.value), 1);
  const radius = 120;
  const centerX = 150;
  const centerY = 150;

  const getPoint = (index: number, value: number) => {
    const angle = (index / skillData.length) * 2 * Math.PI - Math.PI / 2;
    const r = (value / maxValue) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  const points = skillData.map((skill, index) => getPoint(index, skill.value));
  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <Card variant="default" padding="lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          📊 Radar Skill
        </h3>
        <Badge variant="secondary" size="sm">
          {skillData.filter(s => s.value > 0).length} skill aktif
        </Badge>
      </div>

      <div className="flex justify-center">
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Background rings */}
          {[0.25, 0.5, 0.75, 1].map((level) => (
            <polygon
              key={level}
              points={skillData.map((_, index) => {
                const angle = (index / skillData.length) * 2 * Math.PI - Math.PI / 2;
                const r = level * radius;
                return `${centerX + r * Math.cos(angle)},${centerY + r * Math.sin(angle)}`;
              }).join(' ')}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {skillData.map((_, index) => {
            const angle = (index / skillData.length) * 2 * Math.PI - Math.PI / 2;
            return (
              <line
                key={index}
                x1={centerX}
                y1={centerY}
                x2={centerX + radius * Math.cos(angle)}
                y2={centerY + radius * Math.sin(angle)}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            );
          })}

          {/* Skill polygon */}
          <polygon
            points={polygonPoints}
            fill="rgba(59, 130, 246, 0.2)"
            stroke="#3B82F6"
            strokeWidth="2"
          />

          {/* Skill labels */}
          {skillData.map((skill, index) => {
            const angle = (index / skillData.length) * 2 * Math.PI - Math.PI / 2;
            const labelRadius = radius + 25;
            const x = centerX + labelRadius * Math.cos(angle);
            const y = centerY + labelRadius * Math.sin(angle);
            const level = getLevel(skill.value);

            return (
              <g key={skill.name}>
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-medium fill-gray-700 dark:fill-gray-300"
                >
                  {skill.name}
                </text>
                <circle
                  cx={getPoint(index, skill.value).x}
                  cy={getPoint(index, skill.value).y}
                  r="4"
                  fill="#3B82F6"
                />
                <text
                  x={getPoint(index, skill.value).x}
                  y={getPoint(index, skill.value).y - 12}
                  textAnchor="middle"
                  className={cn('text-[10px] font-bold', level.color)}
                >
                  {Math.round(skill.value)}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
        {skillData.map((skill) => {
          const level = getLevel(skill.value);
          return (
            <div key={skill.name} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
              <span className="text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
              <Badge variant="secondary" size="xs" className={level.color}>
                {level.label} ({Math.round(skill.value)}%)
              </Badge>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
