<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';

// Mengambil informasi route yang sedang dibuka
const route = useRoute('/studies/[studyInstanceUid]')

// Mengambil study Intance UID dari URL.
// Contoh URL: /studies/Tn. bambang
const studyInstanceUid = computed(() => {
    return String(route.params.studyInstanceUid)
})
</script>

<template>
    <section class="study-detail-page">
        <p class="eyebrow">Detail Studi</p>

        <h1>Detail Pemeriksaan Radiologi</h1>

        <p class="page-description">
            Study Instance UID:
            <strong>{{ studyInstanceUid }}</strong>
        </p>

        <RouterLink to="/worklist" class="primary-button">
            Kembali ke Worklist
        </RouterLink>
    </section>
</template>