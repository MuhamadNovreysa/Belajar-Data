'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/helpers';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { Alert } from '@/components/ui/Alert';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const faqCategories = [
    { id: 'all', label: '📋 Semua' },
    { id: 'getting_started', label: '🚀 Memulai' },
    { id: 'learning', label: '📚 Belajar' },
    { id: 'progress', label: '📊 Progress' },
    { id: 'projects', label: '📋 Projects' },
    { id: 'technical', label: '💻 Teknis' },
  ];

  const faqs = [
    {
      id: '1',
      category: 'getting_started',
      question: 'Bagaimana cara memulai belajar?',
      answer: 'Kamu bisa mulai dengan mengunjungi halaman Learning dan pilih Bulan 1. Mulai dari hari pertama dan ikuti jadwal yang sudah disediakan. Setiap hari memiliki 8 sesi belajar dengan total 10 jam.',
    },
    {
      id: '2',
      category: 'getting_started',
      question: 'Apakah ini benar-benar gratis?',
      answer: 'Ya! Platform ini 100% gratis. Semua materi, project, dan tools bisa diakses tanpa biaya. Kamu hanya perlu laptop dan koneksi internet.',
    },
    {
      id: '3',
      category: 'learning',
      question: 'Berapa jam yang harus saya luangkan setiap hari?',
      answer: 'Target belajar adalah 10 jam per hari. Tapi kamu bisa menyesuaikan dengan kemampuanmu. Yang penting konsisten dan tidak skip hari.',
    },
    {
      id: '4',
      category: 'learning',
      question: 'Apa yang harus saya lakukan jika saya tertinggal?',
      answer: 'Jangan khawatir! Kamu bisa kembali ke hari sebelumnya dan mengejar ketertinggalan. Yang penting tetap konsisten dan jangan menyerah.',
    },
    {
      id: '5',
      category: 'progress',
      question: 'Bagaimana cara melacak progress saya?',
      answer: 'Kamu bisa melihat progress di halaman Progress. Di sana ada dashboard yang menampilkan progress harian, mingguan, bulanan, dan keseluruhan.',
    },
    {
      id: '6',
      category: 'progress',
      question: 'Apa itu streak dan bagaimana cara menjaganya?',
      answer: 'Streak adalah jumlah hari berturut-turut kamu belajar. Kamu bisa menjaga streak dengan belajar setiap hari minimal 1 jam. Semakin panjang streak, semakin banyak reward yang kamu dapat.',
    },
    {
      id: '7',
      category: 'projects',
      question: 'Berapa banyak project yang harus saya kerjakan?',
      answer: 'Ada 6 project yang harus kamu kerjakan, satu untuk setiap bulan. Project ini akan menjadi portofolio yang bisa kamu tunjukkan ke perusahaan.',
    },
    {
      id: '8',
      category: 'projects',
      question: 'Bagaimana cara submit project?',
      answer: 'Kamu bisa submit project di halaman Project. Upload file dan link yang diminta, lalu submit. Project akan direview dan kamu akan mendapatkan feedback.',
    },
    {
      id: '9',
      category: 'technical',
      question: 'Tools apa yang saya butuhkan?',
      answer: 'Kamu butuh: Microsoft Excel (atau alternatif), PostgreSQL/MySQL, Power BI Desktop, Python, dan Jupyter Notebook. Semua tools ini bisa didapatkan gratis.',
    },
    {
      id: '10',
      category: 'technical',
      question: 'Apakah data saya aman?',
      answer: 'Ya! Data progress disimpan di localStorage browser kamu. Tidak ada data yang dikirim ke server manapun. Kamu bisa export data sebagai backup.',
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            ❓ Pusat Bantuan
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <Input
            placeholder="🔍 Cari pertanyaan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="lg"
            className="text-center"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {faqCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all border-2',
                selectedCategory === cat.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 text-gray-600 dark:text-gray-400'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Tidak ada hasil ditemukan
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Coba dengan kata kunci yang berbeda
              </p>
            </div>
          ) : (
            filteredFaqs.map((faq) => (
              <Card key={faq.id} variant="default" padding="lg">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-2xl">❓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {faq.answer}
                    </p>
                    <Badge variant="secondary" size="xs" className="mt-2">
                      {faqCategories.find(c => c.id === faq.category)?.label || faq.category}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Still Need Help */}
        <div className="mt-12 text-center p-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
          <h3 className="text-xl font-bold text-white">Masih butuh bantuan?</h3>
          <p className="text-white/80 mt-2">
            Hubungi tim support kami untuk bantuan lebih lanjut
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <Button variant="light" size="md" className="text-blue-600 font-semibold">
              📧 Email Support
            </Button>
            <Button variant="light" size="md" className="text-blue-600 font-semibold">
              💬 Live Chat
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
