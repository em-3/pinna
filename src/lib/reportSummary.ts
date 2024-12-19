import type { CategorySummary, ReportSummary, UserSummary } from "./types/ReportSummary";
import type { ReportData, UserReport, Worklog } from "./types/ReportData"
import { median, standardDeviationP } from "./utils";

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

    // Find the totals
    summary.seconds.total = seconds.reduce((total, current) => total + current, 0);
    summary.reviewed.total = reviewedPoints.reduce((total, current) => total + current, 0);
    summary.developed.total = developedPoints.reduce((total, current) => total + current, 0);

    // Calculate the standard deviations and medians
    summary.seconds.median = median(seconds);
    summary.reviewed.median = median(reviewedPoints);
    summary.developed.median = median(developedPoints);

    summary.seconds.standardDeviation = standardDeviationP(seconds);
    summary.reviewed.standardDeviation = standardDeviationP(reviewedPoints);
    summary.developed.standardDeviation = standardDeviationP(developedPoints);

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
        data: {
            reviewed: generateCategorySummary(user.data.reviewed),
            developed: generateCategorySummary(user.data.developed),
            changesRequested: generateCategorySummary(user.data.changesRequested),
            unassigned: generateCategorySummary(user.data.unassigned),
            inProgress: generateCategorySummary(user.data.inProgress)
        }
    };

    // Calculate the total seconds for this user by summing the seconds from each category
    userSummary.totalSeconds = Object.values(userSummary.data).reduce((total, current) => total + current.totalSeconds, 0);

    return userSummary;
}

/**
 * Generates a summary of a category report
 * @param category The category report to summarize
 * @returns The summarized report
 */
function generateCategorySummary(category: Worklog[]): CategorySummary {
    // Sum the seconds and points for each worklog
    return {
        totalSeconds: category.reduce((total, current) => total + current.seconds, 0),
        totalPoints: category.reduce((total, current) => total + current.storyPoints, 0)
    }
}

export { generateReportSummary };