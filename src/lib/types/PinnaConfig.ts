import type { PinnaUser } from "./PinnaUser";

/**
 * Represents the configuration for Pinna.
 */
interface PinnaConfig {
    /**
     * Configuration options that control how Pinna interacts with Jira.
     */
    jiraConfig: JiraConfig;
}

/**
 * Configuration options that control how Pinna interacts with Jira.
 */
interface JiraConfig {
    /**
     * The fully-formed URL that Pinna will attempt to access Jira at.
     */
    url: string;

    /**
     * A valid Bearer token that Pinna will use in its API requests to Jira.
     */
    token: string;

    /**
     * The project name that Pinna will generate reports from.
     */
    projectName: string;

    /**
     * The name of the custom field that Pinna will use to gather story point information.
     */
    storyPointsField: string;

    /**
     * The list of users that Pinna will use when generating reports.
     */
    selectedUsers: PinnaUser[];
}

export const defaultConfig: PinnaConfig = {
    jiraConfig: {
        url: "",
        token: "",
        projectName: "",
        storyPointsField: "",
        selectedUsers: []
    }
}

export type { PinnaConfig, JiraConfig };