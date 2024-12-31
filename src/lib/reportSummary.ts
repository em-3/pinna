import { type CategorySummary, type ReportSummary, type UserSummary } from "./types/ReportSummary";
import type { PinnaReport, UserReport, IssueReport } from "./types/PinnaReport"
import { median, standardDeviationP, roundPrecise } from "./utils";

/**
 * Generates a summary of a report
 * @param report The report to summarize
 * @returns The summarized report
 */
function generateReportSummary(report: PinnaReport): ReportSummary {
    // Create an empty summary
    let summary: ReportSummary = {
        seconds: {
            total: 0,
            median: 0,
            standardDeviation: 0
        },
        reviewed: {
            total: 0,
            median: 0,
            standardDeviation: 0
        },
        developed: {
            total: 0,
            median: 0,
            standardDeviation: 0
        },
        combined: {
            total: 0,
            median: 0,
            standardDeviation: 0
        },
        userSummaries: []
    };

    // Add each user summary
    for(const userReport of report.userReports) {
        summary.userSummaries.push(generateUserSummary(userReport));
    }

    // Get the reviewed and developed values for all users and sort them for further operation
    let seconds = summary.userSummaries.map(value => value.totalSeconds).sort();
    let reviewedPoints = summary.userSummaries.map(value => value.categories.reviewed.totalPoints).sort();
    let developedPoints = summary.userSummaries.map(value => value.categories.developed.totalPoints).sort();
    let combinedPoints = summary.userSummaries.map(value => value.combinedPoints).sort();

    // Find the totals
    summary.seconds.total = seconds.reduce((total, current) => total + current, 0);
    summary.reviewed.total = reviewedPoints.reduce((total, current) => total + current, 0);
    summary.developed.total = developedPoints.reduce((total, current) => total + current, 0);
    summary.combined.total = combinedPoints.reduce((total, current) => total + current, 0);

    // Calculate the standard deviations and medians
    summary.seconds.median = roundPrecise(median(seconds), 2);
    summary.reviewed.median = roundPrecise(median(reviewedPoints), 2);
    summary.developed.median = roundPrecise(median(developedPoints), 2);
    summary.combined.median = roundPrecise(median(combinedPoints), 2);

    summary.seconds.standardDeviation = roundPrecise(standardDeviationP(seconds), 2);
    summary.reviewed.standardDeviation = roundPrecise(standardDeviationP(reviewedPoints), 2);
    summary.developed.standardDeviation = roundPrecise(standardDeviationP(developedPoints), 2);
    summary.combined.standardDeviation = roundPrecise(standardDeviationP(combinedPoints), 2);

    return summary;
}

/**
 * Generates a summary of a user report
 * @param report The user report to summarize
 * @returns The summarized report
 */
function generateUserSummary(report: UserReport): UserSummary {
    // Create a user summary, calculating the values from each category
    let userSummary: UserSummary = {
        userID: report.user.id,
        totalSeconds: 0,
        combinedPoints: 0,
        categories: {
            reviewed: generateCategorySummary(report.issues.reviewed),
            developed: generateCategorySummary(report.issues.developed),
            unassigned: generateCategorySummary(report.issues.unassigned)
        }
    };

    // Calculate the total seconds for the user by summing the seconds from each category
    userSummary.totalSeconds = Object.values(userSummary.categories).reduce((total, current) => total + current.totalSeconds, 0);

    // Calculate the combined points for the user by summing the reviewed and developed categories
    userSummary.combinedPoints = userSummary.categories.reviewed.totalPoints + userSummary.categories.developed.totalPoints;

    return userSummary;
}

/**
 * Generates a summary of a category report
 * @param category The category report to summarize
 * @returns The summarized report
 */
function generateCategorySummary(category: IssueReport[]): CategorySummary {
    // Sum the seconds and points for each IssueReport
    return {
        totalSeconds: category.reduce((total, current) => total + current.seconds, 0),
        totalPoints: category.reduce((total, current) => total + current.storyPoints, 0)
    }
}

export { generateReportSummary };