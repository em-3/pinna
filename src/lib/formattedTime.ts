/**
 * Converts the given number of seconds into hours
 * @param seconds The value to format
 * @returns The number of hours (rounded down)
 */
function formatHours(seconds: number): number {
    return Math.floor(seconds / 60 / 60);
}

/**
 * Formats the given number of seconds into hour-minute format
 * @param seconds The value to format
 * @returns A string in the format `{hours}h {minutes}m`
 */
function formatHoursMinutes(seconds: number): string {
    let hours = Math.floor(seconds / 60 / 60);
    let minutes = Math.floor(seconds / 60 % 60);

    return `${hours}h ${minutes}m`;
}

export { formatHours, formatHoursMinutes };