/**
 * Represents an error to be used in the ErrorQueue.
 */
interface ErrorData {
    /**
     * A unique ID representing the error. Used to control ordering in the ErrorQueue.
     */
    id: number;

    /**
     * An optional title for the error.
     */
    errorTitle: string | null;

    /**
     * The error message.
     */
    errorMessage: string;
}

export type { ErrorData };