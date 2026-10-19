# Fitur Detail Studi

## Status

- Status: In Progress
- Scope: Frontend dan UI/UX saja
- Sumber data saat ini: Mock data
- Backend/API: Belum terhubung

## Tujuan

Menyediakan halaman untuk melihat informasi lengkap sebuah studi radiologi setelah pengguna memilih studi dari Worklist.

Halaman ini menjadi penghubung antara Worklist dan Viewer citra.

## Alur Pengguna

1. Pengguna membuka halaman Worklist.
2. Pengguna memilih salah satu studi.
3. Pengguna menekan aksi `Buka detail`.
4. Aplikasi membuka route `/studies/:studyInstanceUid`.
5. Aplikasi mengambil detail studi berdasarkan Study Instance UID.
6. Aplikasi menampilkan informasi studi, metadata, hasil bacaan dokter jika tersedia, dan daftar series.
7. Jika bacaan berstatus `final`, aplikasi menampilkan QR menuju halaman laporan.
8. Pengguna memindai QR, membuka halaman laporan, lalu dapat mencetak atau menyimpannya sebagai PDF melalui dialog browser.
9. Pengguna dapat kembali ke Worklist atau melanjutkan ke Viewer.

## Route

File route menggunakan file-based routing:

```text
src/pages/studies/[studyInstanceUid].vue
```

Route yang dihasilkan:

```text
/studies/:studyInstanceUid
/reports/:studyInstanceUid
```

Contoh URL menggunakan identifier dummy:

```text
/studies/DEMO-STUDY-001
```

Jangan menggunakan nama pasien atau PHI di dalam URL.

## Struktur File

| File | Tanggung jawab |
|---|---|
| `src/pages/studies/[studyInstanceUid].vue` | Entry page dan pembacaan parameter route |
| `src/pages/reports/[studyInstanceUid].vue` | Halaman laporan yang dibuka melalui QR; menampilkan bacaan final dan aksi cetak |
| `src/types/study-detail.ts` | TypeScript type untuk detail studi dan series |
| `src/types/study-report.ts` | TypeScript type untuk hasil bacaan dokter |
| `src/mocks/study-details.ts` | Data dummy detail studi |
| `src/services/study-detail.service.ts` | Adapter pengambilan detail studi |
| `src/components/study/StudyHeader.vue` | Ringkasan identitas studi |
| `src/components/study/StudyMetadataCard.vue` | Tampilan metadata studi |
| `src/components/study/StudyReportCard.vue` | Tampilan hasil bacaan dokter |
| Library QR bertipe TypeScript | Membuat QR dinamis yang mengarah ke route laporan; dependency belum dipasang |
| `src/components/study/SeriesList.vue` | Daftar series dalam studi |
| `doc/features/study-detail.md` | Dokumentasi fitur dan kontrak frontend |

## Informasi yang Ditampilkan

### Ringkasan Studi

- Study Instance UID
- Patient ID dummy
- Nama pasien dummy sesuai hak akses UI
- Tanggal pemeriksaan
- Modality
- Deskripsi pemeriksaan
- Status studi

### Metadata Studi

- Informasi umum study
- Jumlah series
- Waktu pemeriksaan jika tersedia
- Status proses review

### Series

- Series Instance UID
- Nama atau deskripsi series
- Modality
- Jumlah image/frame jika tersedia
- Aksi untuk membuka series pada Viewer

### Hasil Bacaan Dokter

Kartu hasil bacaan ditampilkan pada halaman detail studi, setelah informasi studi dan sebelum daftar series. Hasil bacaan merupakan bagian terpisah dari metadata DICOM dan data gambar.

Field yang ditampilkan pada tahap frontend:

- nama dokter dummy;
- tanggal bacaan;
- status bacaan (`draf` atau `final`);
- temuan;
- kesan.

Setiap studi dapat belum memiliki bacaan. Untuk keadaan tersebut, kartu menampilkan pesan bahwa hasil bacaan belum tersedia, bukan bacaan kosong atau contoh yang tampak final.

Urutan bagian halaman:

```text
Ringkasan studi
Informasi studi
Hasil bacaan dokter (jika tersedia)
Daftar series dan pratinjau gambar
```

## Rancangan Type Data

Contoh rancangan type frontend:

```ts
export interface StudyDetail {
  studyInstanceUid: string
  patientId: string
  patientName: string
  modality: string
  studyDate: string
  studyDescription: string
  status: StudyStatus
  hasilBacaan: StudyReport | null
  series: StudySeries[]
}

export type ReportStatus = 'draf' | 'final'

export interface StudyReport {
  namaDokter: string
  tanggalBacaan: string
  status: ReportStatus
  temuan: string
  kesan: string
}

export interface StudySeries {
  seriesInstanceUid: string
  modality: string
  description: string
  jumlahImage: number
}
```

Type dapat berubah ketika kontrak API final tersedia. Perubahan tersebut harus dilakukan melalui service adapter agar komponen UI tidak bergantung langsung pada bentuk response backend.

## State UI

### Loading

Tampilkan skeleton atau indikator bahwa detail studi sedang dimuat.

### Success

Tampilkan header studi, metadata, dan daftar series.

### Empty

Tampilkan pesan jika studi ada tetapi belum memiliki series atau metadata tertentu.

Untuk bacaan yang belum tersedia, tampilkan pesan khusus seperti `Hasil bacaan belum tersedia.` Data `null` menunjukkan belum ada bacaan.

### Draf

Tampilkan label `Draf` secara jelas. Bacaan draf belum boleh ditampilkan seolah-olah sudah final.

### Final

Tampilkan label `Final` bersama nama dokter dummy dan tanggal bacaan. Pada tahap frontend, status ini hanya simulasi UI dan belum menunjukkan validasi atau penandatanganan klinis.

### Not Found

Tampilkan pesan jika Study Instance UID tidak ditemukan pada mock data.

### Error

Tampilkan pesan aman:

```text
Detail studi belum dapat dimuat. Silakan coba lagi.
```

Jangan menampilkan stack trace, URL internal, credential, atau response mentah backend.

### Unauthorized

Tampilkan pesan bahwa pengguna tidak memiliki akses terhadap studi tersebut.

## Mock Data

Mock data wajib:

- menggunakan identifier dummy;
- tidak menggunakan nama pasien nyata;
- diberi komentar bahwa data hanya untuk UI;
- memiliki minimal satu studi dengan lebih dari satu series;
- memiliki variasi status untuk menguji tampilan.
- menguji studi tanpa bacaan, bacaan draf, dan bacaan final.
- memakai nama dokter dan isi bacaan yang sepenuhnya fiktif serta diberi penanda bahwa data hanya untuk demo.

Isi bacaan dummy tidak boleh dianggap sebagai hasil pemeriksaan atau saran medis. Jangan menyalin bacaan pasien nyata ke source code, fixture, log, maupun dokumentasi.

Contoh identifier:

```text
DEMO-STUDY-001
DEMO-SERIES-001
DEMO-PATIENT-001
```

## Komponen Vue yang Dipelajari

- `useRoute()` untuk membaca parameter route.
- `computed()` untuk nilai turunan dari route atau data studi.
- `onMounted()` untuk memuat data saat halaman dibuka.
- `props` untuk mengirim data dari page ke komponen anak.
- `v-for` untuk menampilkan daftar series.
- `v-if` dan `v-else` untuk state loading, error, empty, dan success.
- `RouterLink` untuk navigasi kembali dan menuju Viewer.
- `props` bertipe `StudyReport | null` untuk mengirim bacaan ke `StudyReportCard.vue`.
- `v-if` untuk membedakan bacaan belum tersedia, draf, dan final.

## Keamanan dan Privasi

- Jangan menggunakan data pasien nyata pada mock data.
- Jangan menaruh nama pasien dalam URL.
- Jangan menampilkan seluruh metadata DICOM jika belum diperlukan UI.
- Pastikan aksi menuju Viewer tetap melewati pemeriksaan akses pada backend saat integrasi tersedia.
- Pisahkan metadata studi dari data pixel citra.
- Hasil bacaan adalah data klinis sensitif; pada integrasi backend, tampilkan hanya setelah otorisasi pengguna diperiksa.
- Jangan menyimpan atau mengubah bacaan klinis dari UI mock ini; proses simpan, finalisasi, tanda tangan, dan audit memerlukan rancangan backend tersendiri.

## QR dan Unduh Hasil Bacaan

### Tujuan dan alur UI

Fitur ini memperagakan alur membuka hasil bacaan yang sudah final melalui QR. Semua data pada tahap ini bersifat dummy dan tidak digunakan untuk distribusi hasil pasien sungguhan.

1. QR dan aksi menuju laporan hanya ditampilkan jika status studi `selesai`, `hasilBacaan` tersedia, dan status bacaan `final`.
2. Jika status studi belum `selesai`, bacaan masih `draf`, atau bacaan belum tersedia, QR maupun aksi unduh tidak ditampilkan.
3. QR berisi tautan aplikasi ke `/reports/:studyInstanceUid`; QR tidak boleh memuat nama pasien, isi bacaan, atau PHI lainnya.
4. Halaman laporan mengambil detail melalui service mock yang sudah ada dan hanya menampilkan bacaan berstatus `final`.
5. Tombol `Unduh hasil` membuka dialog cetak browser. Pengguna dapat memilih `Simpan sebagai PDF`; fitur ini belum menghasilkan PDF resmi secara otomatis.

### Batasan, asumsi, dan risiko

- QR dibuat secara dinamis menggunakan library QR yang mendukung TypeScript. Dependency belum tersedia di project dan harus dipilih serta dipasang manual oleh Super Admin sebelum implementasi.
- QR yang mengarah ke `localhost` hanya dapat digunakan pada komputer yang menjalankan aplikasi. Pemindaian melalui ponsel memerlukan alamat aplikasi yang dapat dijangkau ponsel melalui jaringan yang sama.
- Route frontend dan status `final` pada mock bukan autentikasi, otorisasi, tanda tangan dokter, atau pengesahan klinis.
- Jangan memasukkan data pasien nyata atau laporan klinis ke mock, QR, URL, atau source code. Pembagian laporan sungguhan memerlukan pemeriksaan otorisasi, mekanisme tautan aman, masa berlaku, dan audit dari backend.
- Tata letak cetak sebaiknya menyembunyikan navigasi dan tombol aksi yang tidak menjadi bagian laporan.

### State tampilan

- Status studi belum `selesai`: QR dan tombol unduh tidak ditampilkan, meskipun bacaan tersedia.
- Bacaan `null`: tampilkan pesan belum tersedia; QR dan tombol unduh tidak ditampilkan.
- Bacaan `draf`: tampilkan label draf; QR dan tombol unduh tidak ditampilkan.
- Status studi `selesai` dan bacaan `final`: tampilkan QR dan aksi untuk membuka laporan.
- UID tidak ditemukan, status studi belum `selesai`, atau bacaan bukan final pada halaman laporan: tampilkan keadaan tidak tersedia, tanpa membocorkan detail internal.
- Terjadi kegagalan saat memuat: tampilkan pesan aman dan aksi coba lagi bila sesuai.

### Verifikasi manual setelah implementasi

1. Pastikan studi yang belum `selesai` tidak menampilkan QR atau tombol unduh, meskipun bacaan sudah `final`.
2. Pastikan studi `selesai` dengan bacaan `null` atau `draf` tidak menampilkan QR atau tombol unduh.
3. Pastikan hanya studi `selesai` dengan bacaan `final` yang menampilkan QR menuju `/reports/:studyInstanceUid` dengan identifier dummy.
4. Buka tautan hasil pemindaian dan pastikan halaman laporan memuat bacaan final yang cocok.
5. Uji UID yang tidak ditemukan serta studi yang belum selesai/final; laporan tidak boleh ditampilkan.
6. Tekan `Unduh hasil`, pastikan dialog cetak terbuka dan pilih `Simpan sebagai PDF`.
7. Periksa pratinjau cetak: konten laporan terbaca, sedangkan navigasi dan tombol aksi tidak ikut tercetak.
8. Uji pemindaian ponsel hanya jika alamat aplikasi dapat dijangkau dari perangkat tersebut.
9. Jalankan `npm run build` dan pastikan tidak ada error TypeScript atau route.

## Kriteria Selesai

- [ ] Route `/studies/:studyInstanceUid` dapat dibuka.
- [ ] Parameter `studyInstanceUid` dibaca dengan typed route.
- [ ] Detail studi diambil melalui service adapter.
- [ ] Data dummy tidak mengandung PHI nyata.
- [ ] Header studi tampil.
- [ ] Metadata studi tampil.
- [ ] Daftar series tampil.
- [ ] Kartu hasil bacaan tampil pada posisi antara metadata studi dan daftar series.
- [ ] Tampilan hasil bacaan mencakup keadaan belum tersedia, draf, dan final.
- [ ] QR dan aksi laporan hanya tersedia jika status studi `selesai` dan bacaan berstatus `final`.
- [ ] QR hanya membawa tautan route dengan identifier dummy, bukan data pasien atau isi laporan.
- [ ] Halaman laporan hanya menampilkan bacaan final dan menyediakan alur cetak/simpan PDF.
- [ ] Nama dokter dan isi bacaan pada mock sepenuhnya fiktif serta diberi konteks demo.
- [ ] Loading state tersedia.
- [ ] Empty state tersedia.
- [ ] Not found state tersedia.
- [ ] Error state tersedia.
- [ ] Tombol kembali ke Worklist berfungsi.
- [ ] Tombol menuju Viewer memiliki route yang jelas atau disabled dengan alasan.
- [ ] Tidak ada error TypeScript atau console error.
- [ ] Dokumentasi diperbarui setelah implementasi manual selesai.

## Langkah Verifikasi Manual

1. Jalankan `npm run dev`.
2. Buka `/worklist`.
3. Buka salah satu studi dummy.
4. Pastikan URL berubah menjadi `/studies/DEMO-STUDY-001`.
5. Pastikan metadata dan series tampil.
6. Uji Study Instance UID yang tidak tersedia.
7. Uji tombol kembali ke Worklist.
8. Buka studi dummy tanpa bacaan dan pastikan pesan belum tersedia tampil.
9. Buka studi dummy dengan bacaan draf dan final, pastikan label statusnya berbeda.
10. Pastikan urutan kartu adalah metadata, hasil bacaan, lalu series.
11. Jalankan `npm run build`.

## Catatan Integrasi Backend

Service mock akan diganti dengan adapter API ketika kontrak backend tersedia. Komponen halaman sebaiknya tetap memanggil fungsi service, bukan melakukan request HTTP langsung di setiap komponen.
