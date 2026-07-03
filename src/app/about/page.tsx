'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatsCard } from '@/components/shared/StatsCard';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Tim Data Analyst Learning',
      role: 'Creator & Developer',
      description: 'Membangun platform belajar data analyst dari nol',
    },
  ];

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

  const values = [
    {
      title: 'Akses Gratis untuk Semua',
      description: 'Percaya bahwa pendidikan berkualitas harus dapat diakses oleh semua orang tanpa terkecuali.',
    },
    {
      title: 'Belajar dengan Praktik',
      description: 'Teori tanpa praktik tidak cukup. Setiap materi diikuti dengan latihan dan project nyata.',
    },
    {
      title: 'Konsistensi adalah Kunci',
      description: 'Sukses datang dari konsistensi. Sistem streak dan gamifikasi membantu kamu tetap termotivasi.',
    },
    {
      title: 'Komunitas yang Mendukung',
      description: 'Belajar bersama lebih menyenangkan. Bergabunglah dengan komunitas data analyst Indonesia.',
    },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="primary" size="lg" className="mb-4">
            📖 Tentang Kami
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Data Analyst Learning
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mt-3">
            Platform pembelajaran Data Analyst dari nol sampai siap kerja dalam 6 bulan.
            Dibuat untuk membantu siapa saja yang ingin berkarir sebagai Data Analyst.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <StatsCard
            label="Hari Belajar"
            value="180"
            icon={<span className="text-2xl">📅</span>}
            color="blue"
          />
          <StatsCard
            label="Jam Belajar"
            value="1.800+"
            icon={<span className="text-2xl">⏰</span>}
            color="green"
          />
          <StatsCard
            label="Project"
            value="6"
            icon={<span className="text-2xl">📊</span>}
            color="purple"
          />
          <StatsCard
            label="Tools"
            value="5+"
            icon={<span className="text-2xl">🛠️</span>}
            color="yellow"
          />
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            ✨ Kenapa Harus Pilih Ini?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  variant="default"
                  padding="lg"
                  hover="lift"
                  className="h-full"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            💎 Nilai-nilai Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card variant="default" padding="lg" className="h-full border-l-4 border-l-blue-500">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            👥 Tim Pengembang
          </h2>
          <div className="flex justify-center">
            {teamMembers.map((member) => (
              <Card
                key={member.name}
                variant="elevated"
                padding="lg"
                className="max-w-sm text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-3xl text-white mx-auto">
                  👤
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mt-3">
                  {member.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">{member.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {member.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
          <h2 className="text-2xl font-bold text-white">
            Siap Menjadi Data Analyst?
          </h2>
          <p className="text-white/80 mt-2">
            Mulai perjalananmu sekarang. 6 bulan dari sekarang, kamu bisa jadi Data Analyst!
          </p>
          <div className="mt-4">
            <Link href="/learning">
              <Button variant="light" size="lg" className="text-blue-600 font-semibold">
                🚀 Mulai Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
