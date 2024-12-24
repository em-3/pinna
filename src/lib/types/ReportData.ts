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
        reviewed: Worklog[],
        developed: Worklog[],
        changesRequested: Worklog[],
        unassigned: Worklog[],
        inProgress: Worklog[]
    }
}

interface Worklog {
    id: any,
    name: string,
    seconds: number,
    storyPoints: number
}

export type { ReportData, UserReport, Worklog };