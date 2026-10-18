// Mengambil status studi yang sudah digunakan oleh worklist.
import type { StudyStatus } from "./study";

// Status bacaan yang ditampilkan pada halaman detail.
export type ReportStatus = 'draf' | 'final'

// Bentuk data bacaan dokter untuk satu study.
export interface StudyReport {
    // Nama dokter dummy
    namaDokter: string

    // Waktu bacan dibuat dalam format tanggal
    tanggalBacaan: string

    // Status bacaan: masih draf atau sudah final.
    status: ReportStatus

    // Bagian temuan pada bacaan.
    temuan: string

    // Ringaksan kesan pada bacaan dokter.
    kesan: string
}

// bentuk satu series dalam sebuah studi radiologi
export interface StudySeries {
    // Idenrifier resmi dari series DICOM.
    seriesInstanceUid: string

    // Modality series, musalnya CT, MR, atau CR.
    modality: string

    // Desckripsi series yang ditampilkan di UI.
    description: string

    // jumlah gambar atyau frame di dalam series.
    jumlahImage: number

    // Lokasi gambar pratinjau lokal; tidak semua series harus memilikinya.
    gambarPratinjau?: string
}

// Bentuk lengkap detail studi radiologi.
export interface StudyDetail {
    // Identifier resmi dari studi DICOM
    studyInstanceUid: string

    // Identifier pasien dummy untuk kebutuhan UI.
    patientId: string

    // Nama pasien dummy
    patientName: string
    
    // Jenis modality utama pada studi
    modality: string

    // tanggal pemeriksaan
    studyDate: string

    // Deskripsi pemeriksaan.
    studyDescription: string

    // Status proses studi.
    status: StudyStatus

    // Daftar series di dalam studi.
    series: StudySeries[]

    // Hasil bacaan bisa belum tersedia pada suatu studi.
    hasilBacaan: StudyReport | null
}