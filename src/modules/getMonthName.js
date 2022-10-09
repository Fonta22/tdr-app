/**
 * Array with all the names of the 12 months.
 */
export const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

/**
 * Returns the name of the month from the given number of the month.
 * 
 * @param {number} i Number of the month
 * @returns {string} Name of the month
 */
export function getMonthName(i) {
    return monthNames[i - 1];
}