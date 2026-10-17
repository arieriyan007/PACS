<script setup lang="ts">
import { ref } from "vue";
import type { StudySeries } from "../../types/study-detail";

interface PropertiSeriesList {
    series: StudySeries[]
}

// Menerima daftar series dari halaman detail studi
defineProps<PropertiSeriesList>()

// Menyimpan elemen dialog untuk dibuka dan ditutup.
const dialogPratinjau = ref<HTMLDialogElement | null>(null)

// Menyimpan gambar dan anma series yang sedang diperbesar.
const gambarTerpilih = ref<{
    sumber: string
    deskripsi: string
} | null>(null)

// Membuka dialog dan menampilkan gambar terpilih.
function bukaPratinjau(sumber: string, deskripsi: string): void {
    gambarTerpilih.value = { sumber, deskripsi }
    dialogPratinjau.value?.showModal()
}

// Menutup dialog pratinjau.
function tutupPratinjau(): void {
    dialogPratinjau.value?.close()
}

</script>

<template>
    <article class="worklist-card">
        <h2>Series ({{ series.length }})</h2>

        <div v-if="series.length === 0" class="empty-state">
            <p>Belum ada series pada studi ini.</p>
        </div>

        <ul v-else>
            <li v-for="item in series" :key="item.seriesInstanceUid">

                <div class="series-contet">
                    <button v-if="item.gambarPratinjau" type="button"
                    class="series-preview-button" :aria-label="`Perbesar gambar ${item.description}`"
                    @click="bukaPratinjau(item.gambarPratinjau, item.description)">
                    
                    <!-- Gambar hanya ditampilkan jika series memiliki path pratinjau -->
                    <img :src="item.gambarPratinjau" :alt="`Pratinjau radiologi: ${item.description}`"
                    class="series-preview" loading="lazy">

                    </button>
                </div>

                <div class="series-copy">
                    <strong>{{ item.description }}</strong>
                    <small>{{ item.seriesInstanceUid }}</small>
                </div>

                <span>
                    {{ item.modality }} - {{ item.jumlahImage }} image
                </span>
            </li>
        </ul>

        <!-- Dialog ini menmapilkan gambar terpilih dalam ukuran lebih besar. -->
         <dialog ref="dialogPratinjau" class="series-preview-dialog"
         @click.self="tutupPratinjau" @close="gambarTerpilih = null">

         <div v-if="gambarTerpilih" class="series-preview-dialog-content">
            <button type="button" class="series-preview-close" aria-label="Tutup gambar"
            @click="tutupPratinjau">
                Tutup
            </button>

            <img :src="gambarTerpilih.sumber" :alt="`Gambar radiologi: ${gambarTerpilih.deskripsi}`" />

            <p>{{ gambarTerpilih.deskripsi }}</p>
         </div>

         </dialog>
    </article>
</template>