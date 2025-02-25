interface JiraAPISearchResponse {
    startAt: number;
    maxResults: number;
    total: number;
    issues: JiraIssue[];

    [index: string]: unknown;
}

interface JiraUser {
    name: string;
    displayName: string;
    key: string;
    avatarUrls: {};

    [index: string]: unknown;
}

interface JiraIssue {
    key: string;
    fields: JiraFields;

    [index: string]: unknown;
}

interface JiraFields {
    summary: string;
    worklog: {
        worklogs: JiraWorklog[]
    };
    assignee?: JiraUser;
    status: JiraStatus;

    [index: string]: unknown;
}

interface JiraWorklog {
    author: JiraUser;
    timeSpentSeconds: number;
    created: string;
    updated: string;

    [index: string]: unknown;
}

interface JiraStatus {
    name: string;

    [index: string]: unknown;
}

export type { JiraAPISearchResponse, JiraUser, JiraIssue, JiraFields, JiraWorklog, JiraStatus };