'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useProgressContext } from '@/app/providers/ProgressProvider';
import { PROJECTS_DATA, PROJECT_TEMPLATES } from '@/lib/data/projects';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Tabs } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { Alert } from '@/components/ui/Alert';
import { ProjectCard } from '@/components/shared/ProjectCard';
import { StatsCard } from '@/components/shared/StatsCard';

export default function ProjectsPage() {
  const { progress } = useProgressContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [monthFilter, setMonthFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('my_projects');

  const statusOptions = [
    { value: 'all', label: 'Semua Status' },
    { value: 'not_started', label: '⏳ Belum Dimulai' },
    { value: 'planning', label: '📝 Perencanaan' },
    { value: 'in_progress', label: '🔄 Sedang Dikerjakan' },
    { value: 'reviewing', label: '👀 Sedang Ditinjau' },
    { value: 'submitted', label: '📤 Dikirim' },
    { value: 'approved', label: '✅ Disetujui' },
    { value: 'rejected', label: '❌ Ditolak' },
    { value: 'revision_needed', label: '🔄 Revisi' },
  ];

  const difficultyOptions = [
    { value: 'all', label: 'Semua Level' },
    { value: 'easy', label: '🟢 Mudah' },
    { value: 'medium', label: '🟡 Sedang' },
    { value: 'hard', label: '🟠 Sulit' },
    { value: 'expert', label: '🔴 Expert' },
  ];

  const monthOptions = [
    { value: 'all', label: 'Semua Bulan' },
    ...Array.from({ length: 6 }, (_, i) => ({
      value: String(i + 1),
      label: `Bulan ${i + 1}`,
    })),
  ];

  const projectStats = useMemo(() => {
    if (!progress) {
      return {
        total: PROJECTS_DATA.length,
        completed: 0,
        inProgress: 0,
        approved: 0,
      };
    }

    const projectIds = PROJECTS_DATA.map(p => p.id);
    let completed = 0;
    let inProgress = 0;
    let approved = 0;

    // Cek progress dari daily entries untuk project
    const dailyEntries = Object.values(progress.daily);
    dailyEntries.forEach((day) => {
      if (day.project?.projectId) {
        const project = PROJECTS_DATA.find(p => p.id === parseInt(day.project!.projectId));
        if (project) {
          if (day.project.status === 'approved') approved++;
          if (day.project.status === 'completed' || day.project.status === 'approved') completed++;
          if (day.project.status === 'in_progress') inProgress++;
        }
      }
    });

    return {
      total: PROJECTS_DATA.length,
      completed,
      inProgress,
      approved,
    };
  }, [progress]);

  const filteredProjects = useMemo(() => {
    let projects = PROJECTS_DATA;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      projects = projects.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.skillsTested.some(s => s.toLowerCase().includes(query)) ||
        p.toolsUsed.some(t => t.toLowerCase().includes(query))
      );
    }

    if (statusFilter !== 'all') {
      // Simulasi filter status dari progress
      projects = projects.filter((p) => {
        const dayProgress = progress?.daily[`project_${p.id}`];
        const status = dayProgress?.project?.status || 'not_started';
        return status === statusFilter;
      });
    }

    if (difficultyFilter !== 'all') {
      projects = projects.filter(p => p.difficulty === difficultyFilter);
    }

    if (monthFilter !== 'all') {
      projects = projects.filter(p => p.month === parseInt(monthFilter));
    }

    return projects;
  }, [searchQuery, statusFilter, difficultyFilter, monthFilter, progress]);

  const templates = PROJECT_TEMPLATES;

  const tabs = [
    {
      id: 'my_projects',
      label: `📊 Project Saya (${filteredProjects.length})`,
      content: (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
              label="Total Project"
              value={projectStats.total}
              icon={<span className="text-2xl">📊</span>}
              color="blue"
            />
            <StatsCard
              label="Selesai"
              value={projectStats.completed}
              icon={<span className="text-2xl">✅</span>}
              color="green"
            />
            <StatsCard
              label="Sedang Dikerjakan"
              value={projectStats.inProgress}
              icon={<span className="text-2xl">🔄</span>}
              color="yellow"
            />
            <StatsCard
              label="Disetujui"
              value={projectStats.approved}
              icon={<span className="text-2xl">🏆</span>}
              color="purple"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="🔍 Cari project, skill, atau tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="default"
                size="md"
              />
            </div>
            <div className="flex gap-4">
              <Select
                options={statusOptions}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                placeholder="Status"
                size="md"
                className="w-40"
              />
              <Select
                options={difficultyOptions}
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                placeholder="Level"
                size="md"
                className="w-40"
              />
              <Select
                options={monthOptions}
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                placeholder="Bulan"
                size="md"
                className="w-40"
              />
            </div>
          </div>

          {/* Project Grid */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Tidak ada project yang ditemukan
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredProjects.map((project, index) => {
                const dayProgress = progress?.daily[`project_${project.id}`];
                const status = dayProgress?.project?.status || 'not_started';
                const progressValue = dayProgress?.project?.completionPercentage || 0;

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/projects/${project.id}`}>
                      <ProjectCard
                        id={project.id}
                        title={project.title}
                        description={project.description}
                        month={project.month}
                        status={status as any}
                        skills={project.skillsTested}
                        tools={project.toolsUsed}
                        deliverables={project.deliverables}
                        estimatedTime={project.estimatedTime}
                        difficulty={project.difficulty as any}
                        progress={progressValue}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'templates',
      label: '📋 Template Project',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  hover="lift"
                  className="h-full border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl">
                      📋
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {template.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {template.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="secondary" size="sm">
                          {template.tools.join(', ')}
                        </Badge>
                        <Badge
                          variant={
                            template.difficulty === 'easy' ? 'success' :
                            template.difficulty === 'medium' ? 'warning' :
                            template.difficulty === 'hard' ? 'danger' : 'secondary'
                          }
                          size="sm"
                        >
                          {template.difficulty}
                        </Badge>
                      </div>
                      <div className="mt-3">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => window.open(template.datasetUrl, '_blank')}
                        >
                          📊 Lihat Dataset
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'resources',
      label: '📚 Resources',
      content: (
        <div className="space-y-6">
          <Card variant="default" padding="lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              📚 Dataset Recommendations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS_DATA.map((project) => (
                <div key={project.id} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {project.title}
                    </span>
                    <Badge variant="secondary" size="xs">
                      Bulan {project.month}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {project.dataset}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.toolsUsed.map((tool) => (
                      <Badge key={tool} variant="primary" size="xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="default" padding="lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              💡 Tips Mengerjakan Project
            </h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 📖 Baca dan pahami problem statement dengan baik</li>
              <li>• 📊 Eksplorasi dataset sebelum mulai analisis</li>
              <li>• 📝 Buat rencana dan breakdown project menjadi task kecil</li>
              <li>• 🔄 Iterasi dan perbaiki terus hasil analisis</li>
              <li>• 📂 Dokumentasikan setiap langkah dengan baik</li>
              <li>• 🎯 Fokus pada insight yang actionable</li>
              <li>• 💬 Diskusikan dengan komunitas jika stuck</li>
              <li>• 📤 Submit tepat waktu dan lengkap</li>
            </ul>
          </Card>
        </div>
      ),
    },
  ];

  if (false) {
    return <ProjectsLoading />;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              📊 Projects
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Kerjakan project nyata untuk membangun portofolio
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="lg">
              {projectStats.completed}/{projectStats.total} selesai
            </Badge>
          </div>
        </div>

        <Tabs
          tabs={tabs}
          defaultTab="my_projects"
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="box"
          size="md"
        />
      </div>
    </div>
  );
}

function ProjectsLoading() {
  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <Skeleton variant="text" width="300px" height="32px" />
            <Skeleton variant="text" width="200px" height="20px" className="mt-1" />
          </div>
          <Skeleton variant="rect" width="120px" height="36px" className="rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="100px" className="rounded-xl" />
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <Skeleton variant="rect" width="100%" height="44px" className="rounded-lg" />
          <Skeleton variant="rect" width="160px" height="44px" className="rounded-lg" />
          <Skeleton variant="rect" width="160px" height="44px" className="rounded-lg" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="180px" className="rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
