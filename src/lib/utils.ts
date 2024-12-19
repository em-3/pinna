/**
 * Finds the median of the given data. This function assumes the array is sorted
 * @param data The set of numbers to find the median of
 * @returns The median of the data
 */
function median(data: number[]): number {
    if(data.length < 1) {
        throw Error("Array is empty");
    }

    // Find the halfway point of the array
    const middle = Math.floor(data.length / 2);

    // If the array is odd, then just return the midpoint
    if(data.length % 2) {
        return data[middle];
    }

    // Return the average of the two middle values
    return (data[middle] + data[middle + 1]) / 2
}

/**
 * Finds the population standard deviation of the given data.
 * @param data The set of numbers to find the standard deviation of
 * @returns The population standard deviation of the data
 */
function standardDeviationP(data: number[]): number {
    if(data.length < 1) {
        throw Error("Array is empty");
    }

    // Find the average of the data
    const sum = data.reduce((total, current) => total + current, 0);
    const average = sum / data.length;

    // Get the variance
    const variance = data
        .map((value) => Math.pow(value - average, 2))
        .reduce((total, current) => total + current, 0) / data.length;
    
    return Math.sqrt(variance);
}

export { median, standardDeviationP };