<script setup lang="ts">
import type { StudyDetail } from '../../types/study-detail';

interface PropertiStudyMetadataCard {
    detailStudi: StudyDetail
}

defineProps<PropertiStudyMetadataCard>()
</script>

<template>
    <article class="worklist-card">
        <h2>Informasi Studi</h2>

        <p>Study Instance UID: <strong>{{ detailStudi.studyInstanceUid }}</strong></p>
        <p>Pasien: <strong>{{ detailStudi.patientName }}</strong></p>
        <p>Patinet ID: <strong>{{ detailStudi.patientId }}</strong></p>
        <p>Modalitas: <strong>{{ detailStudi.modality }}</strong></p>
        <p>Tanggal pemeriksaan: <strong>{{ detailStudi.studyDate }}</strong></p>
    </article>
</template>