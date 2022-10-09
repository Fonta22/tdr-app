/**
 * Returns the days of the specified month.
 * 
 * @param {number} month Month number
 * @param {number} year Year
 * @returns {number} The days of the specified month
 */
export function daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
}