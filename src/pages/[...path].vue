<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>

<template>
    <section class="not-found-page" aria-labelledby="not-found-title">
        <div class="not-found-card" aria-hidden="true">
            404
        </div>
        <p class="eyebrow">PACS Navigation</p>
        <h1 id="not-found-title">
            Halaman tidak ditemukan
        </h1>

        <p class="not-found-description">
            Halaman yang kamu buka belum tersedia atau alamatnya tidak sesuai.
        </p>

        <RouterLink to="/worklist" class="not-found-link">
            Kembali ke Worklist
        </RouterLink>
    </section>
</template>