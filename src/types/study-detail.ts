// Mengambil status studi yang sudah digunakan oleh worklist.
import type { StudyStatus } from "./study";

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
}