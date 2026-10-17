import type { StudySummary } from '../types/study'

// data dummy pasien
export const mockStudies: StudySummary[] = [
    {
        studyInstanceUid: 'DEMO-STUDY-001',
        patientId: 'DEMO-PATIENT-001',
        patientName: 'Tn. Bambang',
        modality: 'CT',
        studyDate: '2026-10-12',
        studyDescription: 'Ujicoba Chest Examination',
        status: 'baru',
    },
    {
        studyInstanceUid: 'DEMO-STUDY-002',
        patientId: 'DEMO-PATIENT-002',
        patientName: 'Ny. Sumarni',
        modality: 'MR',
        studyDate: '2026-10-11',
        studyDescription: 'Ujicoba Otak Examination',
        status: 'proses-review',
    },
    {
        studyInstanceUid: 'DEMO-STUDY-003',
        patientId: 'DEMO-PATIENT-003',
        patientName: 'Tn. Oscar Delahoya',
        modality: 'CR',
        studyDate: '2026-10-10',
        studyDescription: 'Ujicoba Chest X-Ray',
        status: 'selesai',
    },
]