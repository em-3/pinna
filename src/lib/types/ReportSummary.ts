interface ReportSummary {
    totalSeconds: number,
    reviewed: {
        total: number,
        median: number,
        standardDeviation: number
    },
    developed: {
        total: number,
        median: number,
        standardDeviation: number
    },
    users: UserSummary[]
}

interface UserSummary {
    id: any,
    totalSeconds: number,
    data: {
        reviewed: CategorySummary,
        developed: CategorySummary,
        changesRequested: CategorySummary,
        unassigned: CategorySummary,
        inProgress: CategorySummary
    }
}

interface CategorySummary {
    totalSeconds: number,
    totalPoints: number
}

export type {ReportSummary, UserSummary, CategorySummary};