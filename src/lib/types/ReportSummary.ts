interface ReportSummary {
    seconds: ReportMetric;

    reviewed: ReportMetric;

    developed: ReportMetric;

    combined: ReportMetric;

    userSummaries: UserSummary[];
}

/**
 * Represents a generic metric.
 */
interface ReportMetric {
    /**
     * The total for the metric.
     */
    total: number;

    /**
     * The median for the metric.
     */
    median: number;

    /**
     * The standard deviation for the metric.
     */
    standardDeviation: number;
}

export const defaultReportMetric: ReportMetric = {
    total: 0,
    median: 0,
    standardDeviation: 0
};

interface UserSummary {
    userID: number;

    totalSeconds: number;

    combinedPoints: number;

    categories: {

        reviewed: CategorySummary;

        developed: CategorySummary;

        unassigned: CategorySummary;
    };
}

interface CategorySummary {

    totalSeconds: number;

    totalPoints: number;
}

export type {ReportSummary, UserSummary, CategorySummary};