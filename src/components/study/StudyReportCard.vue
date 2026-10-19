<script setup lang="ts">
import { useRouter } from 'vue-router';
import type { StudyStatus } from '../../types/study';
import type { ReportStatus, StudyReport } from '../../types/study-detail';
import { computed } from 'vue';
import QrcodeVue from 'qrcode.vue';


interface PropertiStudyReportCard {
    // nilai null berarti dokter belum menambahkan bacaan.
    hasilBacaan: StudyReport | null

    // status studi menentukan apakah hasil sudah selesai.
    statusStudi: StudyStatus

    // UID dipakai sebagai parameter route laporan, bukan data di dalam QR.
    studyInstanceUid: string
}

// Menerima hasil bacaan dari halmaan detail studi.
const properti = defineProps<PropertiStudyReportCard>()
const router = useRouter()

// QR hanya boleh tampil jika studi selesai dan bacaan sudah final.
const qrBisaDitampilkan = computed(
    () => properti.statusStudi === 'selesai' && properti.hasilBacaan?.status == 'final'
)

// membuat URL penuh ke route laporan agar bisa dipindai dari perangkat lain.
const urlLaporan = computed (() => {
    if (typeof window === 'undefined') return '' 
        
    const routeLaporan = router.resolve({
        name: '/reports/[studyInstanceUid]',
        params: { studyInstanceUid: properti.studyInstanceUid },
    })

    return new URL(routeLaporan.href, window.location.origin).toString()
})

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
        
        <!-- QR dan tautan hanya tersedia untuk studi selesai dengan bacaan final. -->
                 <div v-if="qrBisaDitampilkan" class="report-qr">
                    <QrcodeVue :value="urlLaporan" :size="180" level="M" render-as="svg" />

                    <p>Pindai QR untuk membuka hasil bacaan.</p>

                    <RouterLink class="primary-button" :to="{
                        name: '/reports/[studyInstanceUid]',
                        params: { studyInstanceUid: properti.studyInstanceUid },
                    }">
                        Buka hasil laporan
                    </RouterLink>
                 </div>

                 <p v-else-if="
                 properti.hasilBacaan?.status === 'final' && properti.statusStudi !== 'selesai'">
                    QR tersedia setelah status studi selesai. 
                </p>
    </article>
</template>