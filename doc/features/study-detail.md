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
6. Aplikasi menampilkan informasi studi, metadata, dan daftar series.
7. Pengguna dapat kembali ke Worklist atau melanjutkan ke Viewer.

## Route

File route menggunakan file-based routing:

```text
src/pages/studies/[studyInstanceUid].vue
```

Route yang dihasilkan:

```text
/studies/:studyInstanceUid
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
| `src/types/study-detail.ts` | TypeScript type untuk detail studi dan series |
| `src/mocks/study-details.ts` | Data dummy detail studi |
| `src/services/study-detail.service.ts` | Adapter pengambilan detail studi |
| `src/components/study/StudyHeader.vue` | Ringkasan identitas studi |
| `src/components/study/StudyMetadataCard.vue` | Tampilan metadata studi |
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
  series: StudySeries[]
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

## Keamanan dan Privasi

- Jangan menggunakan data pasien nyata pada mock data.
- Jangan menaruh nama pasien dalam URL.
- Jangan menampilkan seluruh metadata DICOM jika belum diperlukan UI.
- Pastikan aksi menuju Viewer tetap melewati pemeriksaan akses pada backend saat integrasi tersedia.
- Pisahkan metadata studi dari data pixel citra.

## Kriteria Selesai

- [ ] Route `/studies/:studyInstanceUid` dapat dibuka.
- [ ] Parameter `studyInstanceUid` dibaca dengan typed route.
- [ ] Detail studi diambil melalui service adapter.
- [ ] Data dummy tidak mengandung PHI nyata.
- [ ] Header studi tampil.
- [ ] Metadata studi tampil.
- [ ] Daftar series tampil.
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
8. Jalankan `npm run build`.

## Catatan Integrasi Backend

Service mock akan diganti dengan adapter API ketika kontrak backend tersedia. Komponen halaman sebaiknya tetap memanggil fungsi service, bukan melakukan request HTTP langsung di setiap komponen.
