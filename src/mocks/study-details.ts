import type { StudyDetail } from "../types/study-detail";


// Data ini hanya untuk kebutuhan tampilan fontend
export const mockStudyDetails: StudyDetail[] = [
    {
        studyInstanceUid: 'DEMO-STUDY-001',
        patientId: '1234',
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
]