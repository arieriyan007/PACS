// Mengambil data studi dummy untuk simulasi API
import { mockStudies } from '../mocks/studies'

// Mengambil tipe data studi; field DICOM seperti studyInstanceUid.
import type { StudySummary } from '../types/study'

/* ======================================= */
/* TITLE: Mengambil daftar studi radiologi                               */
/* DESC: 
/* saat ini data berhasil dari mockStudies.
/* Nanti bagian ini dapat diganti dengan request ke backend                                 */
/* ======================================= */
export async function ambilDaftarStudi(): Promise<StudySummary[]>{

    // Karena fungsi menggunakan async,
    // hasil return otomatis dibungkus sebagai Promise
    return Promise.resolve(mockStudies)
}
    