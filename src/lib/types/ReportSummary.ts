interface ReportSummary {
    totalSeconds: number,
    totalReviewed: number,
    totalDeveloped: number,
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