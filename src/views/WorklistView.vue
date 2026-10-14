<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { StudyStatus, StudySummary } from '../types/study';
import { ambilDaftarStudi } from '../services/study.service';


// Menyimpan seluruh data studi yang berhasil dimuat.
const daftarStudi = ref<StudySummary[]>([])

// Menyimpan kata pencarian dari pengguna.
const kataKunci = ref('')

// Menyimpan filter status yang sedang dipilih.
const statusTerpilih = ref<StudyStatus | 'semua'>('semua')

// Menyimpan filter modality yang sedang dipilih.
const modalitasTerpilih = ref('semua')

// Menandai proses pengambilan data sedang berjalan.
const sedangMemuat = ref(false)

// Menyimpan pesan error yang aman ditampilkan kepada pengguna.
const pesanError = ref('')

// label status untuk kebutuhan tampilan UI.
const labelStatus: Record<StudyStatus, string> = {
    baru: 'Baru',
    'proses-review': 'Proses review',
    selesai: 'Selesai',
}

// pilihan status yang ditampilkan pada filter.
const pilihanStatus = [
    {nilai: 'semua', label: 'Semua status'},
    {nilai: 'baru', label: 'Baru'},
    {nilai: 'proses-review', label: 'Proses review'},
    {nilai: 'selesai', label: 'Selesai'},
] as const

// pilihan modality untuk tahap mock data.
const pilihanModalitas = ['semua', 'CT', 'MR', 'CR']

/* ======================================= */
/* Menghasilkan data studi berdsarkan kata kunci dan filter.  */
/*                                */
/* ======================================= */
const daftarStudiTersering = computed(() => {
    const kataKunciKecil = kataKunci.value.trim().toLowerCase()

    return daftarStudi.value.filter((studi) => {
        const cocokDenganKataKunci =
            kataKunciKecil.length === 0 ||
            studi.patientId.toLowerCase().includes(kataKunciKecil) ||
            studi.patientName.toLowerCase().includes(kataKunciKecil) ||
            studi.studyDescription.toLowerCase().includes(kataKunciKecil)

        const cocokDenganStatus = 
            statusTerpilih.value === 'semua' ||
            studi.status === statusTerpilih.value

        const cocokDenganModalitas =
            modalitasTerpilih.value === 'semua' ||
            studi.modality === modalitasTerpilih.value

    return (
        cocokDenganKataKunci && cocokDenganStatus && cocokDenganModalitas
    )
    })
})

/* ======================================= */
/* Mengambil data studi dari service       */
/* ======================================= */
async function muatDaftarStudi() {
    sedangMemuat.value = true
    pesanError.value = ''

    try {
        daftarStudi.value = await ambilDaftarStudi()
    } catch {
        // Jangan tampilkan detail teknis error kepada pengguna.
        pesanError.value =
            'Data studi belum dapat dimuat. Silahkan coba lagi.'
    } finally {
        sedangMemuat.value = false
    }
}

/* ======================================= */
/* Mengubah format tanggal agar sesuai Indonesia                                */
/* ======================================= */
function formatTanggal(tanggal: string) {
    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'medium',
    }).format(new Date(tanggal))
}

// Memuat data pertama kali saat halaman dibuka
onMounted(muatDaftarStudi)
</script>

<template>
    <section class="worklist-page">
        <div class="page-header">
            <div class="">
            <p class="eyebrow">PACS</p>
            <h1>Worklist Radiologi</h1>
            <p class="page-description">Daftar pemeriksaan radiologi yang tersedia.</p>
        </div>

        <button class="primary-button" type="button" 
        :disabled="sedangMemuat" @click="muatDaftarStudi">
        {{ sedangMemuat ? 'Memuat...' : 'Muat ulang data' }}
    </button>
    </div>

    <div class="worklist-card">
        <div class="worklist-toolbar">
            <label class="filter-field">
                <span>Cari pasien atau pemeriksaan</span>

                <input type="search" v-model="kataKunci" placeholder="Contoh: PATIENT-001">
            </label>

            <label for="" class="filter-field">
                <span>Status</span>

                <select v-model="statusTerpilih">
                    <option :value="pilihan.nilai"
                    v-for="pilihan in pilihanStatus"
                    :key="pilihan.nilai">
                        {{ pilihan.label }}
                    </option>
                </select>
            </label>

            <label class="filter-field">
                <span>Modalitas</span>

                <select v-model="modalitasTerpilih">
                    <option :value="modalitas"
                        :key="modalitas"
                        v-for="modalitas in pilihanModalitas">
                        {{ modalitas === 'semua' ? 'Semua modalitas' : modalitas }}
                    </option>
                </select>
            </label>
    
        </div>

        <div class="empty-state" v-if="sedangMemuat">
            <h2>Memuat data studi</h2>
            <p>Daftar pemeriksaan sedang disipkan.</p>
        </div>

        <div class="empty-state" v-else-if="pesanError">
            <h2>Data belum dapat dimuat</h2>
            <p>{{ pesanError }}</p>

            <button class="primary-button" type="button" @click="muatDaftarStudi">
                Coba lagi
            </button>
        </div>

        <div class="empty-state" v-else-if="daftarStudiTersering.length === 0">
            <h2>Tidak ada studi yang sesuai</h2>
            <p>Coba ubah kata pencarian atau filter yang dipilih.</p>
        </div>

        <div class="table-wrapper" v-else>
            <table class="study-table">
                <thead>
                    <tr>
                    <th scope="col">Tanggal</th>
                    <th scope="col">Pasien</th>
                    <th scope="col">Modalitas</th>
                    <th scope="col">Pemeriksaan</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="studi in daftarStudiTersering" :key="studi.studyInstanceUid">

                    <td>{{ formatTanggal(studi.studyDate) }}</td>

                    <td>
                        <strong>{{ studi.patientName }}</strong>
                        <small>{{ studi.patientId }}</small>
                    </td>

                    <td>{{ studi.modality }}</td>

                    <td>{{ studi.studyDescription }}</td>

                    <td>
                        <span class="status-badge" :class="`status-$(studi.status)`">
                            {{ labelStatus[studi.status] }}
                        </span>
                    </td>

                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </section>
</template>