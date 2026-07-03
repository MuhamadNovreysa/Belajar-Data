export const APP_NAME = "Data Analyst Learning Platform";
export const APP_DESCRIPTION = "Platform pembelajaran Data Analyst dari nol sampai siap kerja dalam 6 bulan";
export const APP_URL = "https://data-analyst-learning.vercel.app";

export const TOTAL_MONTHS = 6;
export const TOTAL_DAYS = 180;
export const DAYS_PER_WEEK = 7;
export const WEEKS_PER_MONTH = 4;
export const TOTAL_WEEKS = 24;
export const HOURS_PER_DAY = 10;
export const TOTAL_HOURS = 1800;

export const PASSING_SCORE = 70;
export const MAX_QUIZ_ATTEMPTS = 3;
export const MIN_UNDERSTANDING_LEVEL = 70;

export const STUDY_SESSIONS_PER_DAY = 8;
export const SESSION_DURATION_MINUTES = 120;
export const BREAK_DURATION_MINUTES = 30;
export const LUNCH_DURATION_MINUTES = 60;

export const DEFAULT_START_TIME = "08:00";
export const DEFAULT_END_TIME = "19:00";

export const MONTH_NAMES = [
  "Bulan 1: Fondasi Excel & Statistika",
  "Bulan 2: SQL & Database",
  "Bulan 3: Power BI & Visualisasi",
  "Bulan 4: Python untuk Data Analisis",
  "Bulan 5: Portfolio & Project",
  "Bulan 6: Persiapan Kerja & Interview"
];

export const MONTH_SUBTITLES = [
  "Menguasai Excel dari Nol Sampai Mahir Data Analysis",
  "Belajar Mengambil dan Mengelola Data dari Database",
  "Membuat Dashboard Interaktif dengan Power BI",
  "Otomatisasi dan Analisis Data dengan Python",
  "Membangun Portofolio untuk Menunjukkan Skill",
  "Siapkan Diri untuk Melamar dan Lolos Interview"
];

export const MONTH_SHORT_NAMES = [
  "Bulan 1 - Excel",
  "Bulan 2 - SQL",
  "Bulan 3 - Power BI",
  "Bulan 4 - Python",
  "Bulan 5 - Portfolio",
  "Bulan 6 - Persiapan"
];

export const TOOLS_BY_MONTH = [
  ["Microsoft Excel", "Google Sheets"],
  ["PostgreSQL", "MySQL", "SQLite"],
  ["Power BI Desktop"],
  ["Python", "Jupyter Notebook", "Pandas", "Matplotlib", "Seaborn"],
  ["Excel", "SQL", "Power BI", "Python", "GitHub"],
  ["Excel", "SQL", "Power BI", "Python", "GitHub", "LinkedIn"]
];

export const SKILLS_CATEGORIES = [
  "Excel",
  "SQL",
  "Power BI",
  "Python",
  "Statistika",
  "Visualisasi Data",
  "Komunikasi",
  "Problem Solving"
];

export const SKILL_LEVELS = [
  "not_started",
  "learning",
  "intermediate",
  "advanced",
  "expert"
] as const;

export const DIFFICULTY_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
  "expert"
] as const;

export const PROGRESS_STATUS = [
  "not_started",
  "in_progress",
  "completed",
  "reviewing",
  "mastered"
] as const;

export const QUIZ_STATUS = [
  "not_started",
  "in_progress",
  "submitted",
  "passed",
  "failed",
  "reviewing"
] as const;

export const ASSIGNMENT_STATUS = [
  "not_started",
  "draft",
  "submitted",
  "reviewed",
  "revised",
  "accepted",
  "rejected",
  "resubmitted"
] as const;

export const SESSION_STATUS = [
  "pending",
  "in_progress",
  "completed",
  "skipped",
  "reviewing"
] as const;

export const SUBTOPIC_STATUS = [
  "not_started",
  "viewed",
  "studied",
  "understood",
  "needs_review",
  "mastered"
] as const;

export const PRACTICE_STATUS = [
  "not_started",
  "in_progress",
  "completed",
  "reviewed",
  "rejected",
  "approved"
] as const;

export const PROJECT_STATUS = [
  "not_started",
  "planning",
  "in_progress",
  "reviewing",
  "submitted",
  "approved",
  "rejected",
  "revision_needed"
] as const;

export const ANALYTICS_TIMEFRAMES = [
  "daily",
  "weekly",
  "monthly",
  "quarterly",
  "yearly",
  "custom"
] as const;

export const CHART_TYPES = [
  "line",
  "bar",
  "pie",
  "doughnut",
  "radar",
  "scatter",
  "heatmap",
  "funnel",
  "treemap",
  "gauge"
] as const;

export const INSIGHT_TYPES = [
  "positive",
  "negative",
  "neutral",
  "opportunity",
  "warning",
  "suggestion",
  "achievement"
] as const;

export const INSIGHT_SEVERITIES = [
  "low",
  "medium",
  "high",
  "critical"
] as const;

export const TREND_DIRECTIONS = [
  "up",
  "down",
  "stable",
  "volatile"
] as const;

export const LEARNING_STYLES = [
  "visual",
  "auditory",
  "reading_writing",
  "kinesthetic",
  "mixed"
] as const;

export const STREAK_TYPES = [
  "daily",
  "weekly",
  "monthly"
] as const;

export const RESOURCE_TYPES = [
  "video",
  "article",
  "documentation",
  "interactive",
  "dataset"
] as const;

export const LANGUAGE_OPTIONS = [
  "Indonesia",
  "Inggris",
  "Lainnya"
] as const;

export const BREAK_ACTIVITIES = [
  "Minum air putih",
  "Stretching",
  "Jalan sebentar",
  "Istirahat mata",
  "Makan snack sehat",
  "Meditasi singkat",
  "Dengerin musik",
  "Lihat pemandangan"
];

export const REFLECTION_QUESTIONS = [
  "Apa yang paling mudah dipahami hari ini?",
  "Apa yang paling sulit? Mengapa?",
  "Apa yang ingin dipelajari lebih dalam?",
  "Seberapa fokus kamu belajar hari ini? (1-10)",
  "Apa gangguan terbesar hari ini?",
  "Skill apa yang sudah kamu kuasai hari ini?",
  "Apa yang akan kamu lakukan berbeda besok?"
];

export const DEFAULT_DAILY_GOALS = {
  targetStudyMinutes: 600,
  targetSubtopics: 10,
  targetQuizScore: 70,
  targetPractices: 2,
  targetAssignments: 1
};

export const DEFAULT_SETTINGS = {
  preferredStartTime: "08:00",
  preferredEndTime: "19:00",
  breakDuration: 30,
  lunchTime: "12:30",
  lunchDuration: 60,
  notificationsEnabled: true,
  reminderTime: "07:30",
  language: "Indonesia",
  studyMode: "focus",
  sessionsPerDay: 8,
  sessionDuration: 120
};

export const LOCAL_STORAGE_KEYS = {
  PROGRESS: "da_progress",
  SETTINGS: "da_settings",
  NOTES: "da_notes",
  STREAK: "da_streak",
  STATISTICS: "da_statistics",
  GAMIFICATION: "da_gamification"
};

export const API_ROUTES = {
  PROGRESS: "/api/progress",
  STATISTICS: "/api/statistics",
  ANALYTICS: "/api/analytics",
  PROJECTS: "/api/projects"
};

export const NAVIGATION_LINKS = [
  { name: "Beranda", href: "/" },
  { name: "Learning", href: "/learning" },
  { name: "Progress", href: "/progress" },
  { name: "Analytics", href: "/analytics" },
  { name: "Projects", href: "/projects" },
  { name: "Resources", href: "/resources" },
  { name: "Settings", href: "/settings" }
];

export const MONTH_COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899"
];

export const MONTH_GRADIENTS = [
  "from-blue-500 to-blue-600",
  "from-green-500 to-green-600",
  "from-yellow-500 to-yellow-600",
  "from-red-500 to-red-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600"
];

export const DIFFICULTY_COLORS = {
  beginner: "#10B981",
  intermediate: "#F59E0B",
  advanced: "#EF4444",
  expert: "#8B5CF6"
};

export const STATUS_COLORS = {
  not_started: "#9CA3AF",
  in_progress: "#3B82F6",
  completed: "#10B981",
  reviewing: "#F59E0B",
  mastered: "#8B5CF6",
  failed: "#EF4444",
  passed: "#10B981",
  pending: "#F59E0B",
  skipped: "#9CA3AF"
};

export const QUIZ_PASSING_SCORES = {
  beginner: 60,
  intermediate: 70,
  advanced: 80,
  expert: 85
};

export const DEFAULT_QUIZ_SETTINGS = {
  timeLimit: 30,
  maxAttempts: 3,
  passingScore: 70,
  showAnswers: true,
  showExplanation: true
};

export const DEFAULT_ASSIGNMENT_SETTINGS = {
  deadlineDays: 1,
  maxAttempts: 3,
  requireFile: true,
  allowRevision: true,
  maxRevision: 2
};

export const PRACTICE_DIFFICULTY_WEIGHTS = {
  easy: 10,
  medium: 20,
  hard: 30
};

export const QUIZ_DIFFICULTY_POINTS = {
  easy: 10,
  medium: 15,
  hard: 20
};

export const STREAK_MILESTONES = [
  { days: 7, badge: "📅 Minggu Pertama", description: "7 hari berturut-turut belajar" },
  { days: 14, badge: "📅 2 Minggu Konsisten", description: "14 hari berturut-turut belajar" },
  { days: 30, badge: "🔥 1 Bulan! Luar Biasa!", description: "30 hari berturut-turut belajar" },
  { days: 60, badge: "🔥 2 Bulan! Semangat!", description: "60 hari berturut-turut belajar" },
  { days: 90, badge: "💪 3 Bulan! Hebat!", description: "90 hari berturut-turut belajar" },
  { days: 120, badge: "💪 4 Bulan! Keren!", description: "120 hari berturut-turut belajar" },
  { days: 150, badge: "🌟 5 Bulan! Mantap!", description: "150 hari berturut-turut belajar" },
  { days: 180, badge: "🎉 6 Bulan! LULUS!", description: "180 hari berturut-turut belajar - SELESAI!" }
];

export const BADGE_DEFINITIONS = [
  { id: "first_day", name: "Hari Pertama", description: "Menyelesaikan hari pertama belajar", icon: "🌅", category: "study", pointsBonus: 10 },
  { id: "first_week", name: "Minggu Pertama", description: "Menyelesaikan minggu pertama belajar", icon: "📅", category: "study", pointsBonus: 20 },
  { id: "first_month", name: "Bulan Pertama", description: "Menyelesaikan bulan pertama belajar", icon: "📆", category: "study", pointsBonus: 50 },
  { id: "perfect_quiz", name: "Quiz Sempurna", description: "Mendapatkan nilai sempurna di quiz", icon: "💯", category: "quiz", pointsBonus: 30 },
  { id: "streak_7", name: "Pekan Konsisten", description: "Belajar 7 hari berturut-turut", icon: "🔥", category: "streak", pointsBonus: 25 },
  { id: "streak_30", name: "Bulan Konsisten", description: "Belajar 30 hari berturut-turut", icon: "🌟", category: "streak", pointsBonus: 50 },
  { id: "streak_180", name: "Legendary", description: "Belajar 180 hari berturut-turut", icon: "👑", category: "streak", pointsBonus: 100 },
  { id: "project_complete", name: "Project Selesai", description: "Menyelesaikan project pertama", icon: "📊", category: "project", pointsBonus: 40 },
  { id: "all_projects", name: "Master Project", description: "Menyelesaikan semua project", icon: "🏆", category: "project", pointsBonus: 80 },
  { id: "excel_master", name: "Master Excel", description: "Menguasai semua materi Excel", icon: "📗", category: "skill", pointsBonus: 30 },
  { id: "sql_master", name: "Master SQL", description: "Menguasai semua materi SQL", icon: "📘", category: "skill", pointsBonus: 30 },
  { id: "powerbi_master", name: "Master Power BI", description: "Menguasai semua materi Power BI", icon: "📙", category: "skill", pointsBonus: 30 },
  { id: "python_master", name: "Master Python", description: "Menguasai semua materi Python", icon: "📕", category: "skill", pointsBonus: 30 },
  { id: "all_master", name: "Data Analyst Master", description: "Menguasai semua tools data analyst", icon: "🎓", category: "mastery", pointsBonus: 100 },
  { id: "graduate", name: "Graduated!", description: "Menyelesaikan seluruh program 6 bulan", icon: "🎉", category: "special", pointsBonus: 200 }
];

export const LEVEL_DEFINITIONS = [
  { level: 1, xpRequired: 0, title: "Pemula", rank: "🥉" },
  { level: 2, xpRequired: 100, title: "Pelajar", rank: "🥉" },
  { level: 3, xpRequired: 300, title: "Praktisi", rank: "🥈" },
  { level: 4, xpRequired: 600, title: "Analis", rank: "🥈" },
  { level: 5, xpRequired: 1000, title: "Mahir", rank: "🥇" },
  { level: 6, xpRequired: 1500, title: "Expert", rank: "🥇" },
  { level: 7, xpRequired: 2100, title: "Master", rank: "🏅" },
  { level: 8, xpRequired: 2800, title: "Professional", rank: "🏅" },
  { level: 9, xpRequired: 3600, title: "Senior", rank: "👑" },
  { level: 10, xpRequired: 5000, title: "Data Analyst!", rank: "👑" }
];

export const DEFAULT_DATES = {
  startDate: new Date(),
  endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
};

export const DATE_FORMATS = {
  full: "dddd, DD MMMM YYYY",
  short: "DD/MM/YYYY",
  month: "MMMM YYYY",
  day: "DD MMM",
  time: "HH:mm",
  datetime: "DD/MM/YYYY HH:mm"
};

export const DURATION_STRINGS = {
  zero: "0 menit",
  short: "{{minutes}}m",
  medium: "{{hours}}j {{minutes}}m",
  long: "{{hours}} jam {{minutes}} menit"
};

export const PLACEHOLDER_IMAGES = {
  avatar: "/images/placeholder-avatar.png",
  project: "/images/placeholder-project.png",
  thumbnail: "/images/placeholder-thumbnail.png",
  banner: "/images/placeholder-banner.png"
};

export const SOCIAL_SHARE_MESSAGES = {
  streak: "Aku sudah belajar Data Analyst selama {{days}} hari berturut-turut! #DataAnalyst #BelajarData",
  project: "Aku baru selesai project Data Analyst: {{projectTitle}}! Cek hasilnya di portofolioku #DataAnalyst #Portfolio",
  graduate: "🎉 Aku sudah lulus program Data Analyst 6 bulan! Siap jadi Data Analyst profesional! #DataAnalyst #Graduate",
  quiz: "Aku dapat nilai {{score}} di quiz Data Analyst! #DataAnalyst #Learning"
};

export const CONTACT_EMAIL = "support@dataanalystlearning.com";
export const SOCIAL_MEDIA = {
  linkedin: "https://linkedin.com/company/dataanalystlearning",
  instagram: "https://instagram.com/dataanalystlearning",
  youtube: "https://youtube.com/dataanalystlearning",
  twitter: "https://twitter.com/dataanalystlearn"
};
