'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { RoadmapTimeline } from '@/components/shared/RoadmapTimeline';
import { StatsCard } from '@/components/shared/StatsCard';
import { MONTH_NAMES, MONTH_SUBTITLES } from '@/lib/utils/constants';

const features = [
  {
    icon: '📚',
    title: 'Materi Super Lengkap',
    description: '180 hari belajar dengan 10 jam/hari. Dari Excel sampai Python, semua ada!',
  },
  {
    icon: '🎯',
    title: 'Project Nyata',
    description: '6 project end-to-end yang bisa langsung kamu tunjukkan ke perusahaan.',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description: 'Pantau perkembanganmu setiap hari dengan dashboard interaktif.',
  },
  {
    icon: '🔥',
    title: 'Streak & Gamification',
    description: 'Tetap termotivasi dengan streak, badge, dan level yang bisa dinaikkan.',
  },
  {
    icon: '💡',
    title: 'Insight & Analytics',
    description: 'Dapatkan insight tentang kelemahan dan rekomendasi belajar.',
  },
  {
    icon: '🎓',
    title: 'Siap Kerja',
    description: 'Langsung siap melamar sebagai Data Analyst setelah 6 bulan.',
  },
];

const stats = [
  { label: 'Hari Belajar', value: '180', icon: '📅' },
  { label: 'Jam Belajar', value: '1.800+', icon: '⏰' },
  { label: 'Project', value: '6', icon: '📊' },
  { label: 'Tools', value: '5+', icon: '🛠️' },
];

const testimonials = [
  {
    name: 'Andi Saputra',
    role: 'Data Analyst di Tokopedia',
    image: '/avatars/andi.jpg',
    quote: 'Program ini benar-benar mengubah karir saya. Dari nol sampai diterima sebagai Data Analyst dalam 6 bulan!',
  },
  {
    name: 'Siti Rahma',
    role: 'Data Analyst di Gojek',
    image: '/avatars/siti.jpg',
    quote: 'Materinya sangat lengkap dan terstruktur. Saya jadi percaya diri untuk melamar kerja.',
  },
  {
    name: 'Budi Santoso',
    role: 'Fresh Graduate',
    image: '/avatars/budi.jpg',
    quote: 'Modal saya cuma laptop dan kemauan keras. Sekarang saya sudah punya portofolio yang keren!',
  },
];

export default function HomePage() {
  const roadmapMonths = [
    {
      month: 1,
      title: 'Excel & Statistika',
      subtitle: 'Menguasai Excel dari Nol Sampai Mahir',
      status: 'not_started' as const,
      progress: 0,
      totalDays: 30,
      completedDays: 0,
      skills: ['Excel', 'Statistika Deskriptif', 'Dashboard'],
      tools: ['Microsoft Excel', 'Google Sheets'],
    },
    {
      month: 2,
      title: 'SQL & Database',
      subtitle: 'Belajar Mengambil dan Mengelola Data',
      status: 'not_started' as const,
      progress: 0,
      totalDays: 30,
      completedDays: 0,
      skills: ['SQL', 'Database', 'Data Manipulation'],
      tools: ['PostgreSQL', 'MySQL'],
    },
    {
      month: 3,
      title: 'Power BI & Visualisasi',
      subtitle: 'Membuat Dashboard Interaktif',
      status: 'not_started' as const,
      progress: 0,
      totalDays: 30,
      completedDays: 0,
      skills: ['Power BI', 'DAX', 'Data Visualization'],
      tools: ['Power BI Desktop'],
    },
    {
      month: 4,
      title: 'Python untuk Data',
      subtitle: 'Otomatisasi dan Analisis Data',
      status: 'not_started' as const,
      progress: 0,
      totalDays: 30,
      completedDays: 0,
      skills: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
      tools: ['Python', 'Jupyter Notebook'],
    },
    {
      month: 5,
      title: 'Portfolio & Project',
      subtitle: 'Membangun Portofolio untuk Menunjukkan Skill',
      status: 'not_started' as const,
      progress: 0,
      totalDays: 30,
      completedDays: 0,
      skills: ['Project Management', 'Documentation', 'GitHub'],
      tools: ['Excel', 'SQL', 'Power BI', 'Python', 'GitHub'],
    },
    {
      month: 6,
      title: 'Persiapan Kerja',
      subtitle: 'Siapkan Diri untuk Lolos Interview',
      status: 'not_started' as const,
      progress: 0,
      totalDays: 30,
      completedDays: 0,
      skills: ['CV Writing', 'Interview Prep', 'Networking'],
      tools: ['LinkedIn', 'CV'],
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge variant="gradient" size="lg" className="mb-4">
              🚀 Mulai Karir Data Analyst
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Dari Nol Sampai Jadi{' '}
              <span className="text-yellow-300">Data Analyst</span>
              {' '}dalam 6 Bulan
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl">
              Program belajar super intensif 6 bulan dengan 180 hari materi, 10 jam/hari, 
              dan 6 project nyata. Langsung siap melamar kerja!
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/learning">
                <Button variant="gradient" size="lg" className="text-white">
                  🚀 Mulai Belajar Sekarang
                </Button>
              </Link>
              <Link href="#roadmap">
                <Button variant="light" size="lg">
                  📋 Lihat Roadmap
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-white">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white/50 dark:bg-gray-900/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatsCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                icon={<span className="text-2xl">{stat.icon}</span>}
                color="blue"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge variant="primary" size="lg" className="mb-4">
              ✨ Kenapa Harus Pilih Ini?
            </Badge>
            <h2 className="section-title">Belajar Data Analyst dengan Cara yang Tepat</h2>
            <p className="section-subtitle">
              Sistem belajar terstruktur, materi super lengkap, dan langsung praktik dengan project nyata.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  hover="lift"
                  className="h-full border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge variant="primary" size="lg" className="mb-4">
              🗺️ 6 Bulan Menuju Data Analyst
            </Badge>
            <h2 className="section-title">Roadmap Pembelajaran</h2>
            <p className="section-subtitle">
              Ikuti roadmap ini step by step, dari dasar sampai mahir.
            </p>
          </motion.div>

          <RoadmapTimeline
            months={roadmapMonths}
            variant="detailed"
            orientation="vertical"
          />

          <div className="mt-12 text-center">
            <Link href="/learning">
              <Button variant="primary" size="lg">
                📚 Lihat Semua Materi
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge variant="primary" size="lg" className="mb-4">
              💬 Testimoni
            </Badge>
            <h2 className="section-title">Apa Kata Mereka?</h2>
            <p className="section-subtitle">
              Mereka sudah berhasil, sekarang giliran kamu!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  hover="lift"
                  className="h-full"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="mt-3 text-yellow-400">⭐⭐⭐⭐⭐</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Siap Menjadi Data Analyst?
            </h2>
            <p className="mt-4 text-white/80 text-lg max-w-2xl mx-auto">
              Mulai perjalananmu sekarang. 6 bulan dari sekarang, kamu bisa jadi Data Analyst!
            </p>
            <div className="mt-8">
              <Link href="/learning">
                <Button variant="light" size="xl" className="text-blue-600 font-semibold">
                  🚀 Mulai Sekarang Gratis!
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-white/60 text-sm">
              ✅ 100% Gratis • ✅ Tanpa Login • ✅ Langsung Belajar
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
