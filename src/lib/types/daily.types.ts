// ============================================================
// DAILY TYPES - Data Harian Pembelajaran (180 Hari)
// ============================================================
// Digunakan untuk mendefinisikan struktur data per hari
// Setiap hari memiliki 6-8 sesi belajar (total 10 jam)
// ============================================================

/**
 * ============================================================
 * 1. ENUM & CONSTANT TYPES (Untuk Konsistensi Data)
 * ============================================================
 */

/**
 * Status sesi belajar
 */
export type SessionStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';

/**
 * Tipe sesi (belajar atau istirahat)
 */
export type SessionType = 'learning' | 'break' | 'review' | 'quiz' | 'practice' | 'assignment';

/**
 * Level kesulitan untuk konten harian
 */
export type DailyDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Tipe quiz question
 */
export type QuizQuestionType = 'multiple_choice' | 'true_false' | 'fill_blank' | 'matching' | 'essay';

/**
 * Status pengerjaan quiz
 */
export type QuizStatus = 'not_started' | 'in_progress' | 'completed' | 'failed' | 'passed';

/**
 * Tipe assignment submission status
 */
export type AssignmentStatus = 'draft' | 'submitted' | 'reviewed' | 'revised' | 'accepted' | 'rejected';

/**
 * Kategori latihan praktik
 */
export type PracticeCategory = 'individual' | 'pair' | 'group' | 'guided' | 'independent';

/**
 * ============================================================
 * 2. DAILY SCHEDULE TYPES (Jadwal Harian)
 * ============================================================
 */

/**
 * Tipe untuk satu sesi dalam jadwal harian
 */
export interface DailySession {
  /** Nomor urut sesi (1-8) */
  sessionNumber: number;
  /** Waktu mulai sesi (format: HH:MM) */
  startTime: string;
  /** Waktu selesai sesi (format: HH:MM) */
  endTime: string;
  /** Durasi sesi dalam menit */
  durationMinutes: number;
  /** Tipe sesi */
  type: SessionType;
  /** Judul/topik sesi */
  title: string;
  /** Deskripsi singkat sesi */
  description: string;
  /** Status sesi (default: pending) */
  status: SessionStatus;
  /** Target yang harus dicapai di sesi ini */
  objectives: string[];
  /** Daftar subtopik yang dibahas */
  subtopics: DailySubtopic[];
  /** Resource yang digunakan di sesi ini */
  resources: DailyResourceSet;
  /** Latihan praktik (jika ada) */
  practice?: DailyPractice | null;
  /** Quiz (jika ada) */
  quiz?: DailyQuiz | null;
  /** Assignment (jika ada) */
  assignment?: DailyAssignment | null;
  /** Catatan tambahan untuk sesi ini */
  notes?: string;
  /** Tips untuk sesi ini */
  tips?: string[];
  /** Break duration jika tipe break (dalam menit) */
  breakDuration?: number;
  /** Aktivitas yang disarankan selama break */
  breakActivity?: string;
  /** Prasyarat untuk sesi ini */
  prerequisites?: string[];
  /** Kata kunci untuk pencarian */
  keywords?: string[];
  /** Durasi estimasi pengerjaan praktik (dalam menit) */
  estimatedPracticeTime?: number;
  /** Link ke materi tambahan */
  additionalResources?: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'documentation' | 'interactive';
  }[];
}

/**
 * Tipe untuk subtopik dalam satu sesi
 */
export interface DailySubtopic {
  /** ID unik subtopik (format: sessionNumber-subtopicIndex) */
  id: string;
  /** Nama subtopik */
  name: string;
  /** Konten materi lengkap (bisa berisi markdown/HTML) */
  content: string;
  /** Ringkasan singkat subtopik (untuk preview) */
  summary: string;
  /** Durasi estimasi belajar (dalam menit) */
  estimatedTime: number;
  /** Level kesulitan subtopik */
  difficulty: DailyDifficulty;
  /** Tujuan pembelajaran subtopik ini */
  learningObjectives: string[];
  /** Kata kunci untuk pencarian */
  keywords: string[];
  /** Prasyarat yang harus dikuasai */
  prerequisites: string[];
  /** Contoh kasus/ilustrasi */
  examples: {
    title: string;
    description: string;
    code?: string;
    image?: string;
  }[];
  /** Latihan mini (untuk subtopik ini saja) */
  miniPractice?: {
    title: string;
    instructions: string;
    estimatedTime: number;
    solution?: string;
  };
  /** Link ke materi tambahan */
  additionalResources: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'documentation' | 'interactive';
  }[];
  /** Status pemahaman (akan diisi user) */
  understandingStatus?: 'not_started' | 'learning' | 'understood' | 'needs_review';
  /** Catatan pribadi user untuk subtopik ini */
  personalNotes?: string;
}

/**
 * ============================================================
 * 3. DAILY RESOURCE TYPES (Resource per Hari)
 * ============================================================
 */

/**
 * Tipe resource video untuk daily
 */
export interface DailyVideoResource {
  /** ID unik video */
  id: string;
  /** Judul video */
  title: string;
  /** URL lengkap video */
  url: string;
  /** Platform video (YouTube, Vimeo, dll) */
  platform: 'youtube' | 'vimeo' | 'dailymotion' | 'other';
  /** Durasi video (format: MM:SS atau HH:MM:SS) */
  duration: string;
  /** Nama channel/pembuat */
  channel: string;
  /** Deskripsi video */
  description: string;
  /** Level kesulitan */
  difficulty: DailyDifficulty;
  /** Bahasa video */
  language: 'Indonesia' | 'Inggris' | 'Lainnya';
  /** Apakah ini video wajib ditonton? */
  isRequired: boolean;
  /** Urutan tonton (jika ada multiple video) */
  watchOrder?: number;
  /** Subtitle tersedia? */
  hasSubtitles?: boolean;
  /** Caption tersedia? */
  hasCaptions?: boolean;
  /** Waktu spesifik yang harus diperhatikan (timestamp) */
  keyMoments?: {
    timestamp: string;
    description: string;
  }[];
  /** Rating video (opsional) */
  rating?: number;
  /** Jumlah views (opsional) */
  views?: number;
  /** Tanggal upload (opsional) */
  uploadedAt?: string;
}

/**
 * Tipe resource artikel untuk daily
 */
export interface DailyArticleResource {
  /** ID unik artikel */
  id: string;
  /** Judul artikel */
  title: string;
  /** URL lengkap artikel */
  url: string;
  /** Platform artikel */
  platform: string;
  /** Deskripsi artikel */
  description: string;
  /** Level kesulitan */
  difficulty: DailyDifficulty;
  /** Bahasa artikel */
  language: 'Indonesia' | 'Inggris' | 'Lainnya';
  /** Waktu baca estimasi (dalam menit) */
  readTime: number;
  /** Apakah ini wajib dibaca? */
  isRequired: boolean;
  /** Penulis artikel */
  author?: string;
  /** Tanggal publikasi */
  publishedAt?: string;
  /** Poin-poin penting dalam artikel */
  keyTakeaways?: string[];
  /** Apakah ada gambar/diagram penting? */
  hasImages?: boolean;
  /** Apakah ada kode contoh? */
  hasCodeExamples?: boolean;
}

/**
 * Tipe resource dokumentasi untuk daily
 */
export interface DailyDocumentationResource {
  /** ID unik dokumentasi */
  id: string;
  /** Judul dokumentasi */
  title: string;
  /** URL lengkap dokumentasi */
  url: string;
  /** Platform/provider */
  platform: string;
  /** Deskripsi */
  description: string;
  /** Versi dokumentasi */
  version?: string;
  /** Bahasa dokumentasi */
  language: 'Indonesia' | 'Inggris' | 'Lainnya';
  /** Apakah ini wajib dibaca? */
  isRequired: boolean;
  /** Bagian yang harus difokuskan */
  focusSections?: string[];
  /** Tingkat kedalaman dokumentasi */
  depthLevel: 'basic' | 'intermediate' | 'advanced' | 'comprehensive';
}

/**
 * Tipe resource interaktif untuk daily
 */
export interface DailyInteractiveResource {
  /** ID unik resource */
  id: string;
  /** Judul resource */
  title: string;
  /** URL lengkap */
  url: string;
  /** Platform penyedia */
  platform: string;
  /** Deskripsi */
  description: string;
  /** Tipe interaktif */
  type: 'simulation' | 'game' | 'exercise' | 'visualization' | 'sandbox' | 'other';
  /** Level kesulitan */
  difficulty: DailyDifficulty;
  /** Estimasi waktu (dalam menit) */
  estimatedTime: number;
  /** Apakah ini wajib dikerjakan? */
  isRequired: boolean;
  /** Instruksi penggunaan */
  instructions?: string;
  /** Target yang harus dicapai */
  learningTargets?: string[];
  /** Bahasa yang tersedia */
  availableLanguages?: string[];
}

/**
 * Kumpulan resource untuk satu sesi/hari
 */
export interface DailyResourceSet {
  /** Daftar video */
  videos: DailyVideoResource[];
  /** Daftar artikel */
  articles: DailyArticleResource[];
  /** Daftar dokumentasi */
  documentations: DailyDocumentationResource[];
  /** Daftar resource interaktif */
  interactives: DailyInteractiveResource[];
  /** Dataset untuk latihan */
  datasets?: {
    id: string;
    title: string;
    url: string;
    description: string;
    format: 'csv' | 'xlsx' | 'json' | 'sql' | 'xml' | 'other';
    size: string;
    rows?: number;
    columns?: number;
    isRequired: boolean;
  }[];
  /** Template file (untuk assignment) */
  templates?: {
    id: string;
    title: string;
    url: string;
    description: string;
    format: string;
    isRequired: boolean;
  }[];
}

/**
 * ============================================================
 * 4. DAILY PRACTICE TYPES (Latihan Harian)
 * ============================================================
 */

/**
 * Tipe latihan praktik harian
 */
export interface DailyPractice {
  /** ID unik latihan */
  id: string;
  /** Judul latihan */
  title: string;
  /** Deskripsi latihan */
  description: string;
  /** Instruksi lengkap (step by step) */
  instructions: string[];
  /** Tujuan latihan */
  objectives: string[];
  /** Estimasi waktu (dalam menit) */
  estimatedTime: number;
  /** Level kesulitan */
  difficulty: DailyDifficulty;
  /** Kategori latihan */
  category: PracticeCategory;
  /** Skill yang dilatih */
  skillsPracticed: string[];
  /** Tools yang digunakan */
  toolsUsed: string[];
  /** Dataset yang digunakan (jika ada) */
  dataset?: {
    name: string;
    description: string;
    url?: string;
    isProvided: boolean;
  };
  /** File template (jika ada) */
  templateFile?: {
    name: string;
    url: string;
    description: string;
  };
  /** Contoh hasil (untuk referensi) */
  exampleOutput?: {
    description: string;
    image?: string;
    fileUrl?: string;
  };
  /** Kriteria penilaian */
  evaluationCriteria: {
    criterion: string;
    weight: number; // persentase
    description: string;
  }[];
  /** Tips pengerjaan */
  tips: string[];
  /** Kesalahan umum yang harus dihindari */
  commonMistakes: string[];
  /** Solusi (untuk cek sendiri, setelah selesai) */
  solution?: {
    description: string;
    steps: string[];
    fileUrl?: string;
  };
  /** Link ke diskusi/forum (opsional) */
  discussionLink?: string;
  /** Apakah ada batas waktu? */
  timeLimit?: number; // dalam menit
  /** Status pengerjaan (akan diisi user) */
  status?: 'not_started' | 'in_progress' | 'completed' | 'reviewed';
  /** Catatan user saat mengerjakan */
  userNotes?: string;
  /** Self-assessment user (1-10) */
  selfAssessment?: number;
}

/**
 * ============================================================
 * 5. DAILY QUIZ TYPES (Quiz Harian)
 * ============================================================
 */

/**
 * Tipe pertanyaan quiz harian
 */
export interface DailyQuizQuestion {
  /** ID unik pertanyaan */
  id: string;
  /** Tipe pertanyaan */
  type: QuizQuestionType;
  /** Teks pertanyaan */
  question: string;
  /** Pilihan jawaban (untuk multiple choice) */
  options?: string[];
  /** Pasangan jawaban (untuk matching) */
  pairs?: {
    left: string;
    right: string;
  }[];
  /** Jawaban benar */
  correctAnswer: string | string[];
  /** Penjelasan jawaban */
  explanation: string;
  /** Level kesulitan */
  difficulty: DailyDifficulty;
  /** Poin untuk pertanyaan ini */
  points: number;
  /** Kategori/topik */
  category: string;
  /** Subtopik terkait */
  relatedSubtopic: string;
  /** Hint (jika user kesulitan) */
  hint?: string;
  /** Referensi materi (dimana jawaban bisa ditemukan) */
  reference?: {
    sessionNumber: number;
    subtopicName: string;
  };
  /** Apakah pertanyaan ini wajib dijawab benar? */
  isRequired?: boolean;
}

/**
 * Tipe quiz harian
 */
export interface DailyQuiz {
  /** ID unik quiz */
  id: string;
  /** Judul quiz */
  title: string;
  /** Deskripsi quiz */
  description: string;
  /** Daftar pertanyaan */
  questions: DailyQuizQuestion[];
  /** Nilai minimal lulus (dalam persen) */
  passingScore: number;
  /** Total poin maksimal */
  totalPoints: number;
  /** Durasi pengerjaan (dalam menit) */
  timeLimit: number;
  /** Jumlah percobaan yang diizinkan */
  maxAttempts: number;
  /** Level kesulitan quiz */
  difficulty: DailyDifficulty;
  /** Topik yang diuji */
  topicsTested: string[];
  /** Tips sebelum mengerjakan */
  tips: string[];
  /** Apakah quiz ini wajib dikerjakan? */
  isRequired: boolean;
  /** Hasil quiz (akan diisi user setelah selesai) */
  result?: {
    score: number;
    percentage: number;
    correctAnswers: number;
    wrongAnswers: number;
    timeSpent: number;
    status: QuizStatus;
    attempts: number;
    answers: {
      questionId: string;
      userAnswer: string | string[];
      isCorrect: boolean;
    }[];
    completedAt?: string;
  };
  /** Review setelah quiz selesai */
  review?: {
    strengths: string[];
    weaknesses: string[];
    recommendedTopics: string[];
    improvementSuggestions: string[];
  };
  /** Link ke materi review (jika gagal) */
  reviewMaterials?: {
    title: string;
    url: string;
    description: string;
  }[];
}

/**
 * ============================================================
 * 6. DAILY ASSIGNMENT TYPES (Tugas Harian)
 * ============================================================
 */

/**
 * Tipe assignment harian
 */
export interface DailyAssignment {
  /** ID unik assignment */
  id: string;
  /** Judul assignment */
  title: string;
  /** Deskripsi assignment */
  description: string;
  /** Tujuan assignment */
  objectives: string[];
  /** Instruksi lengkap (step by step) */
  instructions: string[];
  /** Deliverables yang harus dikumpulkan */
  deliverables: {
    name: string;
    description: string;
    format: string;
    isRequired: boolean;
  }[];
  /** Estimasi waktu pengerjaan */
  estimatedTime: string;
  /** Level kesulitan */
  difficulty: DailyDifficulty;
  /** Skill yang diuji */
  skillsTested: string[];
  /** Tools yang digunakan */
  toolsUsed: string[];
  /** Dataset yang digunakan (jika ada) */
  dataset?: {
    name: string;
    description: string;
    url?: string;
    isProvided: boolean;
  };
  /** Template file (jika ada) */
  templateFile?: {
    name: string;
    url: string;
    description: string;
  };
  /** Contoh hasil (untuk referensi) */
  exampleOutput?: {
    description: string;
    image?: string;
    fileUrl?: string;
  };
  /** Kriteria penilaian */
  evaluationCriteria: {
    criterion: string;
    weight: number;
    description: string;
  }[];
  /** Tips pengerjaan */
  tips: string[];
  /** Kesalahan umum yang harus dihindari */
  commonMistakes: string[];
  /** Batas waktu pengumpulan (dalam hari) */
  deadlineDays: number;
  /** Apakah assignment ini wajib dikerjakan? */
  isRequired: boolean;
  /** Rubrik penilaian detail */
  rubric?: {
    level: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement';
    criteria: string;
    description: string;
    scoreRange: string;
  }[];
  /** Status submission (akan diisi user) */
  submission?: {
    status: AssignmentStatus;
    submittedAt?: string;
    fileUrls?: string[];
    notes?: string;
    score?: number;
    feedback?: string;
    reviewerNotes?: string;
    revisedAt?: string;
  };
  /** Link untuk submit (opsional) */
  submitUrl?: string;
  /** Link diskusi assignment (opsional) */
  discussionLink?: string;
}

/**
 * ============================================================
 * 7. DAILY REFLECTION TYPES (Refleksi Harian)
 * ============================================================
 */

/**
 * Tipe refleksi harian (diisi user di akhir hari)
 */
export interface DailyReflection {
  /** ID unik refleksi */
  id: string;
  /** Hari ke-berapa */
  dayId: number;
  /** Pertanyaan refleksi */
  questions: {
    id: string;
    question: string;
    type: 'text' | 'rating' | 'multiple_choice' | 'checkbox';
    options?: string[];
    isRequired: boolean;
  }[];
  /** Jawaban user */
  answers?: {
    questionId: string;
    answer: string | number | string[];
  }[];
  /** Rating pemahaman diri (1-10) */
  selfRating: {
    understanding: number;
    focus: number;
    energy: number;
    satisfaction: number;
    difficulty: number;
  };
  /** Topik yang paling mudah dipahami */
  easiestTopics: string[];
  /** Topik yang paling sulit dipahami */
  hardestTopics: string[];
  /** Topik yang perlu diulang */
  needsReview: string[];
  /** Hal yang dipelajari hari ini */
  keyLearnings: string[];
  /** Hal yang ingin dipelajari lebih dalam */
  wantToLearnMore: string[];
  /** Saran untuk perbaikan */
  improvementSuggestions: string[];
  /** Catatan pribadi */
  personalNotes: string;
  /** Mood hari ini (opsional) */
  mood?: 'great' | 'good' | 'okay' | 'tired' | 'frustrated' | 'excited';
  /** Waktu yang dihabiskan (dalam menit) */
  timeSpent: number;
  /** Apakah target hari ini tercapai? */
  targetAchieved: boolean;
  /** Alasan jika target tidak tercapai */
  targetNotAchievedReason?: string;
  /** Target untuk hari besok */
  tomorrowTarget?: string;
  /** Apakah refleksi sudah diisi? */
  isCompleted: boolean;
  /** Waktu pengisian refleksi */
  completedAt?: string;
}

/**
 * ============================================================
 * 8. DAILY PROGRESS TYPES (Progress Harian User)
 * ============================================================
 */

/**
 * Tipe progress harian user (disimpan di localStorage)
 */
export interface DailyUserProgress {
  /** ID hari (1-180) */
  dayId: number;
  /** Status hari */
  status: 'not_started' | 'in_progress' | 'completed' | 'reviewing';
  /** Progress per sesi */
  sessionProgress: {
    sessionNumber: number;
    status: SessionStatus;
    timeSpent: number; // dalam menit
    completedSubtopicIds: string[];
  }[];
  /** Progress per subtopik */
  subtopicProgress: {
    subtopicId: string;
    status: 'not_started' | 'viewed' | 'studied' | 'understood' | 'needs_review';
    timeSpent: number;
    notes?: string;
  }[];
  /** Progress quiz */
  quizProgress: {
    quizId: string;
    status: QuizStatus;
    score?: number;
    attempts: number;
    timeSpent: number;
    completedAt?: string;
  }[];
  /** Progress practice */
  practiceProgress: {
    practiceId: string;
    status: 'not_started' | 'in_progress' | 'completed' | 'reviewed';
    timeSpent: number;
    completedAt?: string;
    selfAssessment?: number;
  }[];
  /** Progress assignment */
  assignmentProgress: {
    assignmentId: string;
    status: AssignmentStatus;
    submittedAt?: string;
    score?: number;
    feedback?: string;
  }[];
  /** Total waktu belajar hari ini (dalam menit) */
  totalTimeSpent: number;
  /** Total poin yang didapat hari ini */
  totalPoints: number;
  /** Streak hari ini (hari ke-berapa berturut-turut) */
  streakDay: number;
  /** Apakah hari ini selesai? */
  isDayComplete: boolean;
  /** Waktu mulai belajar hari ini */
  startedAt?: string;
  /** Waktu selesai belajar hari ini */
  completedAt?: string;
  /** Catatan harian user */
  dailyNotes?: string;
}

/**
 * ============================================================
 * 9. DAILY STATISTICS TYPES (Statistik Harian)
 * ============================================================
 */

/**
 * Tipe statistik harian (untuk dashboard/analytics)
 */
export interface DailyStatistics {
  /** Hari ke-berapa */
  dayId: number;
  /** Tanggal (YYYY-MM-DD) */
  date: string;
  /** Total waktu belajar (dalam menit) */
  totalStudyTime: number;
  /** Jumlah subtopik yang diselesaikan */
  subtopicsCompleted: number;
  /** Total subtopik hari ini */
  totalSubtopics: number;
  /** Persentase penyelesaian subtopik */
  subtopicsCompletionRate: number;
  /** Jumlah sesi yang diselesaikan */
  sessionsCompleted: number;
  /** Total sesi hari ini */
  totalSessions: number;
  /** Skor quiz (jika ada) */
  quizScore?: number;
  /** Status quiz */
  quizStatus?: QuizStatus;
  /** Assignment submitted? */
  assignmentSubmitted: boolean;
  /** Assignment score (jika ada) */
  assignmentScore?: number;
  /** Total poin yang didapat */
  pointsEarned: number;
  /** Total poin maksimal hari ini */
  totalPossiblePoints: number;
  /** Persentase poin */
  pointsPercentage: number;
  /** Rating pemahaman diri (1-10) */
  understandingRating: number;
  /** Rating fokus (1-10) */
  focusRating: number;
  /** Rating energi (1-10) */
  energyRating: number;
  /** Topik yang paling banyak dipelajari */
  topTopics: string[];
  /** Jam belajar paling produktif */
  mostProductiveHour: string;
  /** Jumlah break yang diambil */
  breaksTaken: number;
  /** Total waktu break (dalam menit) */
  totalBreakTime: number;
  /** Apakah target hari ini tercapai? */
  targetAchieved: boolean;
  /** Keterangan tambahan */
  notes?: string;
}

/**
 * ============================================================
 * 10. DAILY ANALYTICS TYPES (Analitik Harian)
 * ============================================================
 */

/**
 * Tipe analitik harian (untuk insights)
 */
export interface DailyAnalytics {
  /** Hari ke-berapa */
  dayId: number;
  /** Waktu belajar per jam (heatmap data) */
  hourlyStudyData: {
    hour: number; // 0-23
    minutes: number;
    activity: 'study' | 'break' | 'idle';
  }[];
  /** Konsistensi belajar (per 15 menit) */
  consistencyData: {
    timeSlot: string; // "08:00-08:15"
    isStudying: boolean;
  }[];
  /** Topik yang paling banyak dihabiskan waktunya */
  timeSpentByTopic: {
    topic: string;
    minutes: number;
    percentage: number;
  }[];
  /** Perbandingan target vs realisasi */
  targetVsActual: {
    target: number; // target menit
    actual: number; // aktual menit
    difference: number;
    status: 'on_track' | 'behind' | 'ahead';
  };
  /** Insight harian */
  insights: {
    type: 'positive' | 'negative' | 'neutral' | 'suggestion';
    message: string;
    recommendation?: string;
  }[];
  /** Prediksi untuk besok (berdasarkan data hari ini) */
  prediction?: {
    estimatedStudyTime: number;
    recommendedFocus: string[];
    suggestedBreakTimes: string[];
  };
  /** Perbandingan dengan hari sebelumnya */
  comparisonWithPreviousDay?: {
    studyTimeDiff: number;
    productivityDiff: number;
    status: 'better' | 'worse' | 'same';
  };
}

/**
 * ============================================================
 * 11. DAILY SETTINGS TYPES (Pengaturan Harian)
 * ============================================================
 */

/**
 * Tipe pengaturan harian user
 */
export interface DailySettings {
  /** Target waktu belajar (dalam menit) */
  targetStudyMinutes: number;
  /** Waktu mulai belajar (HH:MM) */
  preferredStartTime: string;
  /** Waktu selesai belajar (HH:MM) */
  preferredEndTime: string;
  /** Lama break per sesi (dalam menit) */
  breakDuration: number;
  /** Jam makan siang (HH:MM) */
  lunchTime: string;
  /** Lama makan siang (dalam menit) */
  lunchDuration: number;
  /** Apakah ingin notifikasi pengingat? */
  notificationsEnabled: boolean;
  /** Waktu pengingat (HH:MM) */
  reminderTime?: string;
  /** Tema hari ini (warna) */
  themeColor?: string;
  /** Target harian (subtopik per hari) */
  subtopicsPerDay: number;
  /** Target quiz score (persen) */
  targetQuizScore: number;
  /** Apakah assignment wajib dikerjakan? */
  assignmentRequired: boolean;
  /** Jumlah sesi per hari (default: 8) */
  sessionsPerDay: number;
  /** Durasi sesi belajar (dalam menit) */
  sessionDuration: number;
  /** Hari istirahat (minggu, misalnya) */
  restDays: number[]; // 0=minggu, 1=senin, dst
  /** Preferensi bahasa */
  language: 'Indonesia' | 'Inggris';
  /** Mode belajar (fokus/standar/santai) */
  studyMode: 'focus' | 'standard' | 'relaxed';
}

/**
 * ============================================================
 * 12. DAILY SUMMARY TYPES (Ringkasan Harian)
 * ============================================================
 */

/**
 * Tipe ringkasan harian (untuk ditampilkan di dashboard)
 */
export interface DailySummary {
  /** Hari ke-berapa */
  dayId: number;
  /** Judul hari */
  title: string;
  /** Status hari */
  status: 'not_started' | 'in_progress' | 'completed' | 'reviewing';
  /** Progress persentase (0-100) */
  progressPercentage: number;
  /** Jumlah sesi selesai / total sesi */
  sessionsProgress: string;
  /** Jumlah subtopik selesai / total subtopik */
  subtopicsProgress: string;
  /** Quiz status */
  quizStatus: QuizStatus;
  /** Quiz score (jika ada) */
  quizScore?: number;
  /** Assignment status */
  assignmentStatus: AssignmentStatus;
  /** Total waktu belajar (dalam menit) */
  studyTime: number;
  /** Total poin */
  points: number;
  /** Topik utama hari ini */
  mainTopic: string;
  /** Skill yang dipelajari */
  skillsLearned: string[];
  /** Waktu mulai (HH:MM) */
  startedAt?: string;
  /** Waktu selesai (HH:MM) */
  completedAt?: string;
  /** Kesan hari ini (user generated) */
  impression?: 'great' | 'good' | 'okay' | 'tough';
  /** Catatan singkat */
  quickNote?: string;
}

/**
 * ============================================================
 * 13. DAILY EXPORT TYPES (Untuk Export Data)
 * ============================================================
 */

/**
 * Tipe data harian untuk export (ke PDF/CSV)
 */
export interface DailyExportData {
  /** Hari ke-berapa */
  dayId: number;
  /** Tanggal */
  date: string;
  /** Judul hari */
  title: string;
  /** Total waktu belajar */
  totalStudyTime: string;
  /** Subtopik yang dipelajari */
  subtopicsStudied: string[];
  /** Quiz score */
  quizScore: number;
  /** Assignment status */
  assignmentStatus: string;
  /** Poin yang didapat */
  pointsEarned: number;
  /** Refleksi singkat */
  reflection: string;
  /** Target besok */
  tomorrowTarget: string;
  /** Catatan tambahan */
  notes: string;
  /** Data mentah (semua sesi) */
  rawData: DailySession[];
}

/**
 * ============================================================
 * 14. DAILY TYPES INDEX (Export Semua)
 * ============================================================
 */

/**
 * Tipe utama untuk data harian lengkap (gabungan semua)
 */
export interface CompleteDailyData {
  /** Data dasar hari */
  dayData: {
    id: number;
    month: number;
    week: number;
    day: number;
    title: string;
    subtitle: string;
    totalStudyHours: number;
    learningObjectives: string[];
    keywords: string[];
    prerequisites: string[];
    notes?: string;
  };
  /** Jadwal sesi */
  sessions: DailySession[];
  /** Resource set */
  resources: DailyResourceSet;
  /** Quiz */
  quiz: DailyQuiz;
  /** Assignment */
  assignment: DailyAssignment;
  /** Reflection */
  reflection: DailyReflection;
  /** User progress */
  progress: DailyUserProgress;
  /** Statistics */
  statistics: DailyStatistics;
  /** Analytics */
  analytics: DailyAnalytics;
  /** Settings */
  settings: DailySettings;
  /** Summary */
  summary: DailySummary;
  /** Export data */
  exportData: DailyExportData;
}

/**
 * Tipe untuk response API daily data
 */
export interface DailyAPIResponse {
  success: boolean;
  data?: CompleteDailyData;
  error?: {
    code: string;
    message: string;
    details?: string;
  };
  timestamp: string;
}

/**
 * Tipe untuk request update daily progress
 */
export interface DailyProgressUpdateRequest {
  dayId: number;
  sessionNumber?: number;
  subtopicId?: string;
  status: SessionStatus | 'understood' | 'needs_review';
  timeSpent?: number;
  notes?: string;
  quizAnswers?: {
    questionId: string;
    answer: string | string[];
  }[];
  assignmentFile?: {
    fileName: string;
    fileUrl: string;
    notes?: string;
  };
  reflection?: Partial<DailyReflection>;
}
