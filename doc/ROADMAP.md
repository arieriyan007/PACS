# Roadmap Pengembangan PACS

## Fase 0 — Fondasi Project

- [x] Menetapkan `AGENTS.md` sebagai instruksi AI agent.
- [x] Menetapkan aturan project.
- [x] Menetapkan arah desain UI.
- [ ] Membuat scaffold Vue 3 + Vite + TypeScript.
- [ ] Menyiapkan ESLint, Prettier, dan test runner.

## Fase 1 — Shell Aplikasi dan Autentikasi

- [ ] Membuat layout utama: sidebar, header, content area.
- [ ] Membuat halaman login.
- [ ] Menambahkan route guard dan session management.
- [ ] Menambahkan halaman unauthorized dan not found.
- [ ] Menyiapkan design tokens dan komponen dasar.

## Fase 2 — Worklist Radiologi

- [ ] Menampilkan daftar studi pemeriksaan.
- [ ] Menambahkan search dan filter berdasarkan pasien, modality, status, dan tanggal.
- [ ] Menambahkan pagination atau infinite scroll sesuai kebutuhan API.
- [ ] Menambahkan loading skeleton, empty state, dan error state.
- [ ] Menambahkan sorting dan refresh data.

## Fase 3 — Detail Studi

- [ ] Menampilkan identitas pasien secara aman.
- [ ] Menampilkan metadata study dan series.
- [ ] Menampilkan riwayat status dan informasi radiologi yang relevan.
- [ ] Menambahkan navigasi menuju viewer.

## Fase 4 — DICOM Viewer

- [ ] Menyiapkan adapter DICOMweb.
- [ ] Menampilkan daftar series dan thumbnail.
- [ ] Menambahkan viewport citra.
- [ ] Menambahkan zoom, pan, window/level, rotate, dan reset.
- [ ] Menambahkan navigasi image/frame.
- [ ] Menguji performa dengan studi multi-series.

## Fase 5 — Keamanan dan Audit

- [ ] Menetapkan strategi token dan refresh session.
- [ ] Menambahkan audit trail untuk aktivitas penting.
- [ ] Menambahkan permission berbasis role.
- [ ] Meninjau risiko PHI pada log, cache, URL, dan storage browser.

## Fase 6 — Stabilitas dan Rilis

- [ ] Menambahkan unit test dan component test prioritas tinggi.
- [ ] Menambahkan end-to-end test untuk login, worklist, detail, dan viewer.
- [ ] Menambahkan error monitoring.
- [ ] Menyiapkan environment development, staging, dan production.
- [ ] Menyiapkan checklist deployment dan rollback.

## Prioritas MVP

MVP minimal harus mencakup login, worklist, detail studi, route guard, mock service, dan layout responsif. DICOM viewer dapat dimulai dengan viewport dasar lalu dikembangkan bertahap.
