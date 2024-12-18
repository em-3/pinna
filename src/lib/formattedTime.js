/**
 * Formats the given number of seconds into hour-minute format
 * @param {number} seconds 
 * @returns A string in the format `{hours}h {minutes}m`
 */
function formatSeconds(seconds) {
    let hours = Math.floor(seconds / 60 / 60);
    let minutes = Math.floor(seconds / 60 % 60);

    return `${hours}h ${minutes}m`;
}

export { formatSeconds };