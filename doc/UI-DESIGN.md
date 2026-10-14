# Pedoman Desain UI PACS

## Prinsip Desain

- **Clinical first:** informasi yang dibutuhkan untuk mengambil keputusan harus paling mudah ditemukan.
- **Calm interface:** gunakan tampilan tenang, kontras baik, dan hindari dekorasi yang tidak membantu.
- **Data density terkontrol:** worklist boleh padat, tetapi tetap memiliki hierarki dan whitespace yang cukup.
- **Consistent interaction:** aksi, status, filter, dan feedback harus memiliki pola yang sama di seluruh aplikasi.
- **Safe by default:** aksi destruktif atau sensitif harus jelas, dapat dibatalkan bila memungkinkan, dan meminta konfirmasi.

## Struktur Layout

```text
┌──────────────┬─────────────────────────────────────┐
│ Sidebar      │ Header: breadcrumb, user, actions   │
│ navigasi     ├─────────────────────────────────────┤
│              │ Content: worklist / detail / viewer │
└──────────────┴─────────────────────────────────────┘
```

- Sidebar berisi menu utama dan dapat diciutkan.
- Header berisi breadcrumb, status koneksi bila perlu, notifikasi, dan profil pengguna.
- Content area menjadi fokus utama dan tidak boleh terhalang navigasi.
- Viewer dapat menggunakan layout khusus dengan ruang citra yang lebih dominan.

## Halaman Utama

### Login

- Form sederhana dengan username/email, password, dan tombol masuk.
- Tampilkan error yang mudah dipahami tanpa membocorkan detail keamanan.
- Gunakan loading state pada tombol saat proses autentikasi berlangsung.

### Worklist

- Judul halaman dan ringkasan jumlah studi.
- Search bar yang mudah ditemukan.
- Filter dalam panel atau toolbar yang tidak mengganggu tabel.
- Tabel menampilkan tanggal, patient ID, patient name sesuai hak akses, modality, description, status, dan action.
- Gunakan row hover, selected state, dan keyboard navigation.

### Detail Studi

- Tampilkan ringkasan pasien dan studi di bagian atas.
- Kelompokkan metadata berdasarkan Study, Series, dan status.
- Aksi utama seperti `Open viewer` harus terlihat jelas.
- Hindari menampilkan semua metadata sekaligus; gunakan accordion atau tab bila diperlukan.

### Viewer

- Area citra menjadi elemen terbesar.
- Toolbar berisi tool yang paling sering dipakai: select, pan, zoom, window/level, rotate, reset.
- Series panel dapat diciutkan.
- Informasi overlay tidak boleh menutupi area penting citra.
- Sediakan shortcut keyboard, tooltip, dan indikator tool aktif.

## Warna dan Status

Gunakan design token, bukan warna hard-code di setiap komponen.

- Background utama: netral gelap atau terang dengan kontras tinggi.
- Primary: biru klinis untuk aksi utama dan link.
- Success: hijau untuk selesai/tersedia.
- Warning: amber untuk perlu perhatian.
- Danger: merah hanya untuk error atau aksi berisiko.
- Info: biru muda untuk informasi tambahan.

Status harus selalu disampaikan dengan kombinasi warna dan teks/icon; jangan mengandalkan warna saja.

## Tipografi dan Spacing

- Gunakan maksimal dua keluarga font.
- Heading harus memiliki hierarki yang konsisten.
- Body text minimal nyaman dibaca pada layar kerja klinis.
- Gunakan skala spacing konsisten, misalnya kelipatan 4 atau 8.
- Tabel dan metadata boleh padat, tetapi label dan nilai harus mudah dibedakan.

## Komponen Wajib

- Button: primary, secondary, ghost, danger.
- Input, search, select, date range, dan filter chip.
- Table dengan sorting, pagination, selected row, dan empty state.
- Badge/status indicator.
- Modal konfirmasi.
- Toast atau inline alert.
- Skeleton loading.
- Tabs/accordion.
- Breadcrumb.
- Tooltip yang mendukung keyboard focus.

## Responsive dan Aksesibilitas

- Desktop menjadi target utama karena PACS umumnya digunakan di workstation.
- Pada layar kecil, tabel dapat berubah menjadi card/list dengan informasi prioritas.
- Semua fungsi penting dapat digunakan dengan keyboard.
- Gunakan focus state yang terlihat.
- Pastikan teks, icon, dan status memenuhi kontras yang memadai.
- Jangan gunakan animasi berlebihan; hormati preferensi reduced motion.

## Aturan Microcopy

- Gunakan Bahasa Indonesia yang singkat dan jelas.
- Gunakan label aksi berbasis kata kerja: `Buka viewer`, `Terapkan filter`, `Reset filter`.
- Jelaskan masalah dan tindakan berikutnya pada error state.
- Hindari pesan teknis mentah seperti stack trace di UI.
