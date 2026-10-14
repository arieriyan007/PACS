<script setup lang="ts">
import { RouterLink } from 'vue-router';

// Data semenetara untuk tampilan Dashboard
// nanti diganti dengan data dari backend
const ringkasanDashboard = [
    {
        label: 'Studi hari ini',
        nilai: '24',
        keterangan: 'Pemeriksaan terdaftar',
    },
    {
        label: 'Studi baru',
        nilai: '8',
        keterangan: 'Menunggu review',
    },
    {
        label: 'Dalam proses review',
        nilai: '10',
        keterangan: 'Sedang ditangani',
    },
    {
        label: 'Selesai',
        nilai: '6',
        keterangan: 'Review selesai',
    },
    
]
</script>

<template>
    <section class="dashboard-page">
        <div class="page-header">
            <div class="">
                <p class="eyebrow">PACS</p>
                    <h1>Dashboard</h1>

                    <p class="page-description">
                        Ringkasan aktivitas pemeriksaan radiologi.
                    </p>
            </div>

            <RouterLink to="/worklist" class="primary-button">
                Buka Wokrlist
            </RouterLink>
        </div>

        <div class="summary-grid">
            <article v-for="ringkasan in ringkasanDashboard" :key="ringkasan.label" class="summary-card">
                <span>{{ ringkasan.label }}</span>
                <strong>{{ ringkasan.nilai }}</strong>
                <small>{{ ringkasan.keterangan }}</small>
            </article>
        </div>
    </section>
</template>