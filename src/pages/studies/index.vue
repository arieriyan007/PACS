<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { ambilDaftarStudi } from '../../services/study.service'
import type { StudyStatus, StudySummary } from '../../types/study'

// Menyimpan daftar studi yang akan ditampilkan di halaman.
const daftarStudi = ref<StudySummary[]>([])

// Mengatur tampilan saat data sedang dimuat.
const sedangMemuat = ref(false)

// Menyimpan pesan error jika pengambilan data gagal.
const pesanError = ref('')

// Mengubah kode status menjadi tulisan yang mudah dibaca pengguna.
const labelStatus: Record<StudyStatus, string> = {
  baru: 'Baru',
  'proses-review': 'Proses review',
  selesai: 'Selesai',
}

// Mengubah UID studi menjadi URL detail studi.
function tautanDetailStudi(studyInstanceUid: string): string {
  return `/studies/${encodeURIComponent(studyInstanceUid)}`
}

// Mengubah tanggal dari data menjadi format Indonesia.
function formatTanggal(tanggal: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(tanggal))
}

// Mengambil daftar studi dari service mock.
async function muatDaftarStudi(): Promise<void> {
  sedangMemuat.value = true
  pesanError.value = ''

  try {
    daftarStudi.value = await ambilDaftarStudi()
  } catch {
    pesanError.value = 'Daftar studi gagal dimuat.'
  } finally {
    sedangMemuat.value = false
  }
}

// Menjalankan pengambilan data saat halaman pertama kali dibuka.
onMounted(muatDaftarStudi)
</script>

<template>
  <section class="studies-page">
    <div class="page-heading">
      <div>
        <p class="eyebrow">PACS / Studies</p>
        <h1>Daftar Studi</h1>
        <p class="page-description">
          Daftar pemeriksaan radiologi yang tersedia.
        </p>
      </div>

      <RouterLink to="/worklist" class="secondary-button">
        Buka Worklist
      </RouterLink>
    </div>

    <article class="worklist-card studies-card">
      <div v-if="sedangMemuat" class="empty-state">
        <p>Daftar studi sedang dimuat...</p>
      </div>

      <div v-else-if="pesanError" class="error-state">
        <p>{{ pesanError }}</p>
        <button type="button" class="primary-button" @click="muatDaftarStudi">
          Coba lagi
        </button>
      </div>

      <div v-else-if="daftarStudi.length === 0" class="empty-state">
        <p>Belum ada studi yang tersedia.</p>
      </div>

      <div v-else class="table-wrapper">
        <table class="study-table">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Pasien</th>
              <th>Modalitas</th>
              <th>Pemeriksaan</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="studi in daftarStudi"
              :key="studi.studyInstanceUid"
            >
              <td>{{ formatTanggal(studi.studyDate) }}</td>

              <td>
                <strong>{{ studi.patientName }}</strong>
                <small>{{ studi.patientId }}</small>
              </td>

              <td>{{ studi.modality }}</td>
              <td>{{ studi.studyDescription }}</td>

              <td>
                <span
                  class="status-badge"
                  :class="`status-${studi.status}`"
                >
                  {{ labelStatus[studi.status] }}
                </span>
              </td>

              <td>
                <RouterLink
                  :to="tautanDetailStudi(studi.studyInstanceUid)"
                  class="table-link"
                >
                  Lihat detail
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </section>
</template>