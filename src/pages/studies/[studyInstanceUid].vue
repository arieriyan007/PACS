<script setup lang="ts">
import StudyHeader from '../../components/study/StudyHeader.vue';
import StudyMetadataCard from '../../components/study/StudyMetadataCard.vue';
import SeriesList from '../../components/study/SeriesList.vue';

import { computed, onMounted, ref } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import type { StudyDetail } from '../../types/study-detail';
import { ambilDetailStudi } from '../../services/study-detail.service';

// Mengambil informasi route yang sedang dibuka
const route = useRoute('/studies/[studyInstanceUid]')

// Mengambil study Intance UID dari URL.
// Contoh URL: /studies/Tn. bambang
const studyInstanceUid = computed(() => {
    return String(route.params.studyInstanceUid)
})

// Menyimpan detail studi yang berhasil ditemukan.
const detailStudi = ref<StudyDetail | null>(null)

// Menandai proses pengembalian data
const sedangMemuat = ref(false)

// Menyimpan pesan error yang aman untuk pengguna.
const pesanError = ref('')

// Mengambil detail studi berdasarkan UID pada URL.
async function muatDetailStudi() {
    sedangMemuat.value = true
    pesanError.value = ''

    try {
        detailStudi.value = await ambilDetailStudi(
            studyInstanceUid.value,
        )
    } catch {
        pesanError.value = 
        'Detail studi belum dapat dimuat. Silahkan coba lagi.'
    } finally {
        sedangMemuat.value = false
    }
}

// Memuat detail saat halaman pertma kali dibuka.
onMounted(muatDetailStudi)
</script>

<template>
    <section class="study-detail-page">
        <div v-if="sedangMemuat" class="empty-state">
            <h2>Memuat detail studi</h2>
            <p>Informasi pemeriksaan sedang disiapkan.</p>
        </div>

        <div v-else-if="pesanError" class="empty-state">
            <h2>Detail studi belum tersedia</h2>
            <p>{{ pesanError }}</p>

            <button class="primary-button" type="button" @click="muatDetailStudi">
                Coba lagi
            </button>
        </div>

        <div v-else-if="!detailStudi" class="empty-state">
            <h2>Studi tidak ditemukan</h2>
            <p>data studi dengan identifier tersebut belum tersedia</p>
        </div>

        <div v-else class="study-detail-content">
            <StudyHeader :detail-studi="detailStudi" />

            <StudyMetadataCard :detail-studi="detailStudi" />

            <SeriesList :series="detailStudi.series" />
        </div>

        <RouterLink to="/worklist" class="primary-button">
            Kembali ke Worklist
        </RouterLink>
    </section>
</template>