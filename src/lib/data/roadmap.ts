import { MonthData } from '@/lib/types/roadmap.types';

export const ROADMAP_DATA: MonthData[] = [
  {
    month: 1,
    title: "Fondasi Excel & Statistika",
    subtitle: "Menguasai Excel dari Nol Sampai Mahir Data Analysis",
    learningObjectives: [
      "Memahami antarmuka Excel dan navigasi dasar",
      "Menguasai rumus dan fungsi Excel untuk analisis data",
      "Membuat pivot table untuk summarisasi data",
      "Memahami statistika deskriptif untuk analisis data",
      "Membuat dashboard interaktif dengan Excel",
      "Menguasai data cleaning dan data validation",
      "Membuat visualisasi data dasar dengan chart",
      "Menguasai VLOOKUP, XLOOKUP, dan INDEX-MATCH"
    ],
    skillsToMaster: [
      "Navigasi Excel tanpa mouse",
      "Rumus dasar (SUM, AVERAGE, COUNT, MAX, MIN, IF, SUMIF, COUNTIF)",
      "VLOOKUP, HLOOKUP, XLOOKUP, INDEX-MATCH",
      "Pivot Table dan Pivot Chart",
      "Conditional Formatting",
      "Data Validation",
      "Statistika Deskriptif (Mean, Median, Modus, Standar Deviasi)",
      "Dashboard Excel Interaktif",
      "Power Query Dasar",
      "Analisis Data dengan Excel"
    ],
    toolsUsed: ["Microsoft Excel", "Google Sheets"],
    weeks: [
      {
        week: 1,
        title: "Dasar Excel & Data Entry",
        description: "Mengenal Excel, navigasi, cell, row, column, worksheet, workbook, dan data entry",
        days: [
          {
            id: 1,
            month: 1,
            week: 1,
            day: 1,
            title: "Pengenalan Excel & Antarmuka",
            subtitle: "Mengenal Excel dari Nol Sampai Bisa Navigasi",
            schedule: {
              totalHours: 10,
              sessions: [
                {
                  session: 1,
                  time: "08:00 - 10:00",
                  duration: 120,
                  topic: "Apa Itu Excel & Sejarahnya",
                  isBreak: false,
                  subtopics: [
                    {
                      name: "1.1 Apa Itu Excel?",
                      content: "Excel adalah program spreadsheet dari Microsoft untuk mengolah data. Fungsi: mengorganisir, menghitung, menganalisis, dan memvisualisasikan data dalam bentuk tabel. Kegunaan: mengelola keuangan, analisis penjualan, HR data, marketing, project management, inventory, data cleaning. Perbandingan: Excel (berbayar, desktop+cloud, 1M+ baris) vs Google Sheets (gratis, cloud only, 500k baris) vs LibreOffice (gratis, desktop only, 100k baris).",
                      estimatedTime: 60,
                      difficulty: "beginner",
                      learningObjectives: ["Memahami definisi Excel", "Mengetahui kegunaan Excel", "Memahami perbedaan dengan tools lain"],
                      keywords: ["Excel", "spreadsheet", "data analysis"],
                      prerequisites: [],
                      examples: [
                        {
                          title: "Contoh Penggunaan Excel di Perusahaan",
                          description: "Laporan penjualan bulanan menggunakan pivot table dan chart"
                        }
                      ],
                      miniPractice: {
                        title: "Cari Tahu 5 Perusahaan yang Pakai Excel",
                        instructions: "Cari di internet 5 perusahaan besar yang menggunakan Excel dan jelaskan kegunaannya",
                        estimatedTime: 15
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    },
                    {
                      name: "1.2 Sejarah & Evolusi Excel",
                      content: "1985 Excel 1.0 (Mac). 1987 Excel 2.0 (Windows). 1993 Excel 5.0 (VBA). 1997 Excel 97 (Conditional Formatting). 2007 Excel 2007 (Ribbon, .xlsx). 2013 Excel 2013 (Power Query, Power Pivot). 2019 Excel 365 (Cloud, AI, Co-pilot). 750+ juta pengguna, 80% perusahaan Fortune 500 pakai Excel.",
                      estimatedTime: 45,
                      difficulty: "beginner",
                      learningObjectives: ["Memahami sejarah Excel", "Mengetahui evolusi fitur Excel"],
                      keywords: ["sejarah Excel", "evolusi Excel"],
                      prerequisites: [],
                      examples: [],
                      miniPractice: {
                        title: "Timeline Excel",
                        instructions: "Buat timeline singkat evolusi Excel di kertas",
                        estimatedTime: 10
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    },
                    {
                      name: "1.3 Instalasi & Persiapan",
                      content: "Cara install Excel: Microsoft 365 (berbayar ~Rp100.000/bulan), Excel Web (gratis di office.com), Trial 1 bulan, Alternatif Google Sheets atau LibreOffice. Spesifikasi minimal: RAM 4GB, Storage 5GB, OS Windows 10/11 atau MacOS 10.15+. Langkah install: kunjungi office.com, login Microsoft account, klik Install Office, download installer, jalankan, tunggu 5-10 menit, buka Excel.",
                      estimatedTime: 60,
                      difficulty: "beginner",
                      learningObjectives: ["Bisa menginstall Excel", "Memahami cara mendapatkan Excel"],
                      keywords: ["install Excel", "setup Excel"],
                      prerequisites: [],
                      examples: [],
                      miniPractice: {
                        title: "Install Excel",
                        instructions: "Install Excel pilih salah satu option di atas. Screenshot tampilan Excel pertama kamu.",
                        estimatedTime: 30
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    }
                  ],
                  resources: {
                    videos: [
                      {
                        id: "v1",
                        title: "Apa Itu Excel? - Pemahaman Dasar",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "12:30",
                        channel: "Belajar Excel Indonesia",
                        description: "Penjelasan singkat tentang apa itu Excel dan fungsinya",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: true,
                        watchOrder: 1,
                        hasSubtitles: true,
                        hasCaptions: true,
                        keyMoments: [
                          { timestamp: "02:30", description: "Pengertian Excel" },
                          { timestamp: "05:45", description: "Kegunaan Excel" },
                          { timestamp: "09:15", description: "Perbandingan dengan tools lain" }
                        ]
                      },
                      {
                        id: "v2",
                        title: "Sejarah Excel 1985-2024",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "18:45",
                        channel: "Excel History Channel",
                        description: "Perjalanan Excel dari pertama kali sampai sekarang",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: true,
                        watchOrder: 2
                      },
                      {
                        id: "v3",
                        title: "Excel vs Google Sheets vs LibreOffice",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "15:20",
                        channel: "Tech Comparison",
                        description: "Perbandingan lengkap 3 spreadsheet tools",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: false
                      }
                    ],
                    articles: [
                      {
                        id: "a1",
                        title: "Panduan Memilih Excel Version yang Tepat",
                        url: "https://support.microsoft.com/excel-versions",
                        platform: "Microsoft Support",
                        description: "Artikel resmi Microsoft tentang perbedaan versi Excel",
                        difficulty: "beginner",
                        language: "Indonesia",
                        readTime: 10,
                        isRequired: true
                      },
                      {
                        id: "a2",
                        title: "Apa Itu Spreadsheet? Definisi dan Manfaat",
                        url: "https://en.wikipedia.org/wiki/Spreadsheet",
                        platform: "Wikipedia",
                        description: "Penjelasan komprehensif tentang spreadsheet",
                        difficulty: "beginner",
                        language: "Inggris",
                        readTime: 15,
                        isRequired: false
                      },
                      {
                        id: "a3",
                        title: "Kenapa Excel Masih Jadi Raja Data Analyst",
                        url: "https://www.datacamp.com/blog/why-excel-still-matters",
                        platform: "DataCamp",
                        description: "Analisis mengapa Excel tetap relevan",
                        difficulty: "beginner",
                        language: "Inggris",
                        readTime: 12,
                        isRequired: false
                      }
                    ],
                    documentations: [
                      {
                        id: "d1",
                        title: "Microsoft Excel Official Documentation",
                        url: "https://support.microsoft.com/excel",
                        platform: "Microsoft",
                        description: "Dokumentasi resmi dari Microsoft",
                        version: "2024",
                        language: "Inggris",
                        isRequired: true,
                        focusSections: ["Getting Started", "Basic Tasks"],
                        depthLevel: "basic"
                      }
                    ],
                    interactives: [],
                    datasets: [],
                    templates: []
                  },
                  practice: {
                    id: "p1",
                    title: "Instalasi Excel & Buat File Pertama",
                    instructions: [
                      "Pilih salah satu cara instalasi di atas",
                      "Install Excel sampai selesai",
                      "Buka Excel → Pilih Blank Workbook",
                      "Lihat tampilan Excel (kenali ribbon, formula bar, dll)",
                      "Simpan file dengan nama Latihan 1 - Nama Kamu.xlsx",
                      "Ambil screenshot tampilan Excel kamu"
                    ],
                    objectives: ["Bisa menginstall Excel", "Bisa membuat file Excel pertama"],
                    estimatedTime: 30,
                    difficulty: "beginner",
                    category: "individual",
                    skillsPracticed: ["Instalasi", "Navigasi Dasar"],
                    toolsUsed: ["Microsoft Excel"],
                    evaluationCriteria: [
                      { criterion: "Excel berhasil terinstall", weight: 30, description: "Excel terbuka tanpa error" },
                      { criterion: "Blank workbook terbuka", weight: 20, description: "Workbook baru muncul" },
                      { criterion: "File berhasil disimpan", weight: 30, description: "File tersimpan di folder" },
                      { criterion: "Screenshot diambil", weight: 20, description: "Screenshot jelas" }
                    ],
                    tips: ["Kalau error saat install, coba restart komputer dulu"],
                    commonMistakes: ["Lupa menyimpan file", "Salah pilih folder penyimpanan"],
                    status: "not_started",
                    userNotes: "",
                    selfAssessment: 0
                  },
                  notes: "Fokus pada pemahaman dasar Excel, jangan terburu-buru",
                  tips: ["Baca artikel dokumentasi resmi dari Microsoft"],
                  keywords: ["Excel", "instalasi", "pengenalan"],
                  estimatedPracticeTime: 30,
                  additionalResources: []
                },
                {
                  session: 2,
                  time: "10:00 - 10:30",
                  duration: 30,
                  topic: "ISTIRAHAT",
                  isBreak: true,
                  subtopics: [],
                  resources: {
                    videos: [],
                    articles: [],
                    documentations: [],
                    interactives: [],
                    datasets: [],
                    templates: []
                  },
                  practice: null,
                  notes: "Minum air, stretching, istirahat mata",
                  breakDuration: 30,
                  breakActivity: "Minum air putih dan regangkan tubuh"
                },
                {
                  session: 3,
                  time: "10:30 - 12:30",
                  duration: 120,
                  topic: "Mengenal Antarmuka Excel",
                  isBreak: false,
                  subtopics: [
                    {
                      name: "2.1 Antarmuka Excel (Tour Lengkap)",
                      content: "Bagian-bagian utama Excel: Quick Access Toolbar (pojok kiri atas, shortcut Save Undo Redo), Title Bar (nama file, minimize maximize close), Ribbon (9 tab: File Home Insert Draw Page Layout Formulas Data Review View), Name Box (kiri formula bar, alamat cell aktif), Formula Bar (menampilkan dan mengedit isi cell), Worksheet Area (row angka 1-1048576, column huruf A-XFD), Status Bar (info status, zoom slider, view shortcuts). Tips: Tekan Alt untuk akses ribbon pake keyboard, double click tab untuk hide/show ribbon.",
                      estimatedTime: 60,
                      difficulty: "beginner",
                      learningObjectives: ["Mengenal semua bagian antarmuka Excel", "Memahami fungsi setiap bagian"],
                      keywords: ["antarmuka Excel", "ribbon", "formula bar", "status bar"],
                      prerequisites: [],
                      examples: [
                        {
                          title: "Tour Antarmuka Excel",
                          description: "Buka Excel dan identifikasi semua bagian yang disebutkan"
                        }
                      ],
                      miniPractice: {
                        title: "Identifikasi Antarmuka",
                        instructions: "Buka Excel, tunjukkan semua bagian antarmuka ke teman/keluarga",
                        estimatedTime: 10
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    },
                    {
                      name: "2.2 Navigasi Dasar",
                      content: "Cara navigasi di Excel: Mouse (klik cell, scroll, drag), Keyboard (panah, Ctrl+panah ke ujung data, Home ke A1, Ctrl+Home ke A1, Ctrl+End ke cell terakhir, Page Up/Down, Alt+Page Up/Down, Tab, Shift+Tab, Enter, Shift+Enter). Go To (F5 atau Ctrl+G). Name Box (ketik alamat cell langsung).",
                      estimatedTime: 45,
                      difficulty: "beginner",
                      learningObjectives: ["Menguasai navigasi Excel tanpa mouse", "Memahami shortcut keyboard"],
                      keywords: ["navigasi Excel", "shortcut keyboard", "go to"],
                      prerequisites: [],
                      examples: [
                        {
                          title: "Latihan Navigasi",
                          description: "Pindah ke Z100 pake Name Box, kembali A1 pake Ctrl+Home"
                        }
                      ],
                      miniPractice: {
                        title: "Navigasi Cepat",
                        instructions: "Buka blank workbook, pindah ke 10 cell berbeda tanpa mouse",
                        estimatedTime: 15
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    },
                    {
                      name: "2.3 Cell, Row, Column (Pengertian Dasar)",
                      content: "Cell = kotak terkecil di Excel, alamat = kombinasi Column + Row (A1, B5, Z100). Row = baris horizontal, angka 1-1048576. Column = kolom vertikal, huruf A-XFD (16384 column). Range = kumpulan cell (A1:C10). Cell aktif = cell yang dipilih (border tebal).",
                      estimatedTime: 45,
                      difficulty: "beginner",
                      learningObjectives: ["Memahami cell, row, column", "Memahami alamat cell dan range"],
                      keywords: ["cell", "row", "column", "range"],
                      prerequisites: [],
                      examples: [
                        {
                          title: "Alamat Cell",
                          description: "A1 = Kolom A Baris 1, Z100 = Kolom Z Baris 100"
                        }
                      ],
                      miniPractice: {
                        title: "Cari Alamat Cell",
                        instructions: "Cari alamat cell A1, B5, Z100, AA50, XFD1048576",
                        estimatedTime: 10
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    }
                  ],
                  resources: {
                    videos: [
                      {
                        id: "v4",
                        title: "Tour Lengkap Antarmuka Excel 2024",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "28:15",
                        channel: "Excel Tutorial Center",
                        description: "Penjelasan semua bagian Excel dengan visual",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: true,
                        watchOrder: 1
                      },
                      {
                        id: "v5",
                        title: "Shortcut Keyboard Excel yang Wajib Diketahui",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "22:30",
                        channel: "Excel Shortcut Pro",
                        description: "Kumpulan shortcut untuk navigasi cepat",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: true,
                        watchOrder: 2
                      }
                    ],
                    articles: [
                      {
                        id: "a4",
                        title: "Panduan Lengkap Antarmuka Excel",
                        url: "https://www.excel-easy.com/basics/",
                        platform: "Excel Easy",
                        description: "Tutorial interaktif tentang bagian-bagian Excel",
                        difficulty: "beginner",
                        language: "Inggris",
                        readTime: 15,
                        isRequired: true
                      },
                      {
                        id: "a5",
                        title: "Cara Navigasi di Excel yang Efektif",
                        url: "https://support.microsoft.com/navigation-tips",
                        platform: "Microsoft Support",
                        description: "Tips navigasi dari Microsoft",
                        difficulty: "beginner",
                        language: "Indonesia",
                        readTime: 10,
                        isRequired: true
                      }
                    ],
                    documentations: [
                      {
                        id: "d2",
                        title: "Excel Keyboard Shortcuts",
                        url: "https://support.microsoft.com/keyboard-shortcuts",
                        platform: "Microsoft",
                        description: "Daftar lengkap shortcut Excel",
                        version: "2024",
                        language: "Inggris",
                        isRequired: true,
                        focusSections: ["Navigation", "Selection"],
                        depthLevel: "basic"
                      }
                    ],
                    interactives: [],
                    datasets: [],
                    templates: []
                  },
                  practice: {
                    id: "p2",
                    title: "Latihan Navigasi & Mengenal Antarmuka",
                    instructions: [
                      "Buka Excel → Blank Workbook",
                      "Identifikasi semua bagian antarmuka",
                      "Praktekkan navigasi ke 20 cell berbeda tanpa mouse",
                      "Praktekkan selection: range A1:E10, seluruh row 5, seluruh column C, non-adjacent cells",
                      "Catat semua shortcut yang kamu pake"
                    ],
                    objectives: ["Bisa navigasi tanpa mouse", "Mengenal semua bagian antarmuka"],
                    estimatedTime: 45,
                    difficulty: "beginner",
                    category: "individual",
                    skillsPracticed: ["Navigasi", "Selection"],
                    toolsUsed: ["Microsoft Excel"],
                    evaluationCriteria: [
                      { criterion: "Bisa pindah ke 20 cell tanpa mouse", weight: 25, description: "Menggunakan shortcut keyboard" },
                      { criterion: "Tahu nama semua bagian antarmuka", weight: 25, description: "Bisa menyebutkan semua bagian" },
                      { criterion: "Bisa pilih range dengan cepat", weight: 25, description: "Drag atau shortcut" },
                      { criterion: "Bisa pilih non-adjacent cells", weight: 25, description: "Menggunakan Ctrl+click" }
                    ],
                    tips: ["Tulis daftar shortcut di sticky note", "Praktek berulang sampai hafal"],
                    commonMistakes: ["Terlalu banyak pake mouse", "Lupa shortcut yang baru dipelajari"],
                    status: "not_started",
                    userNotes: "",
                    selfAssessment: 0
                  },
                  notes: "",
                  tips: ["Hafalkan shortcut navigasi", "Praktek tanpa mouse"],
                  keywords: ["antarmuka", "navigasi", "shortcut"],
                  estimatedPracticeTime: 45,
                  additionalResources: []
                },
                {
                  session: 4,
                  time: "12:30 - 13:30",
                  duration: 60,
                  topic: "ISTIRAHAT (Makan Siang)",
                  isBreak: true,
                  subtopics: [],
                  resources: {
                    videos: [],
                    articles: [],
                    documentations: [],
                    interactives: [],
                    datasets: [],
                    templates: []
                  },
                  practice: null,
                  notes: "Makan siang, istirahat, recharge energi",
                  breakDuration: 60,
                  breakActivity: "Makan siang dan istirahat dari layar"
                },
                {
                  session: 5,
                  time: "13:30 - 15:30",
                  duration: 120,
                  topic: "Worksheet & Workbook",
                  isBreak: false,
                  subtopics: [
                    {
                      name: "3.1 Memahami Workbook vs Worksheet",
                      content: "Workbook = file Excel (Laporan.xlsx) bisa berisi banyak worksheet. Worksheet = lembar kerja di dalam workbook, tab di bagian bawah. Default 3 sheet (Sheet1, Sheet2, Sheet3). Fungsi multi-worksheet: pisahkan data per kategori, buat summary dari banyak sheet, dashboard di sheet terpisah. Kapasitas: 1 workbook = 1048576 row × 16384 column, unlimited worksheets tergantung memory.",
                      estimatedTime: 60,
                      difficulty: "beginner",
                      learningObjectives: ["Memahami perbedaan workbook dan worksheet", "Memahami multi-worksheet"],
                      keywords: ["workbook", "worksheet", "sheet"],
                      prerequisites: [],
                      examples: [
                        {
                          title: "Workbook Laporan Keuangan 2024",
                          description: "Sheet1 Data Penjualan, Sheet2 Rekap per Bulan, Sheet3 Dashboard"
                        }
                      ],
                      miniPractice: {
                        title: "Buat Workbook Multi-Sheet",
                        instructions: "Buat workbook dengan 3 sheet: Data, Analisis, Dashboard",
                        estimatedTime: 15
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    },
                    {
                      name: "3.2 Operasi Workbook & Worksheet",
                      content: "Membuat workbook baru: Ctrl+N. Menyimpan: Ctrl+S (5 menit sekali!). Format file: .xlsx (standar), .xlsm (macro), .xls (jadul), .csv (text-only). Menambah worksheet: ikon +, Shift+F11, klik kanan Insert. Rename: double click tab. Move: drag tab. Delete: klik kanan Delete. Hide: klik kanan Hide. Color tab: klik kanan Tab Color.",
                      estimatedTime: 45,
                      difficulty: "beginner",
                      learningObjectives: ["Bisa membuat dan menyimpan workbook", "Bisa mengelola worksheet"],
                      keywords: ["workbook", "worksheet", "save", "rename"],
                      prerequisites: [],
                      examples: [
                        {
                          title: "Buat Workbook dengan 10 Sheet",
                          description: "Buat sheet Jan-Des, Summary, Dashboard"
                        }
                      ],
                      miniPractice: {
                        title: "Kelola 10 Sheet",
                        instructions: "Buat 10 sheet, rename, beri warna, pindah posisi",
                        estimatedTime: 20
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    },
                    {
                      name: "3.3 AutoSave & Version History",
                      content: "AutoSave: menyimpan otomatis ke OneDrive/SharePoint setiap detik. Aktifkan di Quick Access Toolbar. Version History: File → Info → Version History → pilih versi → Restore. Recover Unsaved Workbooks: File → Open → Recent → Recover Unsaved Workbooks.",
                      estimatedTime: 30,
                      difficulty: "beginner",
                      learningObjectives: ["Memahami AutoSave", "Bisa restore versi sebelumnya"],
                      keywords: ["autosave", "version history", "recover"],
                      prerequisites: [],
                      examples: [],
                      miniPractice: {
                        title: "Coba AutoSave",
                        instructions: "Simpan file ke OneDrive, aktifkan AutoSave, lihat Version History",
                        estimatedTime: 10
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    }
                  ],
                  resources: {
                    videos: [
                      {
                        id: "v6",
                        title: "Cara Membuat dan Menyimpan Workbook",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "15:40",
                        channel: "Excel Dasar Indonesia",
                        description: "Tutorial membuat, menyimpan, mengelola workbook",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: true,
                        watchOrder: 1
                      },
                      {
                        id: "v7",
                        title: "Tips Mengelola Banyak Worksheet",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "12:20",
                        channel: "Excel Management",
                        description: "Cara efisien mengelola banyak sheet",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: true,
                        watchOrder: 2
                      }
                    ],
                    articles: [
                      {
                        id: "a6",
                        title: "Cara Mengelola Workbook dan Worksheet",
                        url: "https://www.excelcampus.com/workbook-management",
                        platform: "Excel Campus",
                        description: "Panduan lengkap pengelolaan file Excel",
                        difficulty: "beginner",
                        language: "Inggris",
                        readTime: 12,
                        isRequired: true
                      }
                    ],
                    documentations: [
                      {
                        id: "d3",
                        title: "Workbook vs Worksheet - Official Docs",
                        url: "https://support.microsoft.com/workbook-worksheet",
                        platform: "Microsoft",
                        description: "Penjelasan resmi dari Microsoft",
                        version: "2024",
                        language: "Inggris",
                        isRequired: true,
                        focusSections: ["Workbook Basics", "Worksheet Basics"],
                        depthLevel: "basic"
                      }
                    ],
                    interactives: [],
                    datasets: [],
                    templates: []
                  },
                  practice: {
                    id: "p3",
                    title: "Buat Workbook dengan 10 Sheet",
                    instructions: [
                      "Buat workbook baru Manajemen_Data.xlsx",
                      "Buat 10 worksheet: Januari-Mei, Summary, Dashboard, Data, Analisis, Report",
                      "Ubah warna tab: Q1 (Jan-Mar) biru, Q2 (Apr-Jun) hijau, Q3 (Jul-Sep) kuning",
                      "Simpan file di folder Excel_Belajar"
                    ],
                    objectives: ["Bisa membuat banyak sheet", "Bisa mengelola sheet"],
                    estimatedTime: 40,
                    difficulty: "beginner",
                    category: "individual",
                    skillsPracticed: ["Workbook Management", "Worksheet Management"],
                    toolsUsed: ["Microsoft Excel"],
                    evaluationCriteria: [
                      { criterion: "10 sheet dengan nama yang benar", weight: 30, description: "Semua sheet ter-rename" },
                      { criterion: "Warna tab sesuai kategori", weight: 30, description: "Warna sesuai ketentuan" },
                      { criterion: "File tersimpan dengan benar", weight: 20, description: "File di folder yang benar" },
                      { criterion: "Bisa navigasi antar sheet cepat", weight: 20, description: "Pake Ctrl+Page Up/Down" }
                    ],
                    tips: ["Gunakan Ctrl+Page Up/Down untuk pindah sheet cepat"],
                    commonMistakes: ["Lupa rename sheet", "Lupa simpan file"],
                    status: "not_started",
                    userNotes: "",
                    selfAssessment: 0
                  },
                  notes: "",
                  tips: ["Ctrl+S setiap 5 menit", "Simpan di OneDrive untuk backup"],
                  keywords: ["workbook", "worksheet", "management"],
                  estimatedPracticeTime: 40,
                  additionalResources: []
                },
                {
                  session: 6,
                  time: "15:30 - 16:00",
                  duration: 30,
                  topic: "ISTIRAHAT",
                  isBreak: true,
                  subtopics: [],
                  resources: {
                    videos: [],
                    articles: [],
                    documentations: [],
                    interactives: [],
                    datasets: [],
                    templates: []
                  },
                  practice: null,
                  notes: "Minum air, stretching, istirahat mata",
                  breakDuration: 30,
                  breakActivity: "Minum air putih dan regangkan tubuh"
                },
                {
                  session: 7,
                  time: "16:00 - 18:00",
                  duration: 120,
                  topic: "Format Cell & Data Entry",
                  isBreak: false,
                  subtopics: [
                    {
                      name: "4.1 Format Cell (Dasar)",
                      content: "Format cell = cara Excel menampilkan data. Jenis: General (default), Number (desimal, ribuan separator), Currency (Rp, $, €), Accounting (rata kiri), Date (01/01/2024, 1 Jan 2024), Time (08:00), Percentage (50%), Text (semua dianggap teks), Scientific (1.23E+10). Cara ubah: Home → Number group dropdown, Ctrl+1, Ctrl+Shift+1 (Number), Ctrl+Shift+2 (Time), Ctrl+Shift+3 (Date), Ctrl+Shift+4 (Currency), Ctrl+Shift+5 (Percentage). Custom format bisa bikin sendiri.",
                      estimatedTime: 60,
                      difficulty: "beginner",
                      learningObjectives: ["Memahami jenis format cell", "Bisa mengubah format cell"],
                      keywords: ["format cell", "number format", "currency", "date"],
                      prerequisites: [],
                      examples: [
                        {
                          title: "Format Gaji Karyawan",
                          description: "Rp1.000.000,00 menggunakan Currency format"
                        }
                      ],
                      miniPractice: {
                        title: "Coba Semua Format",
                        instructions: "Input angka 1000, coba semua format yang tersedia",
                        estimatedTime: 15
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    },
                    {
                      name: "4.2 Data Entry (Cara Input Data)",
                      content: "Cara input: klik cell → ketik → Enter/Tab/Shift+Tab/panah. Jenis data: Text (rata kiri), Number (rata kanan), Date, Time, Formula (mulai =), Boolean (TRUE/FALSE). Auto-fill: drag handle (kotak kecil pojok kanan bawah). Data Validation: Data → Data Validation → List → buat dropdown. Tips: pake Tab untuk input data berurutan, Ctrl+D copy dari atas, Ctrl+R copy dari kiri.",
                      estimatedTime: 45,
                      difficulty: "beginner",
                      learningObjectives: ["Bisa input data dengan cepat", "Membuat dropdown validation"],
                      keywords: ["data entry", "auto-fill", "data validation", "dropdown"],
                      prerequisites: [],
                      examples: [
                        {
                          title: "Dropdown Departemen",
                          description: "Buat dropdown HRD, IT, Marketing, Finance"
                        }
                      ],
                      miniPractice: {
                        title: "Buat Data Entry Form",
                        instructions: "Buat form dengan dropdown, validasi, auto-fill",
                        estimatedTime: 20
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    },
                    {
                      name: "4.3 Conditional Formatting (Dasar)",
                      content: "Conditional Formatting = mengubah format cell berdasarkan kondisi. Jenis: Highlight Cell Rules (Greater Than, Less Than, Between, Equal To, Text That Contains, Duplicate Values), Top/Bottom Rules (Top 10, Top 10%, Bottom 10, Above/Below Average), Data Bars (bar grafis di cell), Color Scales (gradasi warna), Icon Sets (✅ ❌ ⚠️). Cara: Home → Conditional Formatting → pilih aturan → atur parameter.",
                      estimatedTime: 45,
                      difficulty: "beginner",
                      learningObjectives: ["Memahami conditional formatting", "Bisa menerapkan conditional formatting"],
                      keywords: ["conditional formatting", "highlight", "data bars", "color scales"],
                      prerequisites: [],
                      examples: [
                        {
                          title: "Tandai Gaji > 10 Juta",
                          description: "Gunakan Highlight Cell Rules > Greater Than > 10000000"
                        }
                      ],
                      miniPractice: {
                        title: "Conditional Formatting Latihan",
                        instructions: "Buat data 20 angka, tandai >100 hijau, <50 merah, 50-100 kuning",
                        estimatedTime: 15
                      },
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    }
                  ],
                  resources: {
                    videos: [
                      {
                        id: "v8",
                        title: "Cara Format Cell di Excel (Lengkap)",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "32:10",
                        channel: "Excel Formatting Master",
                        description: "Semua jenis format cell dengan contoh",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: true,
                        watchOrder: 1
                      },
                      {
                        id: "v9",
                        title: "Data Entry Tips & Trik di Excel",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "18:45",
                        channel: "Excel Data Entry Pro",
                        description: "Cara input data cepat dan akurat",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: true,
                        watchOrder: 2
                      }
                    ],
                    articles: [
                      {
                        id: "a7",
                        title: "Panduan Format Cell Excel",
                        url: "https://www.exceljet.net/format-cells",
                        platform: "Excel Jet",
                        description: "Referensi lengkap format cell",
                        difficulty: "beginner",
                        language: "Inggris",
                        readTime: 15,
                        isRequired: true
                      },
                      {
                        id: "a8",
                        title: "Data Validation untuk Pemula",
                        url: "https://www.excelcampus.com/data-validation",
                        platform: "Excel Campus",
                        description: "Cara membuat dropdown dan validasi data",
                        difficulty: "beginner",
                        language: "Inggris",
                        readTime: 12,
                        isRequired: true
                      }
                    ],
                    documentations: [
                      {
                        id: "d4",
                        title: "Conditional Formatting Official",
                        url: "https://support.microsoft.com/conditional-formatting",
                        platform: "Microsoft",
                        description: "Dokumentasi resmi conditional formatting",
                        version: "2024",
                        language: "Inggris",
                        isRequired: true,
                        focusSections: ["Highlight Rules", "Top/Bottom Rules", "Data Bars"],
                        depthLevel: "basic"
                      }
                    ],
                    interactives: [],
                    datasets: [],
                    templates: []
                  },
                  practice: {
                    id: "p4",
                    title: "Buat Form Input dengan Format & Validasi",
                    instructions: [
                      "Buat form data karyawan dengan 8 kolom: NIK (Text), Nama Lengkap (Text), Tanggal Lahir (Date), Jenis Kelamin (Dropdown Laki-laki/Perempuan), Departemen (Dropdown HRD/IT/Marketing/Finance), Gaji (Currency Rp), Tanggal Masuk (Date), Status (Dropdown Tetap/Kontrak/Magang)",
                      "NIK: Text format biar 001 tetap 001",
                      "Gaji: Currency Rp",
                      "Tanggal: Date format 01-Jan-2024",
                      "Header: Bold, Background biru, Text putih",
                      "Data Validation untuk semua dropdown",
                      "Conditional Formatting: Gaji > 10.000.000 hijau, Gaji < 5.000.000 merah, Status Tetap bold"
                    ],
                    objectives: ["Bisa membuat form dengan format dan validasi", "Bisa menerapkan conditional formatting"],
                    estimatedTime: 90,
                    difficulty: "beginner",
                    category: "individual",
                    skillsPracticed: ["Format Cell", "Data Validation", "Conditional Formatting"],
                    toolsUsed: ["Microsoft Excel"],
                    evaluationCriteria: [
                      { criterion: "8 kolom dengan format yang benar", weight: 20, description: "Semua format sesuai" },
                      { criterion: "3 dropdown validation berfungsi", weight: 20, description: "Dropdown bisa dipilih" },
                      { criterion: "Conditional formatting berjalan", weight: 20, description: "Warna berubah otomatis" },
                      { criterion: "Form rapi dan mudah dibaca", weight: 20, description: "Design profesional" },
                      { criterion: "Header sesuai ketentuan", weight: 20, description: "Bold, biru, putih" }
                    ],
                    tips: ["Kerjakan step by step", "Kalau error coba ulangi dari awal"],
                    commonMistakes: ["Lupa format cell", "Salah syntax conditional formatting"],
                    status: "not_started",
                    userNotes: "",
                    selfAssessment: 0
                  },
                  notes: "",
                  tips: ["Simpan template form untuk dipakai besok"],
                  keywords: ["format cell", "data entry", "conditional formatting"],
                  estimatedPracticeTime: 90,
                  additionalResources: []
                },
                {
                  session: 8,
                  time: "18:00 - 19:00",
                  duration: 60,
                  topic: "REVIEW, QUIZ, & REFLEKSI",
                  isBreak: false,
                  subtopics: [
                    {
                      name: "5.1 Review Materi Hari Ini",
                      content: "Yang sudah dipelajari: Apa itu Excel dan sejarahnya, antarmuka Excel (QAT, Ribbon, Formula Bar, Name Box, Status Bar), navigasi (shortcut keyboard, Go To), cell row column, workbook vs worksheet, operasi workbook (save, rename, add, delete, move, color), format cell (Number, Currency, Date, Text), data entry (auto-fill, data validation), conditional formatting (highlight rules, data bars, color scales). Skills: navigasi tanpa mouse, membuat mengelola workbook, mengubah format cell, input data cepat, dropdown validation, conditional formatting.",
                      estimatedTime: 30,
                      difficulty: "beginner",
                      learningObjectives: ["Mereview semua materi hari ini", "Mengidentifikasi yang sudah dan belum paham"],
                      keywords: ["review", "recap", "summary"],
                      prerequisites: [],
                      examples: [],
                      miniPractice: null,
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    },
                    {
                      name: "5.2 Topik yang Perlu Diulang (Nanti)",
                      content: "Materi yang biasanya sulit: Custom Number Format (kode #, 0, @), Data Validation dengan formula, Conditional Formatting dengan formula (pake = untuk aturan custom). Rekomendasi besok: ulangi shortcut navigasi 5 menit di pagi hari, buat ringkasan 1 halaman tentang antarmuka, praktik buka-tutup Excel 5 kali.",
                      estimatedTime: 15,
                      difficulty: "beginner",
                      learningObjectives: ["Mengidentifikasi topik yang perlu diulang", "Membuat rencana belajar besok"],
                      keywords: ["review", "needs review", "plan"],
                      prerequisites: [],
                      examples: [],
                      miniPractice: null,
                      additionalResources: [],
                      understandingStatus: "not_started",
                      personalNotes: ""
                    }
                  ],
                  resources: {
                    videos: [
                      {
                        id: "v10",
                        title: "Review Cepat: 10 Skill Excel Hari Pertama",
                        url: "https://youtu.be/dQw4w9WgXcQ",
                        platform: "youtube",
                        duration: "15:00",
                        channel: "Excel Review",
                        description: "Ringkasan cepat semua materi hari ini",
                        difficulty: "beginner",
                        language: "Indonesia",
                        isRequired: true,
                        watchOrder: 1
                      }
                    ],
                    articles: [],
                    documentations: [],
                    interactives: [],
                    datasets: [],
                    templates: []
                  },
                  practice: null,
                  notes: "Jangan khawatir kalau lupa! Excel dipelajari sambil dipraktekkan.",
                  tips: ["Buat ringkasan catatan", "Tandai yang perlu diulang"],
                  keywords: ["review", "quiz", "reflection"],
                  estimatedPracticeTime: 0,
                  additionalResources: []
                }
              ]
            },
            quiz: {
              id: "q1",
              title: "Quiz Hari ke-1: Pengenalan Excel",
              description: "Test pemahaman tentang Excel, antarmuka, navigasi, worksheet, dan format cell",
              questions: [
                {
                  id: "q1",
                  type: "multiple_choice",
                  question: "Apa fungsi dari Quick Access Toolbar?",
                  options: ["A. Menampilkan formula di cell", "B. Akses cepat ke perintah yang sering digunakan", "C. Menampilkan chart", "D. Mengatur print layout"],
                  correctAnswer: "B",
                  explanation: "Quick Access Toolbar (QAT) adalah toolbar kecil di pojok kiri atas yang bisa dikustomisasi dengan perintah yang sering digunakan seperti Save, Undo, Redo.",
                  difficulty: "easy",
                  points: 10,
                  category: "Antarmuka",
                  relatedSubtopic: "2.1 Antarmuka Excel",
                  hint: "Lihat bagian Quick Access Toolbar di materi antarmuka"
                },
                {
                  id: "q2",
                  type: "multiple_choice",
                  question: "Berapa total row di Excel versi terbaru?",
                  options: ["A. 65.536", "B. 1.048.576", "C. 16.384", "D. 10.000"],
                  correctAnswer: "B",
                  explanation: "Excel versi 2007 ke atas memiliki 1.048.576 row (baris) dan 16.384 column (kolom).",
                  difficulty: "easy",
                  points: 10,
                  category: "Cell Row Column",
                  relatedSubtopic: "2.3 Cell, Row, Column",
                  hint: "Ingat materi tentang kapasitas Excel"
                },
                {
                  id: "q3",
                  type: "multiple_choice",
                  question: "Shortcut untuk pindah ke cell A1 adalah...",
                  options: ["A. Ctrl + A", "B. Ctrl + Home", "C. Alt + A1", "D. Shift + A1"],
                  correctAnswer: "B",
                  explanation: "Ctrl + Home selalu membawa kamu ke cell A1 di worksheet apapun.",
                  difficulty: "easy",
                  points: 10,
                  category: "Navigasi",
                  relatedSubtopic: "2.2 Navigasi Dasar",
                  hint: "Ingat shortcut navigasi dasar"
                },
                {
                  id: "q4",
                  type: "multiple_choice",
                  question: "Apa perbedaan workbook dan worksheet?",
                  options: ["A. Workbook adalah file, worksheet adalah lembar di dalamnya", "B. Worksheet adalah file, workbook adalah lembar di dalamnya", "C. Workbook dan worksheet sama saja", "D. Workbook untuk angka, worksheet untuk teks"],
                  correctAnswer: "A",
                  explanation: "Workbook adalah file Excel (.xlsx) yang bisa berisi banyak worksheet (sheet).",
                  difficulty: "medium",
                  points: 10,
                  category: "Workbook Worksheet",
                  relatedSubtopic: "3.1 Memahami Workbook vs Worksheet",
                  hint: "Ingat perbedaan workbook dan worksheet"
                },
                {
                  id: "q5",
                  type: "multiple_choice",
                  question: "Apa yang terjadi kalau cell diformat sebagai Text?",
                  options: ["A. Angka tetap bisa dihitung", "B. Angka dianggap sebagai teks dan tidak bisa dihitung", "C. Semua data otomatis menjadi huruf kapital", "D. Cell tidak bisa diisi apa-apa"],
                  correctAnswer: "B",
                  explanation: "Format Text membuat Excel menganggap semua input sebagai teks, termasuk angka. Angka tidak bisa dihitung sampai diformat ulang.",
                  difficulty: "medium",
                  points: 10,
                  category: "Format Cell",
                  relatedSubtopic: "4.1 Format Cell (Dasar)",
                  hint: "Ingat jenis-jenis format cell"
                },
                {
                  id: "q6",
                  type: "multiple_choice",
                  question: "Fungsi Data Validation adalah...",
                  options: ["A. Menghapus data yang salah", "B. Membatasi apa yang bisa diinput di cell", "C. Menyimpan data ke database", "D. Membuat grafik otomatis"],
                  correctAnswer: "B",
                  explanation: "Data Validation digunakan untuk membatasi tipe data atau nilai yang bisa dimasukkan ke cell, misalnya membuat dropdown list.",
                  difficulty: "medium",
                  points: 10,
                  category: "Data Entry",
                  relatedSubtopic: "4.2 Data Entry",
                  hint: "Ingat fungsi Data Validation"
                },
                {
                  id: "q7",
                  type: "multiple_choice",
                  question: "Apa nama fitur yang mengubah format cell berdasarkan kondisi?",
                  options: ["A. AutoFormat", "B. Conditional Formatting", "C. Format Painter", "D. Cell Styles"],
                  correctAnswer: "B",
                  explanation: "Conditional Formatting mengubah tampilan cell (warna, font, dll) berdasarkan aturan atau kondisi yang kita tentukan.",
                  difficulty: "medium",
                  points: 10,
                  category: "Conditional Formatting",
                  relatedSubtopic: "4.3 Conditional Formatting",
                  hint: "Ingat fitur untuk format otomatis berdasarkan aturan"
                },
                {
                  id: "q8",
                  type: "multiple_choice",
                  question: "Shortcut untuk menyimpan file Excel adalah...",
                  options: ["A. Ctrl + C", "B. Ctrl + V", "C. Ctrl + S", "D. Ctrl + X"],
                  correctAnswer: "C",
                  explanation: "Ctrl + S adalah shortcut universal untuk menyimpan file di semua aplikasi, termasuk Excel.",
                  difficulty: "easy",
                  points: 10,
                  category: "Workbook",
                  relatedSubtopic: "3.2 Operasi Workbook",
                  hint: "Shortcut save di semua aplikasi"
                },
                {
                  id: "q9",
                  type: "multiple_choice",
                  question: "Bagian mana yang menunjukkan alamat cell aktif?",
                  options: ["A. Formula Bar", "B. Status Bar", "C. Name Box", "D. Quick Access Toolbar"],
                  correctAnswer: "C",
                  explanation: "Name Box (di kiri Formula Bar) menunjukkan alamat cell yang sedang aktif, contoh: A1, B5, Z100.",
                  difficulty: "easy",
                  points: 10,
                  category: "Antarmuka",
                  relatedSubtopic: "2.1 Antarmuka Excel",
                  hint: "Lihat bagian Name Box di materi antarmuka"
                },
                {
                  id: "q10",
                  type: "multiple_choice",
                  question: "Excel pertama kali dirilis untuk sistem operasi apa?",
                  options: ["A. Windows", "B. Macintosh", "C. Linux", "D. DOS"],
                  correctAnswer: "B",
                  explanation: "Excel 1.0 pertama kali dirilis untuk Macintosh pada tahun 1985, kemudian versi Windows keluar pada 1987.",
                  difficulty: "hard",
                  points: 10,
                  category: "Sejarah",
                  relatedSubtopic: "1.2 Sejarah & Evolusi Excel",
                  hint: "Ingat sejarah Excel"
                },
                {
                  id: "q11",
                  type: "multiple_choice",
                  question: "Apa fungsi dari Conditional Formatting 'Data Bars'?",
                  options: ["A. Menampilkan bar grafis di dalam cell", "B. Membuat chart baru", "C. Mengubah data menjadi grafik batang", "D. Menghitung rata-rata data"],
                  correctAnswer: "A",
                  explanation: "Data Bars menampilkan bar grafis di dalam cell yang panjangnya sesuai dengan nilai cell. Semakin besar nilai, semakin panjang bar.",
                  difficulty: "medium",
                  points: 10,
                  category: "Conditional Formatting",
                  relatedSubtopic: "4.3 Conditional Formatting",
                  hint: "Ingat jenis-jenis conditional formatting"
                },
                {
                  id: "q12",
                  type: "multiple_choice",
                  question: "File Excel dengan macro memiliki ekstensi...",
                  options: ["A. .xlsx", "B. .xlsm", "C. .xlsb", "D. .csv"],
                  correctAnswer: "B",
                  explanation: ".xlsm adalah format Excel yang mendukung macro (kode VBA). .xlsx adalah format standar tanpa macro.",
                  difficulty: "medium",
                  points: 10,
                  category: "Workbook",
                  relatedSubtopic: "3.2 Operasi Workbook",
                  hint: "Ingat format file Excel"
                },
                {
                  id: "q13",
                  type: "multiple_choice",
                  question: "Cara cepat pindah antar worksheet adalah...",
                  options: ["A. Ctrl + Page Up/Down", "B. Ctrl + Tab", "C. Alt + Tab", "D. Shift + Tab"],
                  correctAnswer: "A",
                  explanation: "Ctrl + Page Up untuk pindah ke sheet kiri, Ctrl + Page Down untuk pindah ke sheet kanan.",
                  difficulty: "medium",
                  points: 10,
                  category: "Navigasi",
                  relatedSubtopic: "3.2 Operasi Worksheet",
                  hint: "Ingat shortcut pindah antar sheet"
                },
                {
                  id: "q14",
                  type: "multiple_choice",
                  question: "Apa yang dimaksud dengan range di Excel?",
                  options: ["A. Satu cell saja", "B. Kumpulan cell yang dipilih", "C. Seluruh worksheet", "D. Seluruh workbook"],
                  correctAnswer: "B",
                  explanation: "Range adalah kumpulan cell yang terdiri dari minimal 2 cell, contoh: A1:A10 atau B2:D5.",
                  difficulty: "easy",
                  points: 10,
                  category: "Cell Row Column",
                  relatedSubtopic: "2.3 Cell, Row, Column",
                  hint: "Ingat definisi range"
                },
                {
                  id: "q15",
                  type: "multiple_choice",
                  question: "Di mana letak tombol untuk menambah sheet baru?",
                  options: ["A. Di menu File", "B. Di sebelah kanan tab sheet terakhir (ikon '+')", "C. Di Quick Access Toolbar", "D. Di Formula Bar"],
                  correctAnswer: "B",
                  explanation: "Ikon '+' di sebelah kanan tab sheet terakhir adalah cara termudah untuk menambah sheet baru. Bisa juga dengan Shift+F11.",
                  difficulty: "easy",
                  points: 10,
                  category: "Worksheet",
                  relatedSubtopic: "3.2 Operasi Worksheet",
                  hint: "Lihat bagian bawah Excel"
                }
              ],
              passingScore: 70,
              totalPoints: 150,
              timeLimit: 30,
              maxAttempts: 3,
              difficulty: "beginner",
              topicsTested: ["Antarmuka Excel", "Navigasi", "Cell Row Column", "Workbook Worksheet", "Format Cell", "Data Entry", "Conditional Formatting"],
              tips: ["Baca soal dengan teliti", "Kerjakan yang mudah dulu", "Jangan terburu-buru"],
              isRequired: true
            },
            assignment: {
              id: "a1",
              title: "Buat Workbook dengan Data Sample & Format Lengkap",
              description: "Buat sebuah workbook yang berisi data sample dan menerapkan semua yang sudah dipelajari hari ini.",
              objectives: [
                "Menerapkan semua materi hari 1",
                "Membuat workbook terstruktur",
                "Menggunakan format dan validasi yang benar",
                "Menerapkan conditional formatting"
              ],
              instructions: [
                "Buat workbook baru dengan nama Tugas_Hari1_NamaKamu.xlsx",
                "Buat minimal 3 worksheet: Data_Karyawan, Analisis, Dashboard",
                "Data_Karyawan: 10 data dengan kolom NIK, Nama, Tanggal Lahir, Departemen, Gaji, Status",
                "Analisis: summary data (total per departemen, rata-rata gaji, gaji tertinggi, gaji terendah)",
                "Dashboard: chart dan conditional formatting"
              ],
              deliverables: [
                { name: "File Excel", description: "File .xlsx dengan 3 worksheet", format: ".xlsx", isRequired: true },
                { name: "Screenshot", description: "Screenshot workbook jika diperlukan", format: ".png", isRequired: false }
              ],
              estimatedTime: "90 menit",
              difficulty: "beginner",
              skillsTested: ["Format Cell", "Data Validation", "Conditional Formatting", "Workbook Management", "Data Entry"],
              toolsUsed: ["Microsoft Excel"],
              evaluationCriteria: [
                { criterion: "Semua kolom ada dan terisi", weight: 15, description: "Data lengkap 10 karyawan" },
                { criterion: "Format cell sesuai ketentuan", weight: 15, description: "NIK Text, Tanggal Date, Gaji Currency" },
                { criterion: "Data Validation berfungsi", weight: 15, description: "Dropdown Departemen dan Status" },
                { criterion: "Conditional Formatting berjalan", weight: 15, description: "Warna sesuai aturan" },
                { criterion: "Workbook terstruktur dengan rapi", weight: 15, description: "3 worksheet dengan fungsi berbeda" },
                { criterion: "Ada chart di worksheet Dashboard", weight: 15, description: "Chart dari data" },
                { criterion: "File tersimpan dengan nama yang benar", weight: 10, description: "Nama file sesuai" }
              ],
              tips: ["Kerjakan step by step", "Periksa semua format", "Pastikan semua validation berfungsi"],
              commonMistakes: ["Lupa format cell", "Validation error", "Conditional formatting salah"],
              deadlineDays: 1,
              isRequired: true
            },
            reflection: {
              id: "r1",
              dayId: 1,
              questions: [
                { id: "rq1", question: "Apa yang paling mudah dipahami hari ini?", type: "text", isRequired: true },
                { id: "rq2", question: "Apa yang paling sulit? Mengapa?", type: "text", isRequired: true },
                { id: "rq3", question: "Apa yang ingin dipelajari lebih dalam?", type: "text", isRequired: false },
                { id: "rq4", question: "Seberapa fokus kamu belajar hari ini? (1-10)", type: "rating", isRequired: true },
                { id: "rq5", question: "Apa gangguan terbesar hari ini?", type: "text", isRequired: false },
                { id: "rq6", question: "Skill apa yang sudah kamu kuasai hari ini?", type: "text", isRequired: true },
                { id: "rq7", question: "Apa yang akan kamu lakukan berbeda besok?", type: "text", isRequired: false }
              ],
              selfRating: {
                understanding: 0,
                focus: 0,
                energy: 0,
                satisfaction: 0,
                difficulty: 0
              },
              easiestTopics: [],
              hardestTopics: [],
              needsReview: [],
              keyLearnings: [],
              wantToLearnMore: [],
              improvementSuggestions: [],
              personalNotes: "",
              timeSpent: 0,
              targetAchieved: false,
              isCompleted: false
            },
            evaluation: {
              understandingLevel: 0,
              focusLevel: 0,
              energyLevel: 0,
              topicsNeedsReview: [],
              notes: "",
              difficultyRating: 0,
              improvementSuggestions: ""
            },
            learningObjectives: [
              "Memahami apa itu Excel dan kegunaannya",
              "Mengenal semua bagian antarmuka Excel",
              "Bisa navigasi di Excel tanpa mouse",
              "Memahami cell, row, column, dan range",
              "Bisa membuat dan mengelola workbook & worksheet",
              "Bisa mengubah format cell",
              "Bisa input data dengan cepat dan benar",
              "Bisa membuat dropdown validation",
              "Bisa menerapkan conditional formatting"
            ],
            keywords: ["Excel", "pengenalan", "antarmuka", "navigasi", "workbook", "worksheet", "format cell", "data entry", "conditional formatting"],
            prerequisites: ["Tidak ada prasyarat"],
            notes: "Hari pertama adalah fondasi. Kuasai ini sebelum lanjut ke hari berikutnya.",
            totalStudyHours: 10
          }
        ],
        learningObjectives: [
          "Mengenal Excel dan antarmukanya",
          "Bisa navigasi tanpa mouse",
          "Memahami cell, row, column",
          "Bisa mengelola workbook dan worksheet",
          "Bisa format cell dan data entry",
          "Bisa conditional formatting"
        ],
        skillsToMaster: [
          "Navigasi Excel tanpa mouse",
          "Shortcut keyboard navigasi",
          "Workbook dan worksheet management",
          "Format cell dasar",
          "Data Validation",
          "Conditional Formatting dasar"
        ],
        notes: "Minggu 1 adalah fondasi. Jangan skip satupun latihan."
      }
    ],
    finalProject: {
      id: 1,
      title: "Dashboard Penjualan Sederhana dengan Excel",
      description: "Buat dashboard penjualan interaktif menggunakan Excel dengan data sample yang diberikan. Dashboard harus menampilkan total penjualan, trend penjualan per bulan, top produk, dan analisis per kategori.",
      month: 1,
      skillsTested: [
        "Excel Data Entry",
        "Pivot Table",
        "Pivot Chart",
        "Conditional Formatting",
        "Data Validation",
        "Dashboard Design",
        "Data Visualization"
      ],
      deliverables: [
        "File Excel dengan 4 worksheet: Data, Pivot, Dashboard, Documentation",
        "Dashboard interaktif dengan slicer",
        "3 chart berbeda (bar, line, pie)",
        "Conditional formatting untuk data penting"
      ],
      dataset: "Dataset penjualan dengan 1000+ transaksi (akan diberikan)",
      toolsUsed: ["Microsoft Excel"],
      evaluationCriteria: [
        { category: "Data Processing", weight: 25, description: "Data bersih dan terstruktur" },
        { category: "Pivot Analysis", weight: 25, description: "Pivot table dan chart yang benar" },
        { category: "Dashboard Design", weight: 25, description: "Dashboard interaktif dan informatif" },
        { category: "Documentation", weight: 25, description: "Dokumentasi lengkap dan jelas" }
      ],
      estimatedTime: "4-6 jam",
      difficulty: "medium",
      tips: [
        "Gunakan pivot table untuk summarisasi data",
        "Buat dashboard dengan layout yang jelas",
        "Tambahkan slicer untuk interaktivitas",
        "Dokumentasikan setiap langkah"
      ]
    },
    totalDays: 30,
    totalHours: 300,
    mainTopics: [
      "Pengenalan Excel",
      "Navigasi dan Antarmuka",
      "Cell, Row, Column",
      "Workbook & Worksheet",
      "Format Cell",
      "Data Entry",
      "Conditional Formatting",
      "Statistika Deskriptif",
      "Pivot Table",
      "Dashboard"
    ],
    prerequisites: [
      "Bisa menggunakan komputer dasar",
      "Mengerti operasi file (save, open, folder)",
      "Mau belajar 10 jam/hari"
    ],
    tips: [
      "Praktek adalah kunci! Jangan hanya nonton video",
      "Buat catatan sendiri untuk dipelajari kembali",
      "Jangan skip latihan, kerjakan semua",
      "Kalau stuck, tanya komunitas atau cari di Google"
    ]
  }
];
