# Fitur Login

## Status

- Status: Perencanaan
- Cakupan tahap pertama: UI/UX dan simulasi autentikasi frontend
- Backend autentikasi: Belum tersedia
- Penyimpanan sesi: Memori aplikasi selama aplikasi berjalan
- Catatan: Simulasi ini bukan mekanisme keamanan dan tidak boleh dipakai untuk melindungi data klinis di production.

## Tujuan

Menyediakan halaman login agar pengguna dapat memahami alur masuk ke aplikasi PACS sebelum kontrak autentikasi backend tersedia.

Tahap pertama berfokus pada bentuk UI, validasi input dasar, status proses, pesan gagal, alur berhasil, dan navigasi menuju halaman aplikasi. Pemeriksaan identitas dan hak akses yang sungguhan tetap menjadi tanggung jawab backend saat integrasi tersedia.

## Asumsi dan Batas Cakupan

- Project hanya mengerjakan frontend dan belum memiliki endpoint autentikasi.
- Tidak ada password, token, atau data pasien nyata dalam mock, source code, log, maupun dokumentasi.
- Login mock hanya untuk memperagakan alur UI.
- Sesi demo disimpan di state aplikasi dalam memori dan hilang ketika halaman dimuat ulang.
- Tidak menggunakan `localStorage` atau `sessionStorage` untuk menyimpan password maupun token.
- Route guard mock hanya membantu demonstrasi navigasi; pengguna tetap dapat melewati perlindungan frontend dan ini bukan kontrol akses production.
- Tidak menambahkan dependency baru untuk fitur ini.

## Alur Pengguna

1. Pengguna membuka `/login`.
2. Halaman menampilkan form nama pengguna/email dan kata sandi.
3. Pengguna mengisi form lalu memilih tombol masuk.
4. Form memeriksa input wajib dan menampilkan status proses.
5. Service mock mengembalikan hasil demo yang deterministik.
6. Jika simulasi berhasil, state sesi demo diperbarui dan pengguna diarahkan ke Dashboard atau halaman tujuan yang aman.
7. Jika simulasi gagal, halaman menampilkan pesan umum tanpa detail teknis.
8. Jika pengguna membuka route terlindungi tanpa sesi demo, route guard mengarahkannya ke `/login`.
9. Pengguna dapat keluar melalui aksi keluar; sesi demo dihapus dari state aplikasi.

## Route

Route menggunakan file-based routing yang sudah tersedia dari Vue Router:

| Route | File | Akses pada simulasi |
|---|---|---|
| `/login` | `src/pages/login.vue` | Publik |
| `/` | `src/pages/index.vue` | Memerlukan sesi demo |
| `/worklist` | `src/pages/worklist.vue` | Memerlukan sesi demo |
| `/studies/:studyInstanceUid` | `src/pages/studies/[studyInstanceUid].vue` | Memerlukan sesi demo |

Route 404 tetap menampilkan halaman tidak ditemukan. Route login tidak boleh menampilkan sidebar dan topbar aplikasi.

## Struktur File yang Direncanakan

| File | Tanggung jawab |
|---|---|
| `doc/features/login.md` | Rancangan, cakupan, risiko, dan verifikasi fitur |
| `src/pages/login.vue` | Form login dan state tampilan halaman |
| `src/types/auth.ts` | Bentuk data pengguna demo dan state autentikasi frontend |
| `src/services/auth.service.ts` | Adapter mock untuk mensimulasikan proses login dan logout |
| `src/stores/auth.store.ts` | State sesi demo lintas halaman menggunakan Pinia |
| `src/main.ts` | Route guard demo untuk navigasi SPA |
| `src/layout/AppLayout.vue` | Menampilkan shell aplikasi hanya pada route aplikasi yang sesuai |
| `src/style.css` | Tampilan form, status, responsivitas, dan fokus keyboard |
| `doc/ROADMAP.md` | Status implementasi login dan route guard setelah selesai |

## Rancangan UI/UX

Halaman login memiliki:

- identitas PACS dan penjelasan singkat fungsi aplikasi;
- field nama pengguna/email dengan label yang terlihat;
- field kata sandi dengan tombol tampil/sembunyikan yang aksesibel;
- tombol masuk dengan status memuat dan pencegahan pengiriman berulang;
- pesan validasi yang terkait dengan field;
- pesan gagal umum yang tidak membocorkan detail teknis;
- keterangan jelas bahwa autentikasi masih dalam mode demo.

Layout login tidak menampilkan sidebar, profil pengguna, atau status koneksi yang seolah-olah berasal dari server.

## State Tampilan

### Awal

Form kosong dan siap diisi.

### Validasi

Field wajib yang kosong menampilkan arahan yang jelas. Field memakai label, `autocomplete` yang sesuai, dan pesan validasi yang dapat dibaca teknologi bantu.

### Memuat

Tombol dinonaktifkan sementara, label berubah menjadi `Memproses...`, dan pengguna mendapat indikator proses.

### Gagal

Tampilkan pesan aman seperti `Nama pengguna atau kata sandi tidak sesuai.` Jangan tampilkan stack trace, kredensial, token, maupun response mentah.

### Berhasil

Pada mode demo, tampilkan navigasi ke halaman tujuan. Jangan memberi kesan bahwa kredensial telah diverifikasi oleh server.

### Sesi tidak tersedia

Route guard mengarahkan pengguna yang tidak memiliki sesi demo ke `/login`. Jika tersedia parameter tujuan, hanya path internal aplikasi yang boleh digunakan sebagai tujuan kembali.

## Rancangan Data dan Arsitektur

- Pinia menyimpan status sesi demo dan identitas pengguna demo di memori.
- Service menjadi satu-satunya tempat simulasi login/logout; halaman tidak memeriksa kredensial secara langsung.
- Route guard membaca state store untuk mengatur navigasi demo.
- Store tidak menyimpan password.
- Bentuk response mock dibuat mirip kebutuhan frontend, tetapi bukan kontrak API final.
- Saat API backend tersedia, service mock diganti atau diadaptasi agar komponen tetap memakai alur store yang sama.

## Konsep Vue yang Dipelajari

- `v-model` menghubungkan input form dengan state lokal.
- `ref()` menyimpan nilai input, status memuat, dan pesan form.
- `computed()` dapat menentukan apakah form dapat dikirim.
- `@submit.prevent` menangani pengiriman tanpa reload halaman.
- Pinia menyimpan state sesi yang perlu dibaca lintas halaman.
- Vue Router guard mengatur perpindahan halaman SPA.
- `RouterLink` digunakan untuk navigasi internal; login tidak memakai tautan atau reload penuh.

## Risiko dan Keamanan

- Login mock tidak memverifikasi identitas dan tidak melindungi data pasien.
- Route guard frontend dapat dilewati; otorisasi sebenarnya harus dilakukan backend pada setiap API.
- Jangan menyimpan password atau token di browser.
- Jangan memasukkan kredensial demo yang menyerupai akun production.
- Jangan menampilkan data pasien pada halaman login atau pesan error.
- Fitur lupa kata sandi, MFA, penguncian akun, refresh token, role/permission, dan audit trail memerlukan kontrak backend serta rancangan keamanan tersendiri.
- Hindari open redirect; tujuan setelah login hanya boleh berupa route internal yang diizinkan.

## Kriteria Selesai

- [ ] Dokumentasi awal tersedia sebelum panduan implementasi kode.
- [ ] Route `/login` dibuat melalui file-based routing.
- [ ] Halaman login tidak menampilkan shell aplikasi.
- [ ] Form memiliki label, validasi dasar, dan akses keyboard.
- [ ] Status awal, memuat, gagal, dan berhasil ditampilkan dengan jelas.
- [ ] Simulasi login dan logout dipisahkan ke service.
- [ ] State sesi demo berada di Pinia dan hanya disimpan di memori.
- [ ] Route guard demo menangani route yang memerlukan sesi.
- [ ] Pengguna tanpa sesi diarahkan ke login.
- [ ] Pesan error tidak membocorkan detail teknis atau kredensial.
- [ ] UI secara jelas menyatakan bahwa autentikasi masih simulasi.
- [ ] Tidak ada password, token, secret, atau data pasien nyata di repository.
- [ ] Tidak ada error TypeScript atau console error.
- [ ] Dokumentasi dan roadmap diperbarui setelah implementasi manual selesai.

## Langkah Implementasi Manual

1. Tinjau rancangan ini sebelum menambahkan kode.
2. Buat type pengguna dan state autentikasi demo.
3. Buat service mock dengan hasil yang dapat diuji secara konsisten.
4. Buat store Pinia untuk state sesi demo.
5. Buat halaman `src/pages/login.vue` dengan form aksesibel dan state tampilan.
6. Sesuaikan `AppLayout.vue` agar route login tidak menggunakan sidebar dan topbar.
7. Tambahkan route guard di konfigurasi router pada `src/main.ts` tanpa mengubah file route hasil generate.
8. Tambahkan tampilan responsif dan fokus keyboard ke `src/style.css`.
9. Perbarui dokumentasi setelah implementasi selesai dan tandai batas autentikasi mock.

## Langkah Verifikasi Manual

1. Jalankan `npm run dev`.
2. Buka `/login` dan pastikan shell aplikasi tidak tampil.
3. Kirim form kosong dan periksa validasi field.
4. Uji status memuat, gagal, dan berhasil sesuai perilaku service mock.
5. Pastikan login berhasil menuju Dashboard atau path internal yang diizinkan.
6. Buka `/worklist` tanpa sesi demo dan pastikan diarahkan ke `/login`.
7. Keluar, lalu pastikan route terlindungi kembali meminta sesi demo.
8. Muat ulang aplikasi dan pastikan sesi in-memory berakhir.
9. Uji navigasi keyboard dan tampilan pada layar kecil.
10. Jalankan `npm run build`.

## Catatan Integrasi Backend

Ketika kontrak backend tersedia, ganti service mock dengan request autentikasi yang ditetapkan backend dan ikuti keputusan keamanan mengenai cookie, token, masa berlaku sesi, refresh, logout, CSRF, CORS, serta audit. Jangan menganggap state Pinia atau route guard frontend sebagai pengganti autentikasi dan otorisasi backend.
