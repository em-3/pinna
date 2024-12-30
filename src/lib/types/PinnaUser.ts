/**
 * Represents a user in Pinna.
 */
interface PinnaUser {
    /**
     * The user's unique Jira ID.
     */
    id: string;

    /**
     * The user's username in lowercase.
     */
    username: string;

    /**
     * The user's display name as retrieved from the Jira API.
     */
    displayName: string;

    /**
     * An optional nickname for the user.
     */
    nickname: string | null;
}

export type { PinnaUser };