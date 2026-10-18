<script setup lang="ts">
import type { ReportStatus, StudyReport } from '../../types/study-detail';


interface PropertiStudyReportCard {
    // nilai null berarti dokter belum menambahkan bacaan.
    hasilBacaan: StudyReport | null
}

// Menerima hasil bacaan dari halmaan detail studi.
const properti = defineProps<PropertiStudyReportCard>()

// Mengubah kode status menjadi label yang ditampilkan kepada user.
const labelStatus: Record<ReportStatus, string> = {
    draf: 'Draf',
    final: 'Final',
}

// Menampilkan tanggal bacaan dalam format Bahasa Indoensua.
function formatTanggal(tanggal: string): string {
    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'long',
    }).format(new Date(`${tanggal}T00:00:00`))
}
</script>

<template>
    <article class="worklist-card study-report-card">
        <h2>Hasil Bacaan Dokter</h2>

        <p class="report-empty" v-if="!properti.hasilBacaan">
            Hasil bacaan dokter belum tersedia untuk studi ini.
        </p>

        <div class="report-content" v-else>
            <div class="report-heading">
                <div>
                    <strong>{{ properti.hasilBacaan.namaDokter }}</strong>

                    <time :datetime="properti.hasilBacaan.tanggalBacaan">
                        {{ formatTanggal(properti.hasilBacaan.tanggalBacaan) }}
                    </time>
                </div>

                <span class="report-status" :class="`report-status-${properti.hasilBacaan.status}`">
                    {{ labelStatus[properti.hasilBacaan.status] }}
                </span>
            </div>

            <section class="report-section" aria-labelledby="report-finding-title">
                <h3 id="report-finding-title">Temuan</h3>
                <p>{{ properti.hasilBacaan.temuan }}</p>
            </section>

            <section class="report-section" aria-labelledby="report-impression-title">
                <h3 id="report-impression-title">Kesan</h3>
                <p>{{ properti.hasilBacaan.kesan }}</p>
            </section>

            <p class="report-demo-note">
                Data bacaan ini hanya dummy/contoh untuk tampilan aplikasi.
            </p>
        </div>
        
    </article>
</template>