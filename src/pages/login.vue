<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { masukDenganDemo } from '../services/auth.services';

// Router dipakai untuk berpindah halaman tanpa memuat ulang seluruh aplikasi.
const router = useRouter()

// state form menyimpan input hanya selama halaman login terbuka.
const namaPengguna = ref('')
const kataSandi = ref('')
const kataSandiTerlihat = ref(false)

// state tampilan untuk proses dan pesan hasil login
const sedangMemuat = ref(false)
const pesanError = ref('')

// Tombol dinonaktifkan selama service mock sedang memproses login.
const tombolDinonaktifkan = computed(() => sedangMemuat.value)

// Mengirim input ke service mock; halaman tidak memeriksa kredesial
async function tanganiMasuk(): Promise<void> {
    pesanError.value = ''
    sedangMemuat.value = true

    try {
        await masukDenganDemo({
            namaPengguna: namaPengguna.value.trim(),
            kataSandi: kataSandi.value,
        })

        // Sesi lintas halaman dan route guard akan disambung pada tahap berikutnya
        await router.replace('/')
    } catch {
        // Pesan umum menghidari tampilan detail teknis kepada pengguna
        pesanError.value = 'Nama pengguna atau kata sandi tidak sesuai.'
    } finally {
        sedangMemuat.value = false
    }
}
</script>

<template>
    <main class="login-page">
        <section class="login-card" aria-labelledby="login-title">
            <div class="login-brand" aria-hidden="true">
                P
            </div>

            <p class="eyebrow">PACS RSUD Imaging</p>
            <h1 id="login-title">Masuk ke PACS</h1>
            <p class="login-description">
                Mode demo: autentikasi belum terhubung ke backend.
            </p>

            <form class="login-form" @submit.prevent="tanganiMasuk">
                <label for="nama-pengguna">Nama pengguna atau email</label>
                <input type="text" id="nama-pengguna" v-model="namaPengguna" name="namaPengguna"
                autocomplete="username" autocapitalize="none" required />

                <label for="kata-sandi">
                    Kata sandi
                </label>
                <div class="password-field">
                    <input :type="kataSandiTerlihat ? 'text' : 'password'" id="kata-sandi" v-model="kataSandi"
                    name="kataSandi" autocomplete="current-password" required />

                    <button type="button" class="password-toggle" :aria-pressed="kataSandiTerlihat"
                    @click="kataSandiTerlihat = !kataSandiTerlihat">
                        {{ kataSandiTerlihat ? 'Sembunyikan' : 'Tampilkan' }}
                    </button>
                </div>

                <p class="login-error" role="alert" v-if="pesanError">{{ pesanError }}</p>

                <button type="submit" class="primary-button login-submit" :disabled="tombolDinonaktifkan">
                    {{ sedangMemuat ? 'Memproses...' : 'Masuk' }}
                </button>
            </form>
        </section>
    </main>
</template>