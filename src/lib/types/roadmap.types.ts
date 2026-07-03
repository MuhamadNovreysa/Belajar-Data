// ============================================================
// ROADMAP TYPES - Data 6 Bulan Pembelajaran Data Analyst
// ============================================================
// Digunakan untuk mendefinisikan struktur roadmap 6 bulan
// Setiap bulan memiliki 4-5 minggu, setiap minggu memiliki 7 hari
// ============================================================

/**
 * ============================================================
 * 1. RESOURCE TYPES (Materi Pendukung)
 * ============================================================
 */

/**
 * Tipe resource video dari YouTube atau platform video lainnya
 */
export interface VideoResource {
  /** ID unik video (contoh: "v1") */
  id: string;
  /** Judul video */
  title: string;
  /** URL lengkap video */
  url: string;
  /** Platform hosting video (YouTube, Vimeo, dll) */
  platform: string;
  /** Durasi video (format: "MM:SS" atau "HH:MM:SS") */
  duration: string;
  /** Nama channel/pembuat konten */
  channel: string;
  /** Deskripsi singkat isi video */
  description: string;
  /** Level kesulitan materi video */
  difficulty?: 'pemula' | 'menengah' | 'lanjutan';
  /** Bahasa video */
  language?: 'Indonesia' | 'Inggris' | 'Lainnya';
  /** Tanggal upload (opsional) */
  uploadedAt?: string;
  /** Jumlah view (opsional) */
  views?: number;
  /** Rating/like ratio (opsional) */
  rating?: number;
}

/**
 * Tipe resource artikel/bacaan
 */
export interface ArticleResource {
  /** ID unik artikel */
  id: string;
  /** Judul artikel */
  title: string;
  /** URL lengkap artikel */
  url: string;
  /** Platform/website artikel */
  platform: string;
  /** Deskripsi singkat isi artikel */
  description: string;
  /** Perkiraan waktu baca (dalam menit) */
  readTime?: number;
  /** Level kesulitan */
  difficulty?: 'pemula' | 'menengah' | 'lanjutan';
  /** Bahasa artikel */
  language?: 'Indonesia' | 'Inggris' | 'Lainnya';
  /** Penulis artikel (opsional) */
  author?: string;
  /** Tanggal publikasi (opsional) */
  publishedAt?: string;
}

/**
 * Tipe resource dokumentasi resmi
 */
export interface DocumentationResource {
  /** ID unik dokumentasi */
  id: string;
  /** Judul dokumentasi */
  title: string;
  /** URL lengkap dokumentasi */
  url: string;
  /** Platform/provider dokumentasi */
  platform: string;
  /** Deskripsi singkat */
  description: string;
  /** Versi dokumentasi (opsional) */
  version?: string;
  /** Bahasa dokumentasi */
  language?: 'Indonesia' | 'Inggris' | 'Lainnya';
}

/**
 * Tipe resource interaktif (simulasi, latihan online, dll)
 */
export interface InteractiveResource {
  /** ID unik resource */
  id: string;
  /** Judul resource */
  title: string;
  /** URL lengkap */
  url: string;
  /** Platform penyedia */
  platform: string;
  /** Deskripsi singkat */
  description: string;
  /** Jenis interaktif (simulasi, game, latihan, dll) */
  type: 'simulasi' | 'game' | 'latihan' | 'visualisasi' | 'lainnya';
  /** Durasi estimasi (dalam menit) */
  estimatedTime?: number;
  /** Level kesulitan */
  difficulty?: 'pemula' | 'menengah' | 'lanjutan';
}

/**
 * Kumpulan semua resource untuk satu sesi/topik
 */
export interface ResourceCollection {
  /** Daftar video pembelajaran */
  videos: VideoResource[];
  /** Daftar artikel/bacaan */
  articles: ArticleResource[];
  /** Daftar dokumentasi resmi */
  documentation: DocumentationResource[];
  /** Daftar resource interaktif */
  interactive?: InteractiveResource[];
  /** Daftar dataset untuk latihan (opsional) */
  datasets?: {
    id: string;
    title: string;
    url: string;
    description: string;
    format: 'csv' | 'xlsx' | 'json' | 'sql' | 'lainnya';
    size?: string; // contoh: "2.5 MB"
  }[];
}

/**
 * ============================================================
 * 2. SUBTOPIC TYPES (Detail Materi)
 * ============================================================
 */

/**
 * Tipe subtopic dalam satu sesi
 * Setiap sesi bisa memiliki 3-8 subtopik
 */
export interface Subtopic {
  /** Nama subtopik (contoh: "1.1 Apa Itu Excel?") */
  name: string;
  /** Konten materi lengkap (bisa berisi markdown/format teks) */
  content: string;
  /** Durasi estimasi belajar (dalam menit) */
  estimatedTime?: number;
  /** Level kesulitan subtopik ini */
  difficulty?: 'pemula' | 'menengah' | 'lanjutan';
  /** Kata kunci untuk pencarian (opsional) */
  keywords?: string[];
  /** Prasyarat yang harus dikuasai sebelumnya (opsional) */
  prerequisites?: string[];
  /** Contoh kasus/ilustrasi (opsional) */
  examples?: string[];
  /** Link ke materi tambahan (opsional) */
  additionalResources?: string[];
}

/**
 * ============================================================
 * 3. PRACTICE TYPES (Latihan Praktik)
 * ============================================================
 */

/**
 * Tipe latihan praktik untuk satu sesi
 */
export interface Practice {
  /** ID unik latihan */
  id: string;
  /** Judul latihan */
  title: string;
  /** Instruksi lengkap latihan */
  instructions: string;
  /** Estimasi waktu pengerjaan (dalam menit) */
  estimatedTime: number;
  /** Level kesulitan */
  difficulty: 'easy' | 'medium' | 'hard';
  /** Tips untuk mengerjakan latihan */
  tips?: string;
  /** URL file pendukung (dataset, template, dll) */
  fileUrl?: string | null;
  /** Kriteria penilaian (checklist) */
  criteria?: string[];
  /** Solusi/jawaban (opsional - untuk cek sendiri) */
  solution?: string;
  /** Kategori latihan */
  category?: 'individu' | 'berpasangan' | 'kelompok';
}

/**
 * ============================================================
 * 4. SESSION TYPES (Sesi Belajar)
 * ============================================================
 */

/**
 * Tipe sesi belajar dalam sehari
 * Satu hari terdiri dari 6-8 sesi (termasuk break)
 */
export interface Session {
  /** Nomor sesi (1-8) */
  session: number;
  /** Rentang waktu (contoh: "08:00 - 10:00") */
  time: string;
  /** Durasi sesi (dalam menit) */
  duration: number;
  /** Topik utama sesi */
  topic: string;
  /** Apakah ini sesi istirahat? */
  isBreak: boolean;
  /** Daftar subtopik (jika bukan break) */
  subtopics: Subtopic[];
  /** Resource pendukung */
  resources: ResourceCollection;
  /** Latihan praktik (jika ada) */
  practice: Practice | null;
  /** Tujuan pembelajaran sesi ini (opsional) */
  learningObjectives?: string[];
  /** Catatan tambahan (opsional) */
  notes?: string;
}

/**
 * ============================================================
 * 5. QUIZ TYPES
 * ============================================================
 */

/**
 * Tipe pertanyaan quiz
 */
export interface QuizQuestion {
  /** ID unik pertanyaan */
  id: string;
  /** Tipe pertanyaan */
  type: 'multiple_choice' | 'true_false' | 'essay' | 'fill_blank';
  /** Teks pertanyaan */
  question: string;
  /** Pilihan jawaban (untuk multiple choice) */
  options?: string[];
  /** Jawaban benar */
  correctAnswer: string;
  /** Penjelasan jawaban */
  explanation: string;
  /** Level kesulitan pertanyaan */
  difficulty: 'easy' | 'medium' | 'hard';
  /** Poin untuk pertanyaan ini (opsional) */
  points?: number;
  /** Kategori/topik pertanyaan (opsional) */
  category?: string;
}

/**
 * Tipe quiz untuk satu hari
 */
export interface Quiz {
  /** Judul quiz */
  title: string;
  /** Deskripsi quiz */
  description: string;
  /** Nilai minimal lulus (dalam persen) */
  passingScore: number;
  /** Daftar pertanyaan */
  questions: QuizQuestion[];
  /** Durasi pengerjaan (dalam menit, opsional) */
  timeLimit?: number;
  /** Jumlah percobaan yang diizinkan (opsional) */
  maxAttempts?: number;
  /** Tips sebelum mengerjakan quiz (opsional) */
  tips?: string;
}

/**
 * ============================================================
 * 6. ASSIGNMENT TYPES (Tugas Akhir Hari)
 * ============================================================
 */

/**
 * Tipe assignment/tugas akhir hari
 */
export interface Assignment {
  /** Judul assignment */
  title: string;
  /** Deskripsi lengkap tugas */
  description: string;
  /** Daftar deliverables (hasil yang harus dikumpulkan) */
  deliverables: string[];
  /** Estimasi waktu pengerjaan */
  estimatedTime: string;
  /** Level kesulitan */
  difficulty: 'easy' | 'medium' | 'hard';
  /** Kriteria penilaian */
  criteria?: string[];
  /** URL template/file pendukung (opsional) */
  templateUrl?: string;
  /** Contoh hasil (opsional) */
  exampleUrl?: string;
  /** Deadline (opsional) */
  deadline?: string;
}

/**
 * ============================================================
 * 7. REFLECTION TYPES (Refleksi Harian)
 * ============================================================
 */

/**
 * Tipe refleksi harian
 */
export interface Reflection {
  /** Daftar pertanyaan refleksi */
  questions: string[];
  /** Ruang untuk catatan pribadi (opsional) */
  notes?: string;
  /** Rating pemahaman diri (opsional) */
  selfRating?: {
    understanding: number; // 1-10
    focus: number; // 1-10
    energy: number; // 1-10
  };
}

/**
 * ============================================================
 * 8. EVALUATION TYPES (Evaluasi User)
 * ============================================================
 */

/**
 * Tipe evaluasi yang diisi oleh user
 */
export interface Evaluation {
  /** Level pemahaman (0-100) */
  understandingLevel: number;
  /** Level fokus (0-100) */
  focusLevel: number;
  /** Level energi (0-100) */
  energyLevel: number;
  /** Topik yang perlu diulang */
  topicsNeedsReview: string[];
  /** Catatan pribadi */
  notes: string;
  /** Rating kesulitan hari ini (1-10, opsional) */
  difficultyRating?: number;
  /** Saran untuk perbaikan (opsional) */
  improvementSuggestions?: string;
}

/**
 * ============================================================
 * 9. DAY TYPES (Data Harian Lengkap)
 * ============================================================
 */

/**
 * Tipe data untuk satu hari pembelajaran (1-180)
 * Ini adalah gabungan dari semua komponen di atas
 */
export interface DayData {
  /** ID hari (1-180) */
  id: number;
  /** Bulan ke-berapa (1-6) */
  month: number;
  /** Minggu ke-berapa (1-5) */
  week: number;
  /** Hari ke-berapa dalam bulan (1-30) */
  day: number;
  /** Judul utama hari */
  title: string;
  /** Subjudul/deskripsi singkat */
  subtitle: string;
  /** Jadwal 10 jam (6-8 sesi) */
  schedule: {
    totalHours: number;
    sessions: Session[];
  };
  /** Quiz pemahaman */
  quiz: Quiz;
  /** Tugas akhir hari */
  assignment: Assignment;
  /** Refleksi harian */
  reflection: Reflection;
  /** Evaluasi (diisi user) */
  evaluation: Evaluation;
  /** Tujuan pembelajaran hari ini (opsional) */
  learningObjectives?: string[];
  /** Kata kunci untuk pencarian (opsional) */
  keywords?: string[];
  /** Prasyarat hari ini (opsional) */
  prerequisites?: string[];
  /** Catatan tambahan (opsional) */
  notes?: string;
  /** Durasi total belajar (dalam jam) */
  totalStudyHours: number;
}

/**
 * ============================================================
 * 10. WEEK TYPES (Data Mingguan)
 * ============================================================
 */

/**
 * Tipe data untuk satu minggu
 * Terdiri dari 7 hari
 */
export interface WeekData {
  /** Nomor minggu (1-5) */
  week: number;
  /** Judul minggu */
  title: string;
  /** Deskripsi singkat minggu ini */
  description: string;
  /** Daftar hari dalam minggu ini (1-7) */
  days: DayData[];
  /** Tujuan pembelajaran minggu ini (opsional) */
  learningObjectives?: string[];
  /** Skill yang akan dikuasai di minggu ini (opsional) */
  skillsToMaster?: string[];
  /** Catatan tambahan (opsional) */
  notes?: string;
}

/**
 * ============================================================
 * 11. FINAL PROJECT TYPES (Proyek Akhir Bulan)
 * ============================================================
 */

/**
 * Tipe final project per bulan
 * Setiap bulan memiliki 1 final project
 */
export interface FinalProject {
  /** ID project (1-6) */
  id: number;
  /** Judul project */
  title: string;
  /** Deskripsi project */
  description: string;
  /** Bulan ke-berapa project ini (1-6) */
  month: number;
  /** Skill yang diuji dalam project ini */
  skillsTested: string[];
  /** Daftar deliverables */
  deliverables: string[];
  /** Dataset yang digunakan (link atau deskripsi) */
  dataset: string;
  /** Tools yang digunakan */
  toolsUsed: string[];
  /** Kriteria penilaian */
  evaluationCriteria: {
    category: string;
    weight: number; // persentase
    description: string;
  }[];
  /** Estimasi waktu pengerjaan */
  estimatedTime: string;
  /** Level kesulitan */
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  /** Contoh hasil (opsional) */
  exampleUrl?: string;
  /** Template/struktur yang harus diikuti (opsional) */
  template?: string;
  /** Tips pengerjaan (opsional) */
  tips?: string[];
  /** Referensi/insprasi (opsional) */
  references?: string[];
}

/**
 * ============================================================
 * 12. MONTH TYPES (Data Bulanan)
 * ============================================================
 */

/**
 * Tipe data untuk satu bulan (1-6)
 * Terdiri dari 4-5 minggu
 */
export interface MonthData {
  /** Nomor bulan (1-6) */
  month: number;
  /** Judul bulan */
  title: string;
  /** Subjudul/deskripsi */
  subtitle: string;
  /** Tujuan pembelajaran bulan ini */
  learningObjectives: string[];
  /** Skill yang akan dikuasai di bulan ini */
  skillsToMaster: string[];
  /** Tools yang digunakan di bulan ini */
  toolsUsed: string[];
  /** Daftar minggu dalam bulan ini (4-5 minggu) */
  weeks: WeekData[];
  /** Final project bulan ini */
  finalProject: FinalProject;
  /** Total hari dalam bulan ini (28-30) */
  totalDays: number;
  /** Total jam belajar (10 jam × totalDays) */
  totalHours: number;
  /** Topik utama bulan ini */
  mainTopics: string[];
  /** Prasyarat sebelum memulai bulan ini */
  prerequisites: string[];
  /** Tips untuk bulan ini (opsional) */
  tips?: string[];
  /** Sertifikasi yang bisa diambil (opsional) */
  certifications?: {
    name: string;
    provider: string;
    url: string;
  }[];
}

/**
 * ============================================================
 * 13. ROADMAP TYPES (Keseluruhan 6 Bulan)
 * ============================================================
 */

/**
 * Tipe data untuk seluruh roadmap 6 bulan
 * Ini adalah root data yang akan digunakan di seluruh aplikasi
 */
export interface RoadmapData {
  /** Total bulan (6) */
  totalMonths: number;
  /** Total hari (180) */
  totalDays: number;
  /** Total jam belajar (1800 jam) */
  totalHours: number;
  /** Nama program */
  name: string;
  /** Deskripsi program */
  description: string;
  /** Target karir setelah selesai */
  careerTarget: string;
  /** Daftar semua bulan (1-6) */
  months: MonthData[];
  /** Skill yang akan dikuasai secara keseluruhan */
  overallSkills: {
    category: string;
    skills: string[];
  }[];
  /** Tools yang akan dipelajari secara keseluruhan */
  overallTools: {
    name: string;
    icon?: string;
    description: string;
    proficiencyTarget: 'dasar' | 'menengah' | 'mahir';
  }[];
  /** Prasyarat sebelum memulai roadmap */
  prerequisites: string[];
  /** Tips sukses mengikuti roadmap (opsional) */
  successTips?: string[];
  /** Sertifikasi yang bisa diambil setelah selesai (opsional) */
  certifications?: {
    name: string;
    provider: string;
    url: string;
  }[];
  /** Rekomendasi karir setelah selesai (opsional) */
  careerPaths?: {
    title: string;
    description: string;
    salaryRange?: string;
  }[];
}

/**
 * ============================================================
 * 14. UTILITY TYPES (Untuk Kemudahan Developer)
 * ============================================================
 */

/**
 * Tipe untuk status pembelajaran
 */
export type LearningStatus = 'not_started' | 'in_progress' | 'completed' | 'review';

/**
 * Tipe untuk tingkat kesulitan
 */
export type DifficultyLevel = 'pemula' | 'menengah' | 'lanjutan' | 'expert';

/**
 * Tipe untuk jenis resource
 */
export type ResourceType = 'video' | 'article' | 'documentation' | 'interactive' | 'dataset';

/**
 * Tipe untuk filter pencarian (untuk fitur search)
 */
export interface SearchFilter {
  keyword?: string;
  month?: number;
  week?: number;
  day?: number;
  difficulty?: DifficultyLevel;
  resourceType?: ResourceType;
  tool?: string;
  skill?: string;
}

/**
 * Tipe untuk progress user (akan disimpan di localStorage)
 */
export interface UserProgress {
  dayId: number;
  status: LearningStatus;
  completedAt?: string;
  timeSpent: number; // dalam menit
  quizScore?: number;
  assignmentSubmitted?: boolean;
  notes?: string;
  understandingLevel?: number;
}

/**
 * Tipe untuk summary roadmap (untuk dashboard)
 */
export interface RoadmapSummary {
  totalMonths: number;
  totalDays: number;
  totalWeeks: number;
  totalTopics: number;
  totalResources: {
    videos: number;
    articles: number;
    documentations: number;
    interactives: number;
  };
  totalQuizzes: number;
  totalAssignments: number;
  totalProjects: number;
}
