import { fetch } from "@tauri-apps/plugin-http";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import type { JiraAPISearchResponse } from "./types/Jira";
import type { IssueReport, UserReport, PinnaReport } from "./types/PinnaReport";
import type { PinnaUser } from "./types/PinnaUser";

/**
 * Generates a report from the given start and end dates.
 * @param jiraURL The URL of the Jira server
 * @param projectName The Jira project name for the report.
 * @param users A list of Pinna users to generate the report for.
 * @param startDate The start date for the report.
 * @param endDate The end date for the report.
 * @param storyPointsField The name of the Jira field that will be used for story points.
 * @param token A valid Jira API token, which will be used to authenticate requests. If not supplied, requests will be sent unauthenticated.
 * @returns The generated report
 */
async function createReport(jiraURL: URL | string, startDate: DateTime, endDate: DateTime, users: PinnaUser[], projectName: string, storyPointsField: string, token: string = ""): Promise<PinnaReport> {
    // Create the JQL string
    // This query locates all issues in the given project that had their worklogs modified by any of the given users during the given date range.
    const jql = `project = ${projectName} AND worklogDate >= "${startDate.toISODate()}" AND worklogDate <= "${endDate.toISODate()}" AND worklogAuthor IN (${users.map(user => `"${user.username}"`).join(", ")}) ORDER BY key ASC`;

    // Build the request body
    const jiraRequest = {
        jql,
        fields: [
            "key",
            "assignee",
            "summary",
            "worklog",
            "status",
            storyPointsField
        ]
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    if(token) {
        headers.append("Authorization", `Bearer ${token}`);
    }

    // Make the API call
    const response = await fetch(jiraURL + "rest/api/2/search", {
        method: "POST",
        body: JSON.stringify(jiraRequest),
        headers
    });

    if(response.status !== 200) {
        throw new Error(`Request failed: ${response.statusText} \n ${await response.text()}`);
    }

    const responseData: JiraAPISearchResponse = await response.json();

    // Process the response into a UserReport array
    const reports: UserReport[] = convertResponse(responseData, users, storyPointsField);

    // Build the full report
    const report: PinnaReport = {
        pinnaID: uuidv4(),
        createdDate: DateTime.now().toISODate(),
        startDate: startDate.toISODate() ?? DateTime.now().toISODate(),
        endDate: endDate.toISODate() ?? DateTime.now().toISODate(),
        userReports: reports
    };

    return report;
}

/**
 * Converts the given JiraAPISearchResponse into a list of UserReports, categorizing issues for each of the provided user names.
 * @param response The JiraAPISearchResponse to process. Must be complete.
 * @param userNames A case-insensitive list of user names that will be processed into UserReports.
 * @param storyPointsField The name of the Jira field that will be used for story points.
 */
function convertResponse(response: JiraAPISearchResponse, users: PinnaUser[], storyPointsField: string): UserReport[] {
    // Scaffold each user report
    let userReports: UserReport[] = [];

    for(const user of users) {
        let userReport: UserReport = {
            user,
            issues: {
                reviewed: [],
                developed: [],
                unassigned: []
            }
        }

        userReports.push(userReport);
    }

    // Loop through each user
    for(const report of userReports) {
        // For each user, check each issue
        for(const issue of response.issues) {
            let formattedIssue: IssueReport = {
                id: issue.key,
                name: issue.fields.summary,
                seconds: 0,
                storyPoints: issue.fields[storyPointsField] as number ?? 0
            };

            // Calculate the total number of seconds that the current user logged on the current issue
            formattedIssue.seconds = issue.fields.worklog.worklogs.filter((log) => report.user.username == log.author.name.toLowerCase()).reduce((total, log) => total + log.timeSpentSeconds, 0);

            // If the issue has an assignee, check if it is the current user
            // Otherwise, check if the issue seconds are greater than zero
            // If the user is the assignee, they must be credited regardless of time
            // Otherwise, the user should not be credited for the issue
            if(report.user.username == issue.fields.assignee?.name) {
                // If it is, then sort it into reviewed or developed based on the issue status
                // This grants the user credit for the story points of this issue
                if(issue.fields.status.name == "Done") {
                    report.issues.reviewed.push(formattedIssue);
                }else if(issue.fields.status.name == "Ready for Review" || issue.fields.status.name == "In Review") {
                    report.issues.developed.push(formattedIssue);
                }
            }else if(formattedIssue.seconds > 0) {
                // If the user contributed time to the issue but is not the assignee, then they receive time credit but not story points
                report.issues.unassigned.push(formattedIssue);
            }
        }
    }

    return userReports;
}

export { createReport };