<script setup lang="ts">
import type { StudySeries } from "../../types/study-detail";

interface PropertiSeriesList {
    series: StudySeries[]
}

defineProps<PropertiSeriesList>()
</script>

<template>
    <article class="worklist-card">
        <h2>Series ({{ series.length }})</h2>

        <div v-if="series.length === 0" class="empty-state">
            <p>Belum ada series pada studi ini.</p>
        </div>

        <ul v-else>
            <li v-for="item in series" :key="item.seriesInstanceUid">
                <div class="">
                    <strong>{{ item.description }}</strong>
                    <small>{{ item.seriesInstanceUid }}</small>
                </div>

                <span>
                    {{ item.modality }} - {{ item.jumlahImage }} image
                </span>
            </li>
        </ul>
    </article>
</template>