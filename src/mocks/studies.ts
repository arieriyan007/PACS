import type { StudySummary } from '../types/study'

export const mockStudies: StudySummary[] = [
    {
        studyInstanceUid: 'Tn. Bambang',
        patientId: '1234',
        patientName: 'Tn. Bambang',
        modality: 'CT',
        studyDate: '2026-10-12',
        studyDescription: 'Ujicoba Chest Examination',
        status: 'baru',
    },
    {
        studyInstanceUid: 'Ny. Sumarni',
        patientId: '1235',
        patientName: 'Ny. Sumarni',
        modality: 'MR',
        studyDate: '2026-10-11',
        studyDescription: 'Ujicoba Otak Examination',
        status: 'proses-review',
    },
    {
        studyInstanceUid: 'Tn. Oscar Delahoya',
        patientId: '1236',
        patientName: 'Tn. Oscar Delahoya',
        modality: 'CR',
        studyDate: '2026-10-10',
        studyDescription: 'Ujicoba Chest X-Ray',
        status: 'selesai',
    },
]