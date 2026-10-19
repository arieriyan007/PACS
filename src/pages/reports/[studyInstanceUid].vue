<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { ambilDetailStudi } from '../../services/study-detail.service';
import type { StudyDetail } from '../../types/study-detail';

// Membuka dialog cetak browser agar laporan bisa disimpan sebagai PDF.
function cetakLaporan(): void {
    window.print()
}

// Route type membaca study instance UID dari URL laporan.
const route = useRoute('/reports/[studyInstanceUid]')

// UID ini nantinya dimasukkan ke tautan yang dibawa oleh QR Code
const studyInstanceUid = computed(() => route.params.studyInstanceUid)

// State untuk memisahkan proses memuat, kegagalan, dan laporan.
const detailStudi = ref<StudyDetail | null>(null)
const sedangMemuat = ref(false)
const pesanError = ref('')

// Hanya menghasilkan data laporan jika studi selesai dan bacaanya final
const laporanFinal = computed(() => {
    const detail = detailStudi.value

    if (detail?.status !== 'selesai' || detail.hasilBacaan?.status !== 'final') {
        return null
    }

    return {
        studi: detail,
        bacaan: detail.hasilBacaan,
    }

})

// Mengambil data mock berdsarkan UID pada alamat halaman.
async function muatLaporan(): Promise<void> {
    sedangMemuat.value = true
    pesanError.value = ''

    try{
        detailStudi.value = await ambilDetailStudi(studyInstanceUid.value)
    } catch {
        pesanError.value = 'Hasil laporan belum dapat dimuat. Silahkan coba lagi.'
    } finally {
        sedangMemuat.value = false
    }
}

// Memuat ulang data jika paramater UID pada route berubah.
watch(studyInstanceUid, muatLaporan, { immediate: true })

// Membuka dialog mock ke format yang mudah dibaca.
function formatTanggal(tanggal: string): string {
    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'long',
    }).format(new Date(`${tanggal}T00:00:00`))
}

</script>

<template>
    <section class="study-detail-page report-page">
        <div class="empty-state" v-if="sedangMemuat">
            <h1>Memuat hasil laporan</h1>
            <p>Hasil bacaan sedang disipkan.</p>
        </div>

        <div class="empty-state" v-else-if="pesanError">
            <h1>Hasil laporan belum tersedia</h1>
            <p>{{ pesanError }}</p>
        </div>

        <article v-else-if="laporanFinal" class="worklist-card printable-report">
            <p class="eyebrow">Laporan Radiologi . Data Demo</p>
            <h1>Hasil Bacaan Pemeriksaan</h1>

            <dl class="report-patient-details">
                <div>
                    <dt>Nama Pasien</dt>
                    <dd>{{ laporanFinal.studi.patientName }}</dd>
                </div>
                <div>
                    <dt>ID studi</dt>
                    <dd>{{ laporanFinal.studi.studyInstanceUid }}</dd>
                </div>
                <div>
                    <dt>Pemeriksaan</dt>
                    <dd>{{ laporanFinal.studi.studyDescription }}</dd>
                </div>
            </dl>

            <div class="report-heading">
                <div>
                    <strong>{{ laporanFinal.bacaan.namaDokter }}</strong>
                    <time :datetime="laporanFinal.bacaan.tanggalBacaan">
                        {{ formatTanggal(laporanFinal.bacaan.tanggalBacaan) }}
                    </time>
                </div>

                <span class="report-status report-status-final">Final</span>
            </div>

            <section class="report-section">
                <h2>Temuan</h2>
                <p>{{ laporanFinal.bacaan.temuan }}</p>
            </section>

            <p class="report-demo-note">
                Data ini hanya contoh untuk tampilan aplikasi, bukan hasil sebernya
            </p>

            <div class="report-action no-print">
                <button class="primary-button" type="button" @click="cetakLaporan">
                    Unduh hasil / Simpan sebagai PDF
                </button>

                <RouterLink class="secondary-button" to="/worklist">
                    Kembali ke Worklist
                </RouterLink>
            </div>
        </article>

        <div class="empty-state" v-else>
            <h1>Laporan tidak tersesia</h1>
            <p>Studi tidak ditemukan, belum selesai, atau bacaan dokter belum final</p>
            <RouterLink class="primary-button" to="/worklist">
                Kembali ke Worklist
            </RouterLink>
        </div>
    </section>

</template>