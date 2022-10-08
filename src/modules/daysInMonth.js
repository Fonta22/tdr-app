/**
 * Returns the days of the specified month.
 * 
 * @param {number} month
 * @param {number} year
 * @returns {number} The days of the specified month
 */
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

console.log(daysInMonth(7, 2022))