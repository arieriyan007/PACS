# Aturan Project PACS

Dokumen ini menjadi aturan utama pengembangan aplikasi PACS.

## Aturan Umum

- Gunakan Bahasa Indonesia untuk dokumentasi dan komunikasi project.
- Agent hanya berperan sebagai penasihat dan pembuat dokumentasi.
- Super Admin adalah satu-satunya pihak yang boleh memasukkan, mengubah, atau menghapus kode dan konfigurasi project.
- Agent wajib memberikan informasi dan dokumentasi terlebih dahulu sebelum setiap rencana coding atau script.
- Agent tidak boleh langsung melakukan perubahan file, menjalankan script mutatif, install dependency, commit, push, atau deployment.
- Setiap fitur harus memiliki tujuan, ruang lingkup, dan kriteria selesai yang jelas.
- Prioritaskan keamanan, akurasi data, aksesibilitas, dan kemudahan pemeliharaan.
- Jangan memasukkan data pasien asli, credential, token, atau secret ke repository.
- Jangan mengubah kontrak API tanpa memperbarui dokumentasi dan adapter terkait.

## Prosedur Sebelum Coding

Sebelum Super Admin memasukkan kode, agent wajib menjelaskan:

1. Tujuan dan ruang lingkup fitur.
2. Rancangan arsitektur dan alur data.
3. File yang perlu dibuat atau diubah.
4. Contoh kode atau script yang diperlukan.
5. Dampak terhadap fitur yang sudah ada.
6. Langkah implementasi manual.
7. Langkah pengujian dan verifikasi.
8. Risiko keamanan, performa, dan kompatibilitas.

Agent tidak boleh menyatakan fitur telah selesai diterapkan sebelum Super Admin mengonfirmasi bahwa implementasi manual telah dilakukan.

## Aturan Frontend

- Gunakan Vue 3, TypeScript, Vite, Composition API, dan `<script setup>`.
- Gunakan Vue Router untuk semua navigasi SPA.
- Gunakan Pinia untuk state lintas halaman.
- Pisahkan view, component, store, service, composable, dan type.
- Gunakan environment variable untuk URL API dan konfigurasi deployment.
- Setiap request async wajib menangani loading, success, empty, error, dan unauthorized.
- Komponen harus reusable, responsif, keyboard-accessible, dan memiliki label yang jelas.

## Aturan File-Based Routing

- Gunakan file-based routing berbasis konsep `unplugin-vue-router`.
- Pada Vue Router 5, implementasi dilakukan melalui `vue-router/vite` dan `vue-router/auto-routes`.
- File halaman route ditempatkan di `src/pages/`.
- Nama file `[parameter].vue` digunakan untuk dynamic route.
- Nama file `[...path].vue` digunakan untuk halaman 404.
- Komponen reusable di `src/components/` tidak otomatis menjadi route.
- Menu navigasi dan permission harus tetap didefinisikan secara eksplisit.

## Aturan Pembelajaran Vue

- Komponen baru wajib menggunakan `<script setup lang="ts">`.
- Komentar, teks UI, mock data, nama domain, dan contoh kode menggunakan Bahasa Indonesia jika tidak dibatasi oleh framework atau kontrak API.
- Nama variabel dan fungsi menggunakan Bahasa Indonesia yang jelas dengan gaya `camelCase`; nama tipe dan komponen menggunakan `PascalCase`.
- Nilai status menggunakan kode sederhana tanpa spasi, misalnya `baru`, `proses-review`, dan `selesai`, dengan label Bahasa Indonesia untuk tampilan.
- Perbedaan nama dari API eksternal harus dipetakan di service adapter, bukan disebarkan ke seluruh komponen UI.
- Import komponen dilakukan secara eksplisit agar alur dependency mudah dipelajari.
- Auto-import komponen tidak digunakan pada tahap awal pembelajaran.
- Jangan menambahkan `unplugin-vue-components` tanpa alasan teknis dan dokumentasi dependency.
- Setiap file kode baru dan contoh kode wajib memiliki komentar atau JSDoc dalam Bahasa Indonesia.
- Komentar inline harus menjelaskan tujuan file, fungsi bagian penting, input, output, dan alasan penggunaan pola tertentu.
- Setiap fitur harus menjelaskan konsep Vue yang dipakai, termasuk props, emits, state, computed, dan composable jika relevan.

## Dokumentasi Pembelajaran

Setiap fitur frontend wajib memiliki dokumentasi yang menjelaskan:

1. Tujuan dan ruang lingkup fitur.
2. Konsep Vue yang digunakan.
3. Fungsi setiap file yang terlibat.
4. Alur data dari parent ke child.
5. Props dan emits jika ada.
6. State loading, empty, error, dan unauthorized.
7. Contoh mock data atau mock response jika diperlukan.
8. Langkah implementasi manual.
9. Langkah verifikasi.
10. Risiko UI/UX dan keamanan data.
11. Penjelasan inline di dalam kode untuk bagian yang penting bagi pembelajaran.

## Aturan Domain PACS

- Bedakan metadata pasien/studi dari data pixel citra.
- Gunakan Study Instance UID, Series Instance UID, dan SOP Instance UID sesuai konteks DICOM.
- Operasi sensitif seperti share, delete, export, atau perubahan data harus meminta konfirmasi.
- Aktivitas penting harus dirancang agar dapat dicatat dalam audit trail.
- Mock data wajib jelas ditandai sebagai data dummy dan tidak menyerupai data pasien nyata.

## Quality Gate

Sebelum fitur dianggap selesai:

1. Alur utama berjalan tanpa full page reload.
2. Tidak ada error TypeScript, lint, atau console error yang tidak ditangani.
3. State kosong, gagal, loading, dan akses ditolak sudah tersedia.
4. Tampilan diuji pada desktop dan ukuran layar yang lebih kecil.
5. Dokumentasi terkait diperbarui.
6. Konsep Vue yang digunakan dapat dijelaskan dan dipahami dari dokumentasi fitur.
