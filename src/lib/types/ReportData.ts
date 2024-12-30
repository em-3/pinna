interface ReportData {
    pinnaID: string,
    start: string,
    end: string,
    users: UserReport[]
}

interface UserReport {
    id: any,
    name: string,
    data: {
        reviewed: Issue[],
        developed: Issue[],
        unassigned: Issue[],
    }
}

interface Issue {
    id: any,
    name: string,
    seconds: number,
    storyPoints: number
}

export type { ReportData, UserReport, Issue };