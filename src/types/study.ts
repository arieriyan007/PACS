// Status yang munkgin dimiliki oleh sebuah studi radiologi
export type StudyStatus = 'baru' | 'proses-review' | 'selesai'

// Bentuk data ringkas yang akan ditampilkan pada Worklist.
export interface StudySummary {
    studyInstanceUid: string
    patientId: string
    patientName: string
    modality: string
    studyDate: string
    studyDescription: string
    status: StudyStatus
}