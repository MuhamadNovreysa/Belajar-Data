import { DayData } from '@/lib/types/daily.types';

export const DAY_1: DayData = {
  // ==========================================
  // INFORMASI DASAR
  // ==========================================
  id: 1,
  month: 1,
  week: 1,
  day: 1,
  title: "Pengenalan Excel & Antarmuka",
  subtitle: "Mengenal Excel dari Nol Sampai Bisa Navigasi",

  // ==========================================
  // JADWAL 10 JAM (8 SESI)
  // ==========================================
  schedule: {
    totalHours: 10,
    sessions: [
      // ========================================
      // SESI 1: 08:00 - 10:00 (120 menit)
      // ========================================
      {
        session: 1,
        time: "08:00 - 10:00",
        duration: 120,
        topic: "Apa Itu Excel & Sejarahnya",
        isBreak: false,
        subtopics: [
          {
            name: "1.1 Apa Itu Excel?",
            content: `
📌 DEFINISI EXCEL:
Excel adalah program spreadsheet (lembar kerja elektronik) yang dikembangkan oleh Microsoft.
Fungsinya: mengorganisir, menghitung, menganalisis, dan memvisualisasikan data dalam bentuk tabel.

📌 KEGUNAAN EXCEL DI DUNIA NYATA:
1. Mengelola data keuangan (laporan laba rugi, arus kas)
2. Analisis penjualan (trend produk terlaris)
3. HR (data karyawan, payroll, absensi)
4. Marketing (campaign analysis, ROI)
5. Project Management (timeline, budget tracking)
6. Inventory management (stok barang)
7. Data cleaning sebelum analisis lanjutan

📌 PERBANDINGAN DENGAN TOOLS LAIN:
┌─────────────────┬─────────────────┬─────────────────┐
│     Excel       │  Google Sheets  │  LibreOffice    │
├─────────────────┼─────────────────┼─────────────────┤
│ Berbayar        │ Gratis          │ Gratis          │
│ Desktop + Cloud │ Cloud only      │ Desktop only    │
│ Fitur lengkap   │ Fitur terbatas  │ Fitur standar   │
│ 1M+ baris data  │ 500k baris      │ 100k baris      │
│ VBA Macro       │ Google Apps     │ Basic Macro     │
└─────────────────┴─────────────────┴─────────────────┘

💡 ANALOGI SEDERHANA:
Bayangkan Excel seperti buku catatan digital dengan ribuan kotak kecil (cell).
Setiap kotak bisa diisi angka, teks, atau rumus matematika.
Kotak-kotak ini bisa diatur, dihitung, dan diubah warnanya.
Kalau kamu pernah main puzzle atau game strategi, Excel seperti papan permainan yang bisa diatur sesukamu.

❓ PERTANYAAN UNTUK DIREFLEKSIKAN:
• Menurutmu, apa perbedaan utama Excel dan Google Sheets?
• Kenapa banyak perusahaan lebih pilih Excel daripada tools gratis?
            `
          },
          {
            name: "1.2 Sejarah & Evolusi Excel",
            content: `
📌 TIMELINE PERKEMBANGAN EXCEL:

1985 → Excel 1.0 (Mac)
  • Excel pertama kali dirilis untuk Macintosh
  • Lebih canggih daripada Lotus 1-2-3 (pesaing saat itu)

1987 → Excel 2.0 (Windows)
  • Versi pertama untuk Windows
  • Mulai populer karena GUI (Graphical User Interface)

1993 → Excel 5.0
  • Fitur VBA (Visual Basic for Applications) muncul
  • Bisa membuat macro untuk otomatisasi

1997 → Excel 97
  • Conditional Formatting pertama kali
  • Data Validation hadir

2007 → Excel 2007
  • Ribbon menggantikan menu bar (revolusi UI!)
  • Format file .xlsx (lebih ringan, lebih aman)

2013 → Excel 2013
  • Power Query & Power Pivot hadir
  • Analisis data jadi lebih powerful

2019 → Excel 365
  • Versi cloud-based (subscription)
  • Update fitur terus menerus
  • AI & Co-pilot mulai masuk

📌 MENGAPA EXCEL MASIH RELEVAN?
• 750+ juta pengguna aktif (2024)
• 80% perusahaan Fortune 500 pakai Excel
• Skill Excel masuk top 3 most demanded skills
• Fleksibel untuk berbagai industri

📌 FAKTA MENARIK:
• Excel pertama hanya support 16.384 baris (sekarang 1.048.576)
• File Excel pertama hanya 64kb
• 1 dari 10 pekerja menggunakan Excel setiap hari

💡 KESIMPULAN:
Excel bukan cuma "software jadul". Ini adalah tool yang terus berevolusi dan tetap menjadi standar industri untuk data analysis.
            `
          },
          {
            name: "1.3 Instalasi & Persiapan",
            content: `
📌 CARA INSTAL EXCEL:

OPTION 1: Microsoft 365 (Berbayar)
• Harga: ~Rp 100.000/bulan
• Dapat: Excel, Word, PowerPoint, Outlook, 1TB OneDrive
• Link: https://www.microsoft.com/microsoft-365

OPTION 2: Excel Web (Gratis)
• URL: https://office.com
• Cukup pakai browser (Chrome, Edge, Firefox)
• Fitur: terbatas dibanding desktop, tapi cukup untuk belajar dasar

OPTION 3: Trial 1 Bulan (Gratis)
• Microsoft 365 trial 30 hari
• Fitur lengkap seperti versi berbayar

OPTION 4: Alternatif Gratis
• Google Sheets (https://sheets.google.com)
• LibreOffice Calc (download gratis)

📌 MINIMAL SPESIFIKASI (untuk belajar):
• RAM: 4GB (8GB lebih baik)
• Storage: 5GB free space
• OS: Windows 10/11 atau MacOS 10.15+
• Browser: Chrome, Edge, Firefox terbaru (untuk web version)

📌 LANGKAH INSTALASI:
1. Kunjungi https://office.com
2. Login pake Microsoft account (atau buat dulu)
3. Klik "Install Office" → pilih "Microsoft 365"
4. Download installer → jalankan
5. Tunggu proses install (5-10 menit)
6. Buka Excel dari Start Menu (Windows) atau Applications (Mac)

✅ TUGAS PERTAMA:
• Install Excel (pilih salah satu option di atas)
• Screenshot tampilan desktop Excel pertama kamu
• Simpan screenshotnya untuk portofolio
            `
          }
        ],
        resources: {
          videos: [
            {
              id: "v1",
              title: "Apa Itu Excel? - Pemahaman Dasar",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "12:30",
              channel: "Belajar Excel Indonesia",
              description: "Penjelasan singkat tentang apa itu Excel dan fungsinya"
            },
            {
              id: "v2",
              title: "Sejarah Excel 1985-2024",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "18:45",
              channel: "Excel History Channel",
              description: "Perjalanan Excel dari pertama kali sampai sekarang"
            },
            {
              id: "v3",
              title: "Excel vs Google Sheets vs LibreOffice",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "15:20",
              channel: "Tech Comparison",
              description: "Perbandingan lengkap 3 spreadsheet tools"
            }
          ],
          articles: [
            {
              id: "a1",
              title: "Panduan Memilih Excel Version yang Tepat",
              url: "https://support.microsoft.com/excel-versions",
              platform: "Microsoft Support",
              description: "Artikel resmi Microsoft tentang perbedaan versi Excel"
            },
            {
              id: "a2",
              title: "Apa Itu Spreadsheet? Definisi dan Manfaat",
              url: "https://...",
              platform: "Wikipedia",
              description: "Penjelasan komprehensif tentang spreadsheet"
            },
            {
              id: "a3",
              title: "Kenapa Excel Masih Jadi Raja Data Analyst",
              url: "https://...",
              platform: "DataCamp",
              description: "Analisis mengapa Excel tetap relevan"
            }
          ],
          documentation: [
            {
              id: "d1",
              title: "Microsoft Excel Official Documentation",
              url: "https://support.microsoft.com/excel",
              platform: "Microsoft",
              description: "Dokumentasi resmi dari Microsoft"
            }
          ]
        },
        practice: {
          id: "p1",
          title: "Instalasi Excel & Buat File Pertama",
          instructions: `
📌 LANGKAH-LANGKAH:

1. Pilih salah satu cara instalasi di atas
2. Install Excel sampai selesai
3. Buka Excel → Pilih "Blank Workbook"
4. Lihat tampilan Excel (kenali ribbon, formula bar, dll)
5. Simpan file dengan nama "Latihan 1 - Nama Kamu.xlsx"
6. Ambil screenshot tampilan Excel kamu

📌 YANG PERLU DIPERHATIKAN:
• Pastikan Excel terbuka tanpa error
• File berhasil disimpan di folder belajar kamu
• Screenshot jelas menunjukkan seluruh area Excel

📌 KRITERIA BERHASIL:
✅ Excel berhasil terinstall
✅ Blank workbook terbuka
✅ File berhasil disimpan
✅ Screenshot diambil
          `,
          estimatedTime: 30,
          difficulty: "easy",
          tips: "Kalau error saat install, coba restart komputer dulu",
          fileUrl: null
        }
      },

      // ========================================
      // BREAK 1: 10:00 - 10:30 (30 menit)
      // ========================================
      {
        session: 2,
        time: "10:00 - 10:30",
        duration: 30,
        topic: "ISTIRAHAT",
        isBreak: true,
        subtopics: [],
        resources: { videos: [], articles: [], documentation: [] },
        practice: null
      },

      // ========================================
      // SESI 2: 10:30 - 12:30 (120 menit)
      // ========================================
      {
        session: 3,
        time: "10:30 - 12:30",
        duration: 120,
        topic: "Mengenal Antarmuka Excel",
        isBreak: false,
        subtopics: [
          {
            name: "2.1 Antarmuka Excel (Tour Lengkap)",
            content: `
📌 BAGIAN-BAGIAN UTAMA EXCEL:

┌─────────────────────────────────────────────────────────────────┐
│   [Quick Access Toolbar]    [Title Bar]        [Min/Max/Close] │
├─────────────────────────────────────────────────────────────────┤
│   File │ Home │ Insert │ Page Layout │ Formulas │ Data │ View  │ ← Ribbon
├─────────────────────────────────────────────────────────────────┤
│                    [Formula Bar]                               │
│   [Name Box]  |  [Function Bar]                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   A1   │  B    │  C    │  D    │  E    │  F    │  G    │ H   │ ← Column
│   ──── ┼───────┼───────┼───────┼───────┼───────┼───────┼──────│
│   1    │ Cell  │       │       │       │       │       │     │ ← Row
│   2    │       │       │       │       │       │       │     │
│   3    │       │       │       │       │       │       │     │
│   4    │       │       │       │       │       │       │     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│   [Sheet1]  [Sheet2]  [Sheet3]          [Zoom]  [View]       │ ← Status Bar
└─────────────────────────────────────────────────────────────────┘

📌 PENJELASAN SETIAP BAGIAN:

1. QUICK ACCESS TOOLBAR (QAT)
   • Letak: pojok kiri atas
   • Fungsi: shortcut untuk perintah yang sering dipakai
   • Default: Save, Undo, Redo
   • Bisa dikustomisasi (klik ikon dropdown panah kecil)

2. TITLE BAR
   • Menampilkan nama file yang sedang dibuka
   • Format: "Book1 - Excel" (book1 = nama default)
   • 3 tombol: Minimize, Maximize/Restore, Close

3. RIBBON
   • Letak: di atas area kerja
   • Fungsi: tempat semua perintah Excel
   • 9 Tab utama: File, Home, Insert, Draw, Page Layout, Formulas, Data, Review, View
   • Bisa di-collapse (double click tab)

4. NAME BOX
   • Letak: kiri formula bar
   • Fungsi: menunjukkan alamat cell aktif (contoh: A1)
   • Bisa untuk navigasi cepat (ketik A100 lalu Enter)

5. FORMULA BAR
   • Letak: kanan name box
   • Fungsi: menampilkan dan mengedit isi cell
   • Bisa menampilkan rumus (tidak hanya hasil)

6. WORKSHEET AREA
   • Area utama untuk mengisi data
   • Terdiri dari: Row (baris) = angka (1-1.048.576)
   • Column (kolom) = huruf (A-XFD)

7. STATUS BAR
   • Letak: paling bawah
   • Fungsi: info status Excel (Ready, Edit, Enter)
   • Ada zoom slider, view shortcuts (Normal, Page Layout, Page Break)

💡 TIPS PRO:
• Tekan Alt → muncul huruf di ribbon (bisa akses pake keyboard)
• Klik kanan di ribbon → "Collapse the Ribbon" untuk lebih luas
• Double click di antara ribbon tabs untuk hide/show
• Hover di icon → muncul tooltip (penjelasan singkat)

✅ LATIHAN MANDIRI:
• Cari semua 9 tab di ribbon
• Klik setiap tab, amati apa yang berubah
• Coba klik kanan di area kosong ribbon
• Tekan Alt, lihat apa yang terjadi
            `
          },
          {
            name: "2.2 Navigasi Dasar",
            content: `
📌 CARA NAVIGASI DI EXCEL:

🔹 MENGGUNAKAN MOUSE:
• Klik cell → pilih cell tersebut
• Scroll → naik/turun lembar kerja
• Klik + drag → pilih range (area) cell
• Double click → masuk ke mode edit cell
• Klik kanan → muncul context menu (copy, paste, format)

🔹 MENGGUNAKAN KEYBOARD (SHORTCUT WAJIB!):
┌─────────────────────┬──────────────────────────────┐
│ SHORTCUT            │ FUNGSI                       │
├─────────────────────┼──────────────────────────────┤
│ → (Panah Kanan)     │ Pindah 1 cell ke kanan      │
│ ← (Panah Kiri)      │ Pindah 1 cell ke kiri       │
│ ↑ (Panah Atas)      │ Pindah 1 cell ke atas       │
│ ↓ (Panah Bawah)     │ Pindah 1 cell ke bawah      │
│ Ctrl + →            │ Pindah ke akhir data kanan   │
│ Ctrl + ←            │ Pindah ke akhir data kiri    │
│ Ctrl + ↑            │ Pindah ke akhir data atas    │
│ Ctrl + ↓            │ Pindah ke akhir data bawah   │
│ Home                │ Pindah ke kolom A            │
│ Ctrl + Home         │ Pindah ke cell A1            │
│ Ctrl + End          │ Pindah ke cell terakhir      │
│ Page Up             │ Naik 1 layar                 │
│ Page Down           │ Turun 1 layar                │
│ Alt + Page Up       │ Geser 1 layar ke kiri        │
│ Alt + Page Down     │ Geser 1 layar ke kanan       │
│ Tab                 │ Pindah 1 cell ke kanan       │
│ Shift + Tab         │ Pindah 1 cell ke kiri        │
│ Enter               │ Pindah 1 cell ke bawah       │
│ Shift + Enter       │ Pindah 1 cell ke atas        │
└─────────────────────┴──────────────────────────────┘

🔹 MENGGUNAKAN SCROLL BAR:
• Scroll bar vertikal → naik/turun
• Scroll bar horizontal → kiri/kanan
• Drag scroll bar → cepat pindah posisi
• Klik di atas/bawah scroll bar → pindah 1 layar

🔹 MENGGUNAKAN GO TO (F5):
1. Tekan F5 atau Ctrl + G
2. Muncul dialog "Go To"
3. Ketik cell yang dituju (contoh: Z100)
4. Klik OK → langsung ke cell tersebut

🔹 MENGGUNAKAN NAME BOX (Navigasi Cepat):
1. Klik Name Box (kiri formula bar)
2. Ketik alamat cell (contoh: AA500)
3. Enter → langsung ke cell itu

💡 TIPS PRO:
• Untuk data besar, pakai Ctrl + panah untuk lompat cepat
• Gunakan Name Box untuk "bookmark" cell penting
• Latihan navigasi pake keyboard bisa speed up 5x lipat!

✅ LATIHAN NAVIGASI:
1. Buka blank workbook
2. Pindah ke cell Z100 (pake name box)
3. Kembali ke A1 (Ctrl + Home)
4. Pindah ke cell terakhir (Ctrl + End)
5. Navigasi ke B50 → G200 → A100 → X50
6. Latihan pake panah keyboard tanpa mouse!
            `
          },
          {
            name: "2.3 Cell, Row, Column (Pengertian Dasar)",
            content: `
📌 KOMPONEN DASAR EXCEL:

1. CELL
   • Cell = kotak terkecil di Excel
   • Alamat cell = kombinasi Column + Row (contoh: A1, B5, Z100)
   • Cell aktif = cell yang sedang dipilih (border tebal)
   • Cell bisa diisi: angka, teks, tanggal, rumus, atau kosong

2. ROW (Baris)
   • Row = baris horizontal (kiri ke kanan)
   • Ditandai dengan angka (1, 2, 3, ..., 1.048.576)
   • Total: 1.048.576 row

3. COLUMN (Kolom)
   • Column = kolom vertikal (atas ke bawah)
   • Ditandai dengan huruf (A, B, C, ..., XFD)
   • Total: 16.384 column

📌 RANGE (Kumpulan Cell)
   • Range = grup cell yang terdiri dari minimal 2 cell
   • Format: CellAwal:CellAkhir (contoh: A1:C10)
   • Range bisa digunakan untuk: format, rumus, chart

📌 STRUKTUR ALAMAT CELL:
   ┌─────┬─────┬─────┐
   │     │  A  │  B  │  ← Column
   ├─────┼─────┼─────┤
   │  1  │ A1  │ B1  │
   ├─────┼─────┼─────┤
   │  2  │ A2  │ B2  │
   └─────┴─────┴─────┘
      ↑
     Row

📌 CONTOH ALAMAT CELL:
• A1 = Kolom A, Baris 1
• B5 = Kolom B, Baris 5
• Z100 = Kolom Z, Baris 100
• AA50 = Kolom AA, Baris 50
• XFD1048576 = Kolom XFD, Baris 1.048.576 (cell terakhir)

📌 ISTILAH PENTING:
• Cell Aktif = cell yang sedang dipilih (ada border hijau/tebal)
• Cell Range = kumpulan cell (contoh: A1:A10)
• Adjacent Cells = cell yang bersebelahan
• Non-Adjacent Cells = cell yang tidak bersebelahan (pilih pake Ctrl)

💡 TIPS PRO:
• Cell aktif selalu terlihat di Name Box
• Row/Column header berubah jadi warna gelap di row/column aktif
• Double click border cell = lompat ke ujung data (alternatif shortcut)
• Shift + Space = pilih seluruh row aktif
• Ctrl + Space = pilih seluruh column aktif

✅ LATIHAN MANDIRI:
1. Buka workbook baru
2. Klik cell C5 (perhatikan perubahan di name box)
3. Pilih range A1:D10 (drag dari A1 ke D10)
4. Pilih 2 range non-adjacent: A1:A5 dan C1:C5 (pake Ctrl)
5. Cari alamat cell paling akhir di Excel (pakai Ctrl + End)
            `
          }
        ],
        resources: {
          videos: [
            {
              id: "v4",
              title: "Tour Lengkap Antarmuka Excel 2024",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "28:15",
              channel: "Excel Tutorial Center",
              description: "Penjelasan semua bagian Excel dengan visual"
            },
            {
              id: "v5",
              title: "Shortcut Keyboard Excel yang Wajib Diketahui",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "22:30",
              channel: "Excel Shortcut Pro",
              description: "Kumpulan shortcut untuk navigasi cepat"
            }
          ],
          articles: [
            {
              id: "a4",
              title: "Panduan Lengkap Antarmuka Excel",
              url: "https://...",
              platform: "Excel Easy",
              description: "Tutorial interaktif tentang bagian-bagian Excel"
            },
            {
              id: "a5",
              title: "Cara Navigasi di Excel yang Efektif",
              url: "https://...",
              platform: "Microsoft Support",
              description: "Tips navigasi dari Microsoft"
            }
          ],
          documentation: [
            {
              id: "d2",
              title: "Excel Keyboard Shortcuts",
              url: "https://support.microsoft.com/keyboard-shortcuts",
              platform: "Microsoft",
              description: "Daftar lengkap shortcut Excel"
            }
          ]
        },
        practice: {
          id: "p2",
          title: "Latihan Navigasi & Mengenal Antarmuka",
          instructions: `
📌 LANGKAH-LANGKAH:

1. Buka Excel → Blank Workbook
2. Identifikasi semua bagian antarmuka:
   - Quick Access Toolbar
   - Ribbon (semua tab)
   - Formula Bar
   - Name Box
   - Status Bar

3. Praktekkan navigasi:
   - Pindah ke A1 (Ctrl+Home)
   - Pindah ke Z100 (pake name box)
   - Pindah ke cell terakhir (Ctrl+End)
   - Pindah ke cell acak 10 kali pake keyboard

4. Praktekkan selection:
   - Pilih range A1:E10
   - Pilih seluruh row 5 (Shift+Space)
   - Pilih seluruh column C (Ctrl+Space)
   - Pilih non-adjacent cells (Ctrl+click)

5. Catat semua shortcut yang kamu pake

📌 YANG PERLU DIPERHATIKAN:
• Jangan pake mouse sebisa mungkin (latihan keyboard)
• Perhatikan perubahan di Name Box setiap pindah cell
• Perhatikan border cell aktif berubah

📌 KRITERIA BERHASIL:
✅ Bisa pindah ke 20 cell berbeda tanpa mouse
✅ Tahu nama semua bagian antarmuka
✅ Bisa pilih range dengan cepat
✅ Bisa pilih non-adjacent cells
          `,
          estimatedTime: 45,
          difficulty: "medium",
          tips: "Kalau pertama kali susah tanpa mouse, tulis dulu daftar shortcut di sticky note",
          fileUrl: null
        }
      },

      // ========================================
      // ISTIRAHAT: 12:30 - 13:30 (60 menit - Makan Siang)
      // ========================================
      {
        session: 4,
        time: "12:30 - 13:30",
        duration: 60,
        topic: "ISTIRAHAT (Makan Siang)",
        isBreak: true,
        subtopics: [],
        resources: { videos: [], articles: [], documentation: [] },
        practice: null
      },

      // ========================================
      // SESI 3: 13:30 - 15:30 (120 menit)
      // ========================================
      {
        session: 5,
        time: "13:30 - 15:30",
        duration: 120,
        topic: "Worksheet & Workbook",
        isBreak: false,
        subtopics: [
          {
            name: "3.1 Memahami Workbook vs Worksheet",
            content: `
📌 PERBEDAAN WORKBOOK DAN WORKSHEET:

WORKBOOK
• = File Excel (contoh: "Laporan.xlsx")
• Bisa berisi banyak worksheet
• Ikon: 📒 (buku tebal)
• Ekstensi: .xlsx, .xls, .xlsm

WORKSHEET
• = Lembar kerja di dalam workbook
• = Tab di bagian bawah Excel
• Ikon: 📄 (lembar kertas)
• Default: 3 sheet (Sheet1, Sheet2, Sheet3)

📌 VISUALISASI:
┌─────────────────────────────────────────────┐
│                WORKBOOK                     │
│  ┌──────────────────────────────────────┐   │
│  │           WORKSHEET 1                │   │
│  │  (Sheet1) - Data Penjualan          │   │
│  ├──────────────────────────────────────┤   │
│  │           WORKSHEET 2                │   │
│  │  (Sheet2) - Analisis Marketing       │   │
│  ├──────────────────────────────────────┤   │
│  │           WORKSHEET 3                │   │
│  │  (Sheet3) - Dashboard                │   │
│  └──────────────────────────────────────┘   │
│  [Sheet1] [Sheet2] [Sheet3] [+]           │ ← Tab
└─────────────────────────────────────────────┘

📌 FUNGSI MULTI-WORKSHEET:
• Pisahkan data sesuai kategori (produk, pelanggan, transaksi)
• Buat summary dari banyak sheet (pakai formula)
• Dashboard di sheet terpisah dari data
• Satu workbook bisa jadi "database mini"

📌 CONTOH PENGGUNAAN:
• Workbook: "Laporan_Keuangan_2024.xlsx"
  - Sheet1: Data Penjualan (raw data)
  - Sheet2: Rekap per Bulan (summary)
  - Sheet3: Dashboard Visual (chart)
  - Sheet4: Proyeksi 2025 (forecast)

📌 KAPASITAS:
• 1 workbook = 1.048.576 row × 16.384 column
• 1 workbook = unlimited worksheets (tergantung memory)
• File size max = 2GB (sangat besar!)
• Jangan pakai lebih dari 100 sheet untuk performa optimal

💡 TIPS PRO:
• Beri nama sheet yang deskriptif (bukan Sheet1, Sheet2)
• Gunakan warna tab untuk kategori (merah = urgent, hijau = selesai)
• Hidden sheet untuk data rahasia
• Protect sheet untuk mencegah edit
            `
          },
          {
            name: "3.2 Operasi Workbook & Worksheet",
            content: `
📌 CARA MEMBUAT WORKBOOK BARU:

1. Buka Excel
2. Pilih "Blank Workbook"
   ATAU
3. Klik File → New → Blank Workbook
   ATAU
4. Shortcut: Ctrl + N

📌 CARA MENYIMPAN WORKBOOK:

SHORTCUT: Ctrl + S (Sering-sering! Gak mau hilang data!)

LANGKAH-LANGKAH:
1. Klik File → Save (atau Ctrl+S)
2. Pilih lokasi folder (Desktop / Documents / Folder Belajar)
3. Beri nama file (contoh: "Belajar_Excel_Hari1")
4. Format: .xlsx (default)
5. Klik Save

📌 FORMAT FILE EXCEL:
┌────────────┬──────────────────────────────────┐
│ FORMAT     │ KEGUNAAN                        │
├────────────┼──────────────────────────────────┤
│ .xlsx      │ Standar (tanpa macro)           │
│ .xlsm      │ Punya macro/VBA                 │
│ .xls       │ Excel 97-2003 (jadul)           │
│ .csv       │ Text-only (buka di notepad)     │
│ .pdf       │ Export untuk dibaca orang lain  │
└────────────┴──────────────────────────────────┘

📌 CARA MENAMBAH WORKSHEET:

5 CARA (pilih yang paling cepat):
1. Klik ikon "+" di sebelah tab sheet terakhir
2. Klik kanan tab → Insert → Worksheet
3. Shortcut: Shift + F11
4. Home → Insert → Insert Sheet
5. Klik kanan di tab → Duplicate (copy sheet yang ada)

📌 OPERASI WORKSHEET LAINNYA:

RENAME SHEET:
• Double click nama tab
• Klik kanan → Rename
• Ketik nama baru → Enter

MOVE/COPY SHEET:
• Drag tab ke posisi baru
• Klik kanan → Move or Copy

DELETE SHEET:
• Klik kanan tab → Delete
• Hati-hati! Data hilang permanen (kecuali undo)

HIDE SHEET:
• Klik kanan → Hide
• Untuk menyembunyikan data sementara

COLOR SHEET TAB:
• Klik kanan → Tab Color
• Pilih warna

💡 TIPS PRO:
• Buat habit: Ctrl+S setiap 5 menit!
• Simpan file di cloud (OneDrive, Google Drive) untuk backup
• Gunakan "Save As" kalau mau bikin versi baru

✅ LATIHAN MANDIRI:
1. Buat workbook baru "Latihan_Worksheet.xlsx"
2. Buat 5 sheet dengan nama:
   - Data_Produk
   - Data_Pelanggan
   - Data_Transaksi
   - Rekap_Penjualan
   - Dashboard
3. Ubah warna tab:
   - Data_Produk → Biru
   - Data_Pelanggan → Hijau
   - Data_Transaksi → Kuning
   - Rekap_Penjualan → Oranye
   - Dashboard → Merah
4. Simpan file di folder belajar kamu
            `
          },
          {
            name: "3.3 AutoSave & Version History",
            content: `
📌 AUTOSAVE (Fitur Penyelamat):

APA ITU AUTOSAVE?
• Fitur yang menyimpan file secara otomatis
• Default: aktif untuk file yang disimpan di OneDrive/SharePoint
• Simpan setiap detik (gak perlu Ctrl+S terus!)
• Ikon: toggle di Quick Access Toolbar

CARA AKTIFKAN AUTOSAVE:
1. Simpan file ke OneDrive (harus!)
2. Di QAT, klik toggle AutoSave → ON
3. File otomatis tersimpan setiap perubahan

📌 VERSION HISTORY (Lihat Riwayat):

APA ITU?
• Melihat versi file sebelumnya
• Bisa restore ke versi lama
• Seperti "time machine" di Excel

CARAK AKSES:
1. File → Info
2. Klik "Version History"
3. Pilih versi yang mau dilihat
4. Klik "Restore" untuk kembali ke versi itu

📌 RECOVER UNSAVED WORKBOOKS:

Kalau Excel crash / mati mendadak:
1. Buka Excel lagi
2. File → Open → Recent
3. Klik "Recover Unsaved Workbooks" (paling bawah)
4. Pilih file yang mau direcover

💡 TIPS PRO:
• Simpan file di OneDrive/Google Drive = auto backup
• Jangan matikan AutoSave!
• Version History bisa lihat siapa yang edit kapan
• Gunakan "Restore" dengan hati-hati (akan replace versi terbaru)
            `
          }
        ],
        resources: {
          videos: [
            {
              id: "v6",
              title: "Cara Membuat dan Menyimpan Workbook",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "15:40",
              channel: "Excel Dasar Indonesia",
              description: "Tutorial membuat, menyimpan, mengelola workbook"
            },
            {
              id: "v7",
              title: "Tips Mengelola Banyak Worksheet",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "12:20",
              channel: "Excel Management",
              description: "Cara efisien mengelola banyak sheet"
            }
          ],
          articles: [
            {
              id: "a6",
              title: "Cara Mengelola Workbook dan Worksheet",
              url: "https://...",
              platform: "Excel Campus",
              description: "Panduan lengkap pengelolaan file Excel"
            }
          ],
          documentation: [
            {
              id: "d3",
              title: "Workbook vs Worksheet - Official Docs",
              url: "https://support.microsoft.com/workbook-worksheet",
              platform: "Microsoft",
              description: "Penjelasan resmi dari Microsoft"
            }
          ]
        },
        practice: {
          id: "p3",
          title: "Buat Workbook dengan 10 Sheet",
          instructions: `
📌 LANGKAH-LANGKAH:

1. Buat workbook baru "Manajemen_Data.xlsx"
2. Buat 10 worksheet dengan nama:
   - Januari
   - Februari
   - Maret
   - April
   - Mei
   - Juni
   - Juli
   - Agustus
   - September
   - Oktober

3. Ubah warna tab:
   - Q1 (Jan-Mar): Biru
   - Q2 (Apr-Jun): Hijau
   - Q3 (Jul-Sep): Kuning
   - Q4 (Okt): Oranye

4. Tambah 2 sheet baru:
   - Summary
   - Dashboard

5. Simpan file di folder "Excel_Belajar"

📌 KRITERIA BERHASIL:
✅ 12 sheet dengan nama yang benar
✅ Warna tab sesuai kategori
✅ File tersimpan dengan benar
✅ Bisa navigasi antar sheet dengan cepat (Ctrl+Page Up/Down)
          `,
          estimatedTime: 40,
          difficulty: "medium",
          tips: "Gunakan Ctrl + Page Up/Down untuk pindah sheet cepat",
          fileUrl: null
        }
      },

      // ========================================
      // BREAK 2: 15:30 - 16:00 (30 menit)
      // ========================================
      {
        session: 6,
        time: "15:30 - 16:00",
        duration: 30,
        topic: "ISTIRAHAT",
        isBreak: true,
        subtopics: [],
        resources: { videos: [], articles: [], documentation: [] },
        practice: null
      },

      // ========================================
      // SESI 4: 16:00 - 18:00 (120 menit)
      // ========================================
      {
        session: 7,
        time: "16:00 - 18:00",
        duration: 120,
        topic: "Format Cell & Data Entry",
        isBreak: false,
        subtopics: [
          {
            name: "4.1 Format Cell (Dasar)",
            content: `
📌 APA ITU FORMAT CELL?

Format cell = cara Excel menampilkan data di dalam cell.
• Angka bisa tampil sebagai: 1000, Rp1.000, 1.000,00
• Tanggal bisa tampil sebagai: 01/01/2024, 1 Jan 2024
• Penting untuk: laporan keuangan, data time series, presentasi

📌 JENIS FORMAT CELL:

1. GENERAL (Default)
   • Excel memilih format otomatis
   • Angka: 1000
   • Text: "Halo"

2. NUMBER
   • Untuk angka dengan desimal
   • Bisa atur: jumlah desimal, ribuan separator
   • Contoh: 1.000,00 atau 1000.00

3. CURRENCY
   • Untuk mata uang
   • Ada simbol: Rp, $, €, £
   • Contoh: Rp1.000.000,00

4. ACCOUNTING
   • Mirip currency tapi rata kiri
   • Biasanya untuk laporan keuangan

5. DATE
   • Untuk tanggal
   • Banyak format: 01/01/2024, 1 Jan 2024, Monday, January 1
   • Bisa dioperasikan (selisih tanggal)

6. TIME
   • Untuk jam
   • Format: 08:00, 08:00 AM, 20:00

7. PERCENTAGE
   • Untuk persentase
   • Contoh: 50% (Excel otomatis kalikan 100)

8. TEXT
   • Semua dianggap teks (termasuk angka)
   • Tidak bisa dihitung
   • Contoh: "001" tetap "001" (tidak jadi 1)

9. SCIENTIFIC
   • Untuk angka sangat besar/kecil
   • Contoh: 1.23E+10

📌 CARA UBAH FORMAT CELL:

5 CARA:
1. Home → Number group → Pilih dari dropdown
2. Klik kanan → Format Cells → Pilih kategori
3. Shortcut: Ctrl + 1 (buka dialog Format Cells)
4. Klik panah kecil di Number group
5. Pake format shortcut: 
   - Ctrl+Shift+1 = Number
   - Ctrl+Shift+2 = Time
   - Ctrl+Shift+3 = Date
   - Ctrl+Shift+4 = Currency
   - Ctrl+Shift+5 = Percentage

📌 CUSTOM NUMBER FORMAT (Keren ini!):
• Bisa bikin format sendiri
• Contoh: "Rp"#,##0.00 → Rp1,000.00
• Kode: # = digit opsional, 0 = digit wajib
• Gunakan untuk membuat format khusus perusahaan

💡 TIPS PRO:
• Format Currency vs Accounting = beda perataan
• Custom format bisa menyembunyikan nilai nol (pakai ;;;)
• Tanggal di Excel sebenarnya adalah angka (1 = 1 Jan 1900)
• Jangan gunakan Text format untuk data angka yang mau dihitung!
            `
          },
          {
            name: "4.2 Data Entry (Cara Input Data)",
            content: `
📌 CARA INPUT DATA DI EXCEL:

1. Klik cell → Ketik data → Enter
2. Klik cell → Ketik data → Tab (pindah ke kanan)
3. Klik cell → Ketik data → Shift+Tab (pindah ke kiri)
4. Klik cell → Ketik data → Panah (sesuai arah)

📌 JENIS DATA YANG BISA DIINPUT:

1. TEXT (String)
   • Huruf, kata, kalimat
   • Contoh: "Nama Produk", "Jakarta"
   • Otomatis rata kiri

2. NUMBER (Angka)
   • Angka bisa dihitung
   • Contoh: 1000, 3.14, -50
   • Otomatis rata kanan

3. DATE (Tanggal)
   • Format tanggal
   • Contoh: 01/01/2024, 1-Jan-2024
   • Bisa dioperasikan

4. TIME (Jam)
   • Format waktu
   • Contoh: 08:00, 14:30
   • Bisa dioperasikan

5. FORMULA (Rumus)
   • Dimulai dengan =
   • Contoh: =A1+B1
   • Hasilnya otomatis update

6. BOOLEAN (True/False)
   • TRUE atau FALSE
   • Hasil dari formula logika

📌 CARA CEPAT INPUT DATA (AUTO-FILL):

Drag Handle (Kotak kecil di pojok kanan bawah cell):
1. Ketik "Jan" → drag → Feb, Mar, Apr, ...
2. Ketik 1 → drag → 2, 3, 4, 5, ...
3. Ketik 1, 3 → drag → 5, 7, 9, ...
4. Ketik formula → drag → formula otomatis menyesuaikan

📌 DATA VALIDATION (Cegah Input Salah):

Fungsi: membatasi apa yang bisa diinput di cell.

Contoh: Buat dropdown list
1. Pilih cell → Data → Data Validation
2. Allow: List
3. Source: ketik "Produk A,Produk B,Produk C"
4. OK → cell jadi dropdown

📌 TIPS INPUT DATA:
• Gunakan Tab, bukan Enter, untuk input data berurutan
• Double click handle = auto fill sampai akhir data
• Ctrl + D = copy data dari cell di atas
• Ctrl + R = copy data dari cell di kiri
            `
          },
          {
            name: "4.3 Conditional Formatting (Dasar)",
            content: `
📌 APA ITU CONDITIONAL FORMATTING?

Fitur yang mengubah format cell berdasarkan kondisi/aturan.

CONTOH:
• Cell dengan nilai > 100 → Warna Hijau
• Cell dengan nilai < 50 → Warna Merah
• Cell yang berisi kata "Urgent" → Bold + Merah

📌 JENIS CONDITIONAL FORMATTING:

1. HIGHLIGHT CELL RULES
   • Greater Than / Less Than
   • Between / Equal To
   • Text That Contains
   • Duplicate Values

2. TOP/BOTTOM RULES
   • Top 10 Items
   • Top 10%
   • Bottom 10 Items
   • Above Average / Below Average

3. DATA BARS
   • Bar grafis di dalam cell
   • Semakin besar nilai, semakin panjang bar

4. COLOR SCALES
   • Gradasi warna
   • Merah (rendah) → Kuning (sedang) → Hijau (tinggi)

5. ICON SETS
   • Ikon di dalam cell
   • ✅ ❌ ⚠️
   • Tanda panah, traffic light, rating

📌 CARA PAKAI CONDITIONAL FORMATTING:

1. Pilih range cell
2. Home → Conditional Formatting
3. Pilih aturan yang diinginkan
4. Atur parameter (nilai, warna, dll)
5. OK

📌 CONTOH PRAKTIS:

DATA PENJUALAN (A1:A10):
1. Pilih A1:A10
2. Conditional Formatting → Highlight Cell Rules
3. Greater Than → 100 → Format: Green Fill
4. Less Than → 50 → Format: Red Fill
5. Between → 50-100 → Format: Yellow Fill

💡 TIPS PRO:
• Conditional Formatting bisa dikombinasikan dengan formula!
• Gunakan untuk data quality check (tandai data yang aneh)
• Jangan terlalu banyak aturan (bikin lambat)
• Bisa di-copy dengan Format Painter
            `
          }
        ],
        resources: {
          videos: [
            {
              id: "v8",
              title: "Cara Format Cell di Excel (Lengkap)",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "32:10",
              channel: "Excel Formatting Master",
              description: "Semua jenis format cell dengan contoh"
            },
            {
              id: "v9",
              title: "Data Entry Tips & Trik di Excel",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "18:45",
              channel: "Excel Data Entry Pro",
              description: "Cara input data cepat dan akurat"
            }
          ],
          articles: [
            {
              id: "a7",
              title: "Panduan Format Cell Excel",
              url: "https://...",
              platform: "Excel Jet",
              description: "Referensi lengkap format cell"
            },
            {
              id: "a8",
              title: "Data Validation untuk Pemula",
              url: "https://...",
              platform: "Excel Campus",
              description: "Cara membuat dropdown dan validasi data"
            }
          ],
          documentation: [
            {
              id: "d4",
              title: "Conditional Formatting Official",
              url: "https://support.microsoft.com/conditional-formatting",
              platform: "Microsoft",
              description: "Dokumentasi resmi conditional formatting"
            }
          ]
        },
        practice: {
          id: "p4",
          title: "Buat Form Input dengan Format & Validasi",
          instructions: `
📌 LANGKAH-LANGKAH:

Buat form data karyawan dengan:

KOLOM YANG DIBUTUHKAN:
1. NIK (Text, format: '001')
2. Nama Lengkap (Text)
3. Tanggal Lahir (Date)
4. Jenis Kelamin (Dropdown: Laki-laki, Perempuan)
5. Departemen (Dropdown: HRD, IT, Marketing, Finance)
6. Gaji (Currency, Rp)
7. Tanggal Masuk (Date)
8. Status (Dropdown: Tetap, Kontrak, Magang)

📌 PERSYARATAN FORMAT:
- NIK: Text format (biar 001 tetap 001)
- Gaji: Currency Rp
- Tanggal: Date format "01-Jan-2024"
- Semua header: Bold, Background biru, Text putih

📌 DATA VALIDATION:
- Jenis Kelamin: List (Laki-laki, Perempuan)
- Departemen: List (HRD, IT, Marketing, Finance)
- Status: List (Tetap, Kontrak, Magang)

📌 CONDITIONAL FORMATTING:
- Gaji > 10.000.000 → Background Hijau
- Gaji < 5.000.000 → Background Merah
- Status "Tetap" → Bold
- Status "Kontrak" → Italic

📌 KRITERIA BERHASIL:
✅ 8 kolom dengan format yang benar
✅ 3 dropdown validation berfungsi
✅ Conditional formatting berjalan
✅ Form rapi dan mudah dibaca
          `,
          estimatedTime: 90,
          difficulty: "hard",
          tips: "Kerjakan step by step, jangan terburu-buru. Kalau error, coba ulangi dari awal.",
          fileUrl: null
        }
      },

      // ========================================
      // SESI 5: 18:00 - 19:00 (60 menit - REVIEW)
      // ========================================
      {
        session: 8,
        time: "18:00 - 19:00",
        duration: 60,
        topic: "REVIEW, QUIZ, & REFLEKSI",
        isBreak: false,
        subtopics: [
          {
            name: "5.1 Review Materi Hari Ini",
            content: `
📌 YANG SUDAH DIPELAJARI HARI INI:

✅ APA ITU EXCEL:
• Definisi dan fungsi Excel
• Sejarah perkembangannya
• Perbedaan dengan tools lain
• Kenapa penting untuk Data Analyst

✅ ANTARMUKA EXCEL:
• Quick Access Toolbar
• Ribbon (9 tab utama)
• Formula Bar & Name Box
• Status Bar
• Worksheet Area

✅ NAVIGASI:
• Shortcut keyboard (wajib dihafal!)
• Mouse navigation
• Go To (F5)
• Name Box navigation

✅ CELL, ROW, COLUMN:
• Definisi cell, row, column
• Alamat cell
• Range
• Total row/column

✅ WORKBOOK & WORKSHEET:
• Perbedaan workbook dan worksheet
• Cara membuat, menyimpan
• Operasi sheet (add, rename, delete, move, color)
• AutoSave & Version History

✅ FORMAT CELL:
• Jenis format (Number, Currency, Date, dll)
• Cara mengubah format
• Custom format

✅ DATA ENTRY:
• Cara input data
• Jenis data
• Auto-fill
• Data Validation

✅ CONDITIONAL FORMATTING:
• Pengertian
• Jenis-jenis
• Cara pakai
• Contoh praktis

📌 SKILLS YANG SUDAH DIMILIKI:
1. Bisa navigasi di Excel tanpa mouse
2. Bisa membuat dan mengelola workbook
3. Bisa mengubah format cell
4. Bisa input data dengan cepat
5. Bisa membuat dropdown validation
6. Bisa memberi warna otomatis dengan conditional formatting
            `
          },
          {
            name: "5.2 Topik yang Perlu Diulang (Nanti)",
            content: `
📌 MATERI YANG BIASANYA SULIT:

1. Custom Number Format
   • Kode-kode format (#, 0, @, dll)
   • Tips: Simpan cheat sheet

2. Data Validation dengan Formula
   • Validation dinamis
   • Tips: Pelajari di minggu ke-2

3. Conditional Formatting dengan Formula
   • Menggunakan = untuk aturan custom
   • Tips: Pelajari setelah paham rumus

📌 REKOMENDASI UNTUK BESOK:
• Ulangi shortcut navigasi (5 menit di pagi hari)
• Buat ringkasan 1 halaman tentang antarmuka
• Praktik buka-tutup Excel 5 kali (biasakan)

💡 JANGAN KHAWATIR KALAU LUPA!
Excel itu dipelajari sambil dipraktekkan.
Semakin sering buka Excel, semakin terbiasa.
            `
          }
        ],
        resources: {
          videos: [
            {
              id: "v10",
              title: "Review Cepat: 10 Skill Excel Hari Pertama",
              url: "https://youtu.be/...",
              platform: "YouTube",
              duration: "15:00",
              channel: "Excel Review",
              description: "Ringkasan cepat semua materi hari ini"
            }
          ],
          articles: [],
          documentation: []
        },
        practice: null
      }
    ]
  },

  // ==========================================
  // QUIZ (15 PERTANYAAN)
  // ==========================================
  quiz: {
    title: "Quiz Hari ke-1: Pengenalan Excel",
    description: "Test pemahaman tentang Excel, antarmuka, navigasi, worksheet, dan format cell",
    passingScore: 70,
    questions: [
      {
        id: "q1",
        type: "multiple_choice",
        question: "Apa fungsi dari Quick Access Toolbar?",
        options: [
          "A. Menampilkan formula di cell",
          "B. Akses cepat ke perintah yang sering digunakan",
          "C. Menampilkan chart",
          "D. Mengatur print layout"
        ],
        correctAnswer: "B",
        explanation: "Quick Access Toolbar (QAT) adalah toolbar kecil di pojok kiri atas yang bisa dikustomisasi dengan perintah yang sering digunakan seperti Save, Undo, Redo.",
        difficulty: "easy"
      },
      {
        id: "q2",
        type: "multiple_choice",
        question: "Berapa total row di Excel versi terbaru?",
        options: [
          "A. 65.536",
          "B. 1.048.576",
          "C. 16.384",
          "D. 10.000"
        ],
        correctAnswer: "B",
        explanation: "Excel versi 2007 ke atas memiliki 1.048.576 row (baris) dan 16.384 column (kolom).",
        difficulty: "easy"
      },
      {
        id: "q3",
        type: "multiple_choice",
        question: "Shortcut untuk pindah ke cell A1 adalah...",
        options: [
          "A. Ctrl + A",
          "B. Ctrl + Home",
          "C. Alt + A1",
          "D. Shift + A1"
        ],
        correctAnswer: "B",
        explanation: "Ctrl + Home selalu membawa kamu ke cell A1 di worksheet apapun.",
        difficulty: "easy"
      },
      {
        id: "q4",
        type: "multiple_choice",
        question: "Apa perbedaan workbook dan worksheet?",
        options: [
          "A. Workbook adalah file, worksheet adalah lembar di dalamnya",
          "B. Worksheet adalah file, workbook adalah lembar di dalamnya",
          "C. Workbook dan worksheet sama saja",
          "D. Workbook untuk angka, worksheet untuk teks"
        ],
        correctAnswer: "A",
        explanation: "Workbook adalah file Excel (.xlsx) yang bisa berisi banyak worksheet (sheet).",
        difficulty: "medium"
      },
      {
        id: "q5",
        type: "multiple_choice",
        question: "Apa yang terjadi kalau cell diformat sebagai Text?",
        options: [
          "A. Angka tetap bisa dihitung",
          "B. Angka dianggap sebagai teks dan tidak bisa dihitung",
          "C. Semua data otomatis menjadi huruf kapital",
          "D. Cell tidak bisa diisi apa-apa"
        ],
        correctAnswer: "B",
        explanation: "Format Text membuat Excel menganggap semua input sebagai teks, termasuk angka. Angka tidak bisa dihitung sampai diformat ulang.",
        difficulty: "medium"
      },
      {
        id: "q6",
        type: "multiple_choice",
        question: "Fungsi Data Validation adalah...",
        options: [
          "A. Menghapus data yang salah",
          "B. Membatasi apa yang bisa diinput di cell",
          "C. Menyimpan data ke database",
          "D. Membuat grafik otomatis"
        ],
        correctAnswer: "B",
        explanation: "Data Validation digunakan untuk membatasi tipe data atau nilai yang bisa dimasukkan ke cell, misalnya membuat dropdown list.",
        difficulty: "medium"
      },
      {
        id: "q7",
        type: "multiple_choice",
        question: "Apa nama fitur yang mengubah format cell berdasarkan kondisi?",
        options: [
          "A. AutoFormat",
          "B. Conditional Formatting",
          "C. Format Painter",
          "D. Cell Styles"
        ],
        correctAnswer: "B",
        explanation: "Conditional Formatting mengubah tampilan cell (warna, font, dll) berdasarkan aturan atau kondisi yang kita tentukan.",
        difficulty: "medium"
      },
      {
        id: "q8",
        type: "multiple_choice",
        question: "Shortcut untuk menyimpan file Excel adalah...",
        options: [
          "A. Ctrl + C",
          "B. Ctrl + V",
          "C. Ctrl + S",
          "D. Ctrl + X"
        ],
        correctAnswer: "C",
        explanation: "Ctrl + S adalah shortcut universal untuk menyimpan file di semua aplikasi, termasuk Excel.",
        difficulty: "easy"
      },
      {
        id: "q9",
        type: "multiple_choice",
        question: "Bagian mana yang menunjukkan alamat cell aktif?",
        options: [
          "A. Formula Bar",
          "B. Status Bar",
          "C. Name Box",
          "D. Quick Access Toolbar"
        ],
        correctAnswer: "C",
        explanation: "Name Box (di kiri Formula Bar) menunjukkan alamat cell yang sedang aktif, contoh: A1, B5, Z100.",
        difficulty: "easy"
      },
      {
        id: "q10",
        type: "multiple_choice",
        question: "Excel pertama kali dirilis untuk sistem operasi apa?",
        options: [
          "A. Windows",
          "B. Macintosh",
          "C. Linux",
          "D. DOS"
        ],
        correctAnswer: "B",
        explanation: "Excel 1.0 pertama kali dirilis untuk Macintosh pada tahun 1985, kemudian versi Windows keluar pada 1987.",
        difficulty: "hard"
      },
      {
        id: "q11",
        type: "multiple_choice",
        question: "Apa fungsi dari Conditional Formatting 'Data Bars'?",
        options: [
          "A. Menampilkan bar grafis di dalam cell",
          "B. Membuat chart baru",
          "C. Mengubah data menjadi grafik batang",
          "D. Menghitung rata-rata data"
        ],
        correctAnswer: "A",
        explanation: "Data Bars menampilkan bar grafis di dalam cell yang panjangnya sesuai dengan nilai cell. Semakin besar nilai, semakin panjang bar.",
        difficulty: "medium"
      },
      {
        id: "q12",
        type: "multiple_choice",
        question: "File Excel dengan macro memiliki ekstensi...",
        options: [
          "A. .xlsx",
          "B. .xlsm",
          "C. .xlsb",
          "D. .csv"
        ],
        correctAnswer: "B",
        explanation: ".xlsm adalah format Excel yang mendukung macro (kode VBA). .xlsx adalah format standar tanpa macro.",
        difficulty: "medium"
      },
      {
        id: "q13",
        type: "multiple_choice",
        question: "Cara cepat pindah antar worksheet adalah...",
        options: [
          "A. Ctrl + Page Up/Down",
          "B. Ctrl + Tab",
          "C. Alt + Tab",
          "D. Shift + Tab"
        ],
        correctAnswer: "A",
        explanation: "Ctrl + Page Up untuk pindah ke sheet kiri, Ctrl + Page Down untuk pindah ke sheet kanan.",
        difficulty: "medium"
      },
      {
        id: "q14",
        type: "multiple_choice",
        question: "Apa yang dimaksud dengan range di Excel?",
        options: [
          "A. Satu cell saja",
          "B. Kumpulan cell yang dipilih",
          "C. Seluruh worksheet",
          "D. Seluruh workbook"
        ],
        correctAnswer: "B",
        explanation: "Range adalah kumpulan cell yang terdiri dari minimal 2 cell, contoh: A1:A10 atau B2:D5.",
        difficulty: "easy"
      },
      {
        id: "q15",
        type: "multiple_choice",
        question: "Di mana letak tombol untuk menambah sheet baru?",
        options: [
          "A. Di menu File",
          "B. Di sebelah kanan tab sheet terakhir (ikon '+')",
          "C. Di Quick Access Toolbar",
          "D. Di Formula Bar"
        ],
        correctAnswer: "B",
        explanation: "Ikon '+' di sebelah kanan tab sheet terakhir adalah cara termudah untuk menambah sheet baru. Bisa juga dengan Shift+F11.",
        difficulty: "easy"
      }
    ]
  },

  // ==========================================
  // ASSIGNMENT HARI INI
  // ==========================================
  assignment: {
    title: "Buat Workbook dengan Data Sample & Format Lengkap",
    description: `
📌 TUGAS AKHIR HARI KE-1:

Buat sebuah workbook yang berisi data sample dan menerapkan semua yang sudah dipelajari hari ini.

📌 PERSYARATAN:

1. WORKBOOK
   • Nama file: "Tugas_Hari1_NamaKamu.xlsx"
   • Minimal 3 worksheet

2. WORKSHEET 1: "Data_Karyawan"
   • Kolom: NIK, Nama, Tanggal Lahir, Departemen, Gaji, Status
   • Isi minimal 10 data karyawan
   • Format:
     - NIK: Text (contoh: '001')
     - Tanggal Lahir: Date
     - Departemen: Dropdown (HRD, IT, Marketing, Finance, Operasional)
     - Gaji: Currency Rp
     - Status: Dropdown (Tetap, Kontrak, Magang)

3. WORKSHEET 2: "Analisis"
   • Buat summary dari Data_Karyawan
   • Total karyawan per departemen
   • Rata-rata gaji
   • Gaji tertinggi dan terendah
   • Jumlah karyawan tetap vs kontrak

4. WORKSHEET 3: "Dashboard"
   • Buat visual sederhana dari data
   • Minimal: 1 chart (pie atau bar)
   • Conditional Formatting untuk data

5. FORMAT & STYLING
   • Semua header: Bold, Background biru, Text putih
   • Border untuk semua tabel
   • Conditional Formatting:
     - Gaji > 10.000.000 → Background Hijau
     - Status "Tetap" → Bold

📌 KRITERIA PENILAIAN:
✅ Semua kolom ada dan terisi
✅ Format cell sesuai ketentuan
✅ Data Validation berfungsi
✅ Conditional Formatting berjalan
✅ Workbook terstruktur dengan rapi
✅ 3 worksheet dengan fungsi berbeda
✅ Ada chart di worksheet Dashboard
✅ File tersimpan dengan nama yang benar
    `,
    deliverables: [
      "File Excel (.xlsx) dengan 3 worksheet",
      "Screenshot workbook (jika diperlukan)"
    ],
    estimatedTime: "90 menit",
    difficulty: "hard"
  },

  // ==========================================
  // REFLEKSI HARIAN
  // ==========================================
  reflection: {
    questions: [
      "Apa yang paling mudah dipahami hari ini?",
      "Apa yang paling sulit? Mengapa?",
      "Apa yang ingin dipelajari lebih dalam?",
      "Seberapa fokus kamu belajar hari ini? (1-10)",
      "Apa gangguan terbesar hari ini?",
      "Skill apa yang sudah kamu kuasai hari ini?",
      "Apa yang akan kamu lakukan berbeda besok?"
    ]
  },

  // ==========================================
  // METRIK EVALUASI (DIISI USER)
  // ==========================================
  evaluation: {
    understandingLevel: 0,
    focusLevel: 0,
    energyLevel: 0,
    topicsNeedsReview: [],
    notes: ""
  }
};
