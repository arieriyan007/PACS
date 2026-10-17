<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';


// Router digunakan untuk mengrahkan router lama ke halaman Worklist
const router = useRouter()

// Route /studies diarahkan ke halaman daftar utama.
onMounted(() => {
    router.replace('/worklist')
})
</script>

<template>
    <main class="empty-state">
        <p>Mengarahkan ke Worklist...</p>
    </main>
</template>
