
<script setup lang="ts">
import { useRoute, RouterView } from 'vue-router';
import AppLayout from './layout/AppLayout.vue'

// Membaca route aktif agar halaman login bisa dibedakan dari halaman aplikasi.
const route = useRoute()
</script>

<template>
  <!-- Login tampil aktif tanpa sidebar dan header aplikasi. -->
   <RouterView v-if="route.path === '/login' " />

   <!-- Route lainnya tetap menggunakan layout PACS. -->
  <AppLayout v-else />
</template>