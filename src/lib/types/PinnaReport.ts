import type { PinnaUser } from "./PinnaUser";

/**
 * Represents a complete, Pinna-compatible report.
 */
interface PinnaReport {
    /**
     * The Universally Unique Identifier (UUID) for the report. This value is used by Pinna to determine if a JSON object is a valid report.
     */
    pinnaID: string;

    /**
     * The start time for the report's period in ISO 8601 format.
     */
    startDate: string;

    /**
     * The end time for the report's period in ISO 8601 format.
     */
    endDate: string;

    /**
     * A list of reports for each user.
     */
    userReports: UserReport[];
}

/**
 * An individual report for a user.
 */
interface UserReport {
    /**
     * The user the report represents.
     */
    user: PinnaUser;

    /**
     * Issues that the user is assigned to or has contributed time to.
     */
    issues: {
        /**
         * Issues that the user has reviewed.
         */
        reviewed: IssueReport[];
        
        /**
         * Issues that the user has developed.
         */
        developed: IssueReport[];

        /**
         * Issues that the user has contributed time to, but was not the assignee of.
         */
        unassigned: IssueReport[];
    }
}

/**
 * An individual issue that was handled by a user.
 */
interface IssueReport {
    /**
     * The Jira ID for the issue.
     */
    id: any;

    /**
     * The issue's name.
     */
    name: string;

    /**
     * The total number of seconds that were contributed to the issue.
     */
    seconds: number;

    /**
     * The number of story points the issue is worth.
     */
    storyPoints: number;
}

export type { PinnaReport, UserReport, IssueReport };