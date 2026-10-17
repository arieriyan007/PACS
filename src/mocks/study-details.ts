import type { StudyDetail } from "../types/study-detail";


// Data ini hanya untuk kebutuhan tampilan fontend
export const mockStudyDetails: StudyDetail[] = [
    {
        studyInstanceUid: 'DEMO-STUDY-001',
        patientId: 'DEMO-PATIENT-001',
        patientName: 'Tn. Bambang',
        modality: 'CT',
        studyDate: '2026-10-12',
        studyDescription: 'Ujicoba Chest Examination',
        status: 'baru',

        series: [
            {
                seriesInstanceUid: 'DEMO-SERIES-001-A',
                modality: 'CT',
                description: 'Axial Chest',
                jumlahImage: 120,
            },
            {
                seriesInstanceUid: 'DEMO-SERIES-001-B',
                modality: 'CT',
                description: 'Coronal Reconstruction',
                jumlahImage: 45,
            },
        ],
    },
    {
        studyInstanceUid: 'DEMO-STUDY-002',
        patientId: 'DEMO-PATIENT-002',
        patientName: 'Ny. Sumarni',
        modality: 'MR',
        studyDate: '2026-10-11',
        studyDescription: 'Pemeriksaan Otak',
        status: 'proses-review',

        series: [
            {
                seriesInstanceUid: 'DEMO-SERIES-002-A',
                modality: 'MR',
                description: 'Potongan Otak',
                jumlahImage: 80,
                gambarPratinjau: '/images/radiologi/mri-otak.jpg',
            },
            {
                seriesInstanceUid: 'DEMO-SERIES-002-B',
                modality: 'MR',
                description: 'Pencitraan Pembuluh Darah',
                jumlahImage: 35,
            },
        ],
    },
    {
        studyInstanceUid: 'DEMO-STUDY-003',
        patientId: 'DEMO-PATIENT-003',
        patientName: 'Tn. Oscar Delahoya',
        modality: 'CR',
        studyDate: '2026-10-10',
        studyDescription: 'Foto Rongent Dada',
        status: 'selesai',

        series: [
            {
                seriesInstanceUid: 'DEMO-SERIES-003-A',
                modality: 'CR',
                description: 'Rongent Dada Depan',
                jumlahImage: 2,
            },
            {
                seriesInstanceUid: 'DEMO-SERIES-003-B',
                modality: 'CR',
                description: 'Rontgen Dada Samping',
                jumlahImage: 2,
            },
        ],
    },
]