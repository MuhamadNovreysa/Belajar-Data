'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RESOURCES } from '@/lib/data/resources';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Tabs } from '@/components/ui/Tabs';
import { Skeleton } from '@/components/ui/Skeleton';
import { ResourceCard } from '@/components/shared/ResourceCard';
import { StatsCard } from '@/components/shared/StatsCard';

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const typeOptions = [
    { value: 'all', label: 'Semua Tipe' },
    { value: 'video', label: '🎬 Video' },
    { value: 'article', label: '📄 Artikel' },
    { value: 'documentation', label: '📚 Dokumentasi' },
    { value: 'interactive', label: '💻 Interaktif' },
    { value: 'dataset', label: '📊 Dataset' },
    { value: 'cheat_sheet', label: '📋 Cheat Sheet' },
    { value: 'course', label: '🎓 Kursus' },
    { value: 'community', label: '👥 Komunitas' },
  ];

  const difficultyOptions = [
    { value: 'all', label: 'Semua Level' },
    { value: 'pemula', label: '🟢 Pemula' },
    { value: 'menengah', label: '🟡 Menengah' },
    { value: 'lanjutan', label: '🟠 Lanjutan' },
  ];

  const categoryOptions = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'excel', label: '📗 Excel' },
    { value: 'sql', label: '📘 SQL' },
    { value: 'powerbi', label: '📙 Power BI' },
    { value: 'python', label: '📕 Python' },
  ];

  const allResources = useMemo(() => {
    const resources: any[] = [];

    // Videos
    Object.entries(RESOURCES.videos).forEach(([category, videos]) => {
      videos.forEach((video: any) => {
        resources.push({
          ...video,
          category,
          type: 'video',
          id: `video-${video.id}`,
        });
      });
    });

    // Articles
    Object.entries(RESOURCES.articles).forEach(([category, articles]) => {
      articles.forEach((article: any) => {
        resources.push({
          ...article,
          category,
          type: 'article',
          id: `article-${article.id}`,
        });
      });
    });

    // Documentations
    Object.entries(RESOURCES.documentations).forEach(([category, docs]) => {
      docs.forEach((doc: any) => {
        resources.push({
          ...doc,
          category,
          type: 'documentation',
          id: `doc-${doc.id}`,
        });
      });
    });

    // Interactives
    Object.entries(RESOURCES.interactives).forEach(([category, interactives]) => {
      interactives.forEach((interactive: any) => {
        resources.push({
          ...interactive,
          category,
          type: 'interactive',
          id: `interactive-${interactive.id}`,
        });
      });
    });

    // Datasets
    RESOURCES.datasets.forEach((dataset: any) => {
      resources.push({
        ...dataset,
        category: 'dataset',
        type: 'dataset',
        id: `dataset-${dataset.id}`,
      });
    });

    // Cheat Sheets
    RESOURCES.cheatSheets.forEach((sheet: any) => {
      resources.push({
        ...sheet,
        category: 'cheat_sheet',
        type: 'cheat_sheet',
        id: `cheat-${sheet.id}`,
      });
    });

    // Courses
    RESOURCES.courses.forEach((course: any) => {
      resources.push({
        ...course,
        category: 'course',
        type: 'course',
        id: `course-${course.id}`,
      });
    });

    // Communities
    RESOURCES.communities.forEach((community: any) => {
      resources.push({
        ...community,
        category: 'community',
        type: 'community',
        id: `community-${community.id}`,
      });
    });

    return resources;
  }, []);

  const filteredResources = useMemo(() => {
    let filtered = allResources;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(r =>
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.category?.toLowerCase().includes(query) ||
        r.tags?.some((t: string) => t.toLowerCase().includes(query))
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(r => r.type === typeFilter);
    }

    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(r => r.difficulty === difficultyFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(r => r.category === categoryFilter);
    }

    return filtered;
  }, [allResources, searchQuery, typeFilter, difficultyFilter, categoryFilter]);

  const stats = useMemo(() => {
    return {
      total: allResources.length,
      videos: allResources.filter(r => r.type === 'video').length,
      articles: allResources.filter(r => r.type === 'article').length,
      documentations: allResources.filter(r => r.type === 'documentation').length,
      interactives: allResources.filter(r => r.type === 'interactive').length,
      datasets: allResources.filter(r => r.type === 'dataset').length,
      cheatSheets: allResources.filter(r => r.type === 'cheat_sheet').length,
      courses: allResources.filter(r => r.type === 'course').length,
      communities: allResources.filter(r => r.type === 'community').length,
    };
  }, [allResources]);

  const tabs = [
    {
      id: 'all',
      label: `📚 Semua (${filteredResources.length})`,
      content: (
        <div className="space-y-4">
          {filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Tidak ada resource yang ditemukan
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Coba ubah filter atau kata kunci pencarian
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredResources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.02 }}
                >
                  <ResourceCard
                    id={resource.id}
                    title={resource.title}
                    description={resource.description}
                    url={resource.url}
                    type={resource.type}
                    platform={resource.platform}
                    difficulty={resource.difficulty || 'pemula'}
                    duration={resource.duration}
                    channel={resource.channel}
                    readTime={resource.readTime}
                    isRequired={resource.isRequired || false}
                    tags={resource.tags || resource.keywords || []}
                    language={resource.language || 'Indonesia'}
                    isCompleted={false}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'video',
      label: `🎬 Video (${stats.videos})`,
      content: (
        <div className="grid grid-cols-1 gap-4">
          {allResources.filter(r => r.type === 'video').map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <ResourceCard
                id={resource.id}
                title={resource.title}
                description={resource.description}
                url={resource.url}
                type={resource.type}
                platform={resource.platform}
                difficulty={resource.difficulty || 'pemula'}
                duration={resource.duration}
                channel={resource.channel}
                isRequired={resource.isRequired || false}
                tags={resource.tags || []}
                language={resource.language || 'Indonesia'}
                isCompleted={false}
              />
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: 'article',
      label: `📄 Artikel (${stats.articles})`,
      content: (
        <div className="grid grid-cols-1 gap-4">
          {allResources.filter(r => r.type === 'article').map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <ResourceCard
                id={resource.id}
                title={resource.title}
                description={resource.description}
                url={resource.url}
                type={resource.type}
                platform={resource.platform}
                difficulty={resource.difficulty || 'pemula'}
                readTime={resource.readTime}
                isRequired={resource.isRequired || false}
                tags={resource.tags || resource.keyTakeaways || []}
                language={resource.language || 'Indonesia'}
                isCompleted={false}
              />
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: 'documentation',
      label: `📚 Dokumentasi (${stats.documentations})`,
      content: (
        <div className="grid grid-cols-1 gap-4">
          {allResources.filter(r => r.type === 'documentation').map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <ResourceCard
                id={resource.id}
                title={resource.title}
                description={resource.description}
                url={resource.url}
                type={resource.type}
                platform={resource.platform}
                difficulty={resource.difficulty || 'pemula'}
                isRequired={resource.isRequired || false}
                tags={resource.tags || resource.focusSections || []}
                language={resource.language || 'Inggris'}
                isCompleted={false}
              />
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: 'interactive',
      label: `💻 Interaktif (${stats.interactives})`,
      content: (
        <div className="grid grid-cols-1 gap-4">
          {allResources.filter(r => r.type === 'interactive').map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <ResourceCard
                id={resource.id}
                title={resource.title}
                description={resource.description}
                url={resource.url}
                type={resource.type}
                platform={resource.platform}
                difficulty={resource.difficulty || 'pemula'}
                isRequired={resource.isRequired || false}
                tags={resource.tags || [resource.type]}
                language={resource.language || 'Indonesia'}
                isCompleted={false}
              />
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      id: 'dataset',
      label: `📊 Dataset (${stats.datasets})`,
      content: (
        <div className="grid grid-cols-1 gap-4">
          {allResources.filter(r => r.type === 'dataset').map((resource, index) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.02 }}
            >
              <ResourceCard
                id={resource.id}
                title={resource.title}
                description={resource.description}
                url={resource.url}
                type={resource.type}
                platform={resource.platform}
                difficulty={resource.difficulty || 'pemula'}
                isRequired={resource.isRequired || false}
                tags={resource.tags || []}
                language={resource.language || 'Indonesia'}
                isCompleted={false}
              />
            </motion.div>
          ))}
        </div>
      ),
    },
  ];

  if (false) {
    return <ResourcesLoading />;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              📚 Resource Library
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Kumpulan resource belajar gratis untuk Data Analyst
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="lg">
              {stats.total} resource tersedia
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            label="Video"
            value={stats.videos}
            icon={<span className="text-2xl">🎬</span>}
            color="red"
          />
          <StatsCard
            label="Artikel"
            value={stats.articles}
            icon={<span className="text-2xl">📄</span>}
            color="blue"
          />
          <StatsCard
            label="Dokumentasi"
            value={stats.documentations}
            icon={<span className="text-2xl">📚</span>}
            color="purple"
          />
          <StatsCard
            label="Interaktif"
            value={stats.interactives}
            icon={<span className="text-2xl">💻</span>}
            color="green"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="🔍 Cari resource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="default"
              size="md"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select
              options={typeOptions}
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              placeholder="Tipe"
              size="md"
              className="w-36"
            />
            <Select
              options={difficultyOptions}
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              placeholder="Level"
              size="md"
              className="w-36"
            />
            <Select
              options={categoryOptions}
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              placeholder="Kategori"
              size="md"
              className="w-36"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={tabs}
          defaultTab="all"
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="box"
          size="md"
        />
      </div>
    </div>
  );
}

function ResourcesLoading() {
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
            <Skeleton key={i} variant="card" height="80px" className="rounded-xl" />
          ))}
        </div>

        <div className="flex gap-4 mb-6">
          <Skeleton variant="rect" width="100%" height="44px" className="rounded-lg" />
          <Skeleton variant="rect" width="140px" height="44px" className="rounded-lg" />
          <Skeleton variant="rect" width="140px" height="44px" className="rounded-lg" />
        </div>

        <div className="flex gap-2 mb-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} variant="rect" width="120px" height="40px" className="rounded-lg" />
          ))}
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} variant="card" height="120px" className="rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
