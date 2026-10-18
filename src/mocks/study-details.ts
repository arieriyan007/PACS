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

        // Bacaan dokter (dummy)
        hasilBacaan: null,

        series: [
            {
                seriesInstanceUid: 'DEMO-SERIES-001-A',
                modality: 'CT',
                description: 'Axial Chest',
                jumlahImage: 120,
                gambarPratinjau: '/images/radiologi/ct-dada-aksial.jpg',
            },
            {
                seriesInstanceUid: 'DEMO-SERIES-001-B',
                modality: 'CT',
                description: 'Coronal Reconstruction',
                jumlahImage: 45,
                gambarPratinjau: '/images/radiologi/ct-dada-koronal.jpg',
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
        hasilBacaan: {
            namaDokter: 'dr. dummy Radiologi',
            tanggalBacaan: '2026-10-11',
            status: 'draf',
            temuan: 'Contoh temuan untuk simulasi tampilan.',
            kesan: 'Bacaan contoh masih berstatus draf.',
        },

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
        hasilBacaan:{
            namaDokter: 'dr. dummy Radiologi',
            tanggalBacaan: '2026-10-10',
            status: 'final',
            temuan: 'Contoh temuan final utnuk simulasi tampilan.',
            kesan: 'Bacaan final contoh; bukan hasil klinis.',
        },

        series: [
            {
                seriesInstanceUid: 'DEMO-SERIES-003-A',
                modality: 'CR',
                description: 'Rongent Dada Depan',
                jumlahImage: 2,
                gambarPratinjau: '/images/radiologi/rongent-dada-depan.jpg',
            },
            {
                seriesInstanceUid: 'DEMO-SERIES-003-B',
                modality: 'CR',
                description: 'Rontgen Dada Samping',
                jumlahImage: 2,
                gambarPratinjau: '/images/radiologi/rongent-dada-samping.jpg',
            },
        ],
    },
]