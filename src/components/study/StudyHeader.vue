<script setup lang="ts">
import type { StudyStatus } from '../../types/study';
import type { StudyDetail, } from '../../types/study-detail';

interface PropertiStudyHeader {
    detailStudi: StudyDetail
}

defineProps<PropertiStudyHeader>()

// Mengubah kode status menjadi label yang mudah dibada pengguna.
const labelStatus: Record<StudyStatus, string> = {
    baru: 'Baru',
    'proses-review': 'Proses review',
    selesai: 'Selesai',
}
</script>

<template>
    <header class="study-detail-header">
        <p class="eyebrow">Detail Studi</p>
        <h1>Detail Pemeriksaan Radiologi</h1>

        <p class="page-description">
            {{ detailStudi.studyDescription }}
        </p>

        <span class="status-badge">
            {{ labelStatus[detailStudi.status] }}
        </span>
    </header>
</template>