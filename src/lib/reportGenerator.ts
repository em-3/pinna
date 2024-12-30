import { fetch } from "@tauri-apps/plugin-http";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "luxon";
import type { JiraAPISearchResponse } from "./types/Jira";
import type { Issue, UserReport, ReportData } from "./types/ReportData";

/**
 * Generates a report from the given start and end dates.
 * @param jiraURL The URL of the Jira server
 * @param projectName The Jira project name for the report.
 * @param userNames A case-insensitive list of Jira user names to generate the report for.
 * @param startDate The start date for the report.
 * @param endDate The end date for the report.
 * @param storyPointsField The name of the Jira field that will be used for story points.
 * @param token A valid Jira API token, which will be used to authenticate requests. If not supplied, requests will be sent unauthenticated.
 * @returns The generated report
 */
async function createReport(jiraURL: URL | string, startDate: DateTime, endDate: DateTime, userNames: string[], projectName: string, storyPointsField: string, token: string = ""): Promise<ReportData> {
    // Create the JQL string
    // This query locates all issues in the given project that had their worklogs modified by any of the given users during the given date range.
    const jql = `project = ${projectName} AND worklogDate >= "${startDate.toISODate()}" AND worklogDate <= "${endDate.toISODate()}" AND worklogAuthor IN (${userNames.map(userName => `"${userName}"`).join(", ")}) ORDER BY key ASC`;

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

    const response = await fetch(jiraURL + "rest/api/2/search", {
        method: "POST",
        body: JSON.stringify(jiraRequest),
        headers
    });

    if(response.status !== 200) {
        throw new Error(`Request failed: ${response.statusText} \n ${await response.text()}`);
    }

    // Make the API call
    const responseData: JiraAPISearchResponse = await response.json();

    // Process the response into a UserReport array
    const reports: UserReport[] = convertResponse(responseData, userNames, storyPointsField);

    // Build the full report
    const report: ReportData = {
        pinnaID: uuidv4(),
        start: startDate.toISO(),
        end: endDate.toISO(),
        users: reports
    };

    return report;
}

/**
 * Converts the given JiraAPISearchResponse into a list of UserReports, categorizing issues for each of the provided user names.
 * @param response The JiraAPISearchResponse to process. Must be complete.
 * @param userNames A case-insensitive list of user names that will be processed into UserReports.
 * @param storyPointsField The name of the Jira field that will be used for story points.
 */
function convertResponse(response: JiraAPISearchResponse, userNames: string[], storyPointsField: string): UserReport[] {
    // Scaffold each user
    let users: UserReport[] = [];

    for(const userName of userNames) {
        let user: UserReport = {
            id: userName.toLowerCase(),
            // TODO: Replace with provided display name after configuration refactor
            name: userName,
            data: {
                reviewed: [],
                developed: [],
                unassigned: []
            }
        }

        users.push(user);
    }

    // Loop through each user
    for(const user of users) {
        // For each user, check each issue
        for(const issue of response.issues) {
            let formattedIssue: Issue = {
                id: issue.key,
                name: issue.fields.summary,
                seconds: 0,
                storyPoints: issue.fields[storyPointsField] as number ?? 0
            };

            // Calculate the total number of seconds that the current user logged on the current issue
            formattedIssue.seconds = issue.fields.worklog.worklogs.filter((log) => user.id == log.author.name.toLowerCase()).reduce((total, log) => total + log.timeSpentSeconds, 0);

            // If the issue has an assignee, check if it is the current user
            // Otherwise, check if the issue seconds are greater than zero
            // If the user is the assignee, they must be credited regardless of time
            // Otherwise, the user should not be credited for the issue
            if(user.id == issue.fields.assignee?.name) {
                // If it is, then sort it into reviewed or developed based on the issue status
                // This grants the user credit for the story points of this issue
                if(issue.fields.status.name == "Done") {
                    user.data.reviewed.push(formattedIssue);
                }else if(issue.fields.status.name == "Ready for Review" || issue.fields.status.name == "In Review") {
                    user.data.developed.push(formattedIssue);
                }
            }else if(formattedIssue.seconds > 0) {
                // If the user contributed time to the issue but is not the assignee, then they receive time credit but not story points
                user.data.unassigned.push(formattedIssue);
            }
        }
    }

    return users;
}

export { createReport };