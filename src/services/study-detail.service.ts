
/* ======================================= */
/* TITLE: Mengambil detail studi berdsarkan study Instance UID                               */
/* DESC: Nanti isifungsi ini dapat digantikan dengan request ke API backend        */

import { mockStudyDetails } from "../mocks/study-details";
import type { StudyDetail } from "../types/study-detail";

/* ======================================= */
export async function ambilDetailStudi(studyInstanceUid: string,): Promise<StudyDetail | null> {
    // mdncari studi berdsarkan identifier dari URL.
    const detailStudi = mockStudyDetails.find(
        (studi) => studi.studyInstanceUid === studyInstanceUid,
    )

    // karena fungsi async, hasil return otomatis menjadi promise.
    return detailStudi ?? null
}