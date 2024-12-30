import type { CategorySummary, ReportSummary, UserSummary } from "./types/ReportSummary";
import type { ReportData, UserReport, Issue } from "./types/ReportData"
import { median, standardDeviationP, roundPrecise } from "./utils";

/**
 * Generates a summary of a report
 * @param report The report to summarize
 * @returns The summarized report
 */
function generateReportSummary(report: ReportData): ReportSummary {
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
        users: []
    };

    // Add each user summary
    for(const user of report.users) {
        summary.users.push(generateUserSummary(user));
    }

    // Get the reviewed and developed values for all users and sort them for further operation
    let seconds = summary.users.map(value => value.totalSeconds).sort();
    let reviewedPoints = summary.users.map(value => value.data.reviewed.totalPoints).sort();
    let developedPoints = summary.users.map(value => value.data.developed.totalPoints).sort();
    let combinedPoints = summary.users.map(value => value.combinedPoints).sort();

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
 * @param user The user report to summarize
 * @returns The summarized report
 */
function generateUserSummary(user: UserReport): UserSummary {
    // Create a user summary, calculating the values from each category
    let userSummary: UserSummary = {
        id: user.id,
        totalSeconds: 0,
        combinedPoints: 0,
        data: {
            reviewed: generateCategorySummary(user.data.reviewed),
            developed: generateCategorySummary(user.data.developed),
            unassigned: generateCategorySummary(user.data.unassigned)
        }
    };

    // Calculate the total seconds for the user by summing the seconds from each category
    userSummary.totalSeconds = Object.values(userSummary.data).reduce((total, current) => total + current.totalSeconds, 0);

    // Calculate the combined points for the user by summing the reviewed and developed categories
    userSummary.combinedPoints = userSummary.data.reviewed.totalPoints + userSummary.data.developed.totalPoints;

    return userSummary;
}

/**
 * Generates a summary of a category report
 * @param category The category report to summarize
 * @returns The summarized report
 */
function generateCategorySummary(category: Issue[]): CategorySummary {
    // Sum the seconds and points for each issue
    return {
        totalSeconds: category.reduce((total, current) => total + current.seconds, 0),
        totalPoints: category.reduce((total, current) => total + current.storyPoints, 0)
    }
}

export { generateReportSummary };