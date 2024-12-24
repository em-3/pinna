import type { ErrorData } from "./types/ErrorData";

const errorQueue: ErrorData[] = $state([]);

/**
 * Adds an error message to the queue, which will be displayed by the ErrorStack component
 * @param errorMessage The message to display.
 * @param displayTime How long, in milliseconds, the message should be displayed for. By default, this is 5000 (5 seconds)
 */
function showErrorMessage(errorMessage: string, displayTime: number = 5000) {
    // Add the message to the queue
    errorQueue.push({
        id: Math.floor(Math.random() * 10000),
        errorMessage
    });

    // Set a timed task to remove it
    setTimeout(() => {
        errorQueue.shift();
    }, displayTime);
}

export { errorQueue, showErrorMessage };