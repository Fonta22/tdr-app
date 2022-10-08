/**
 * Converts the date from YYYY-MM-DD to DD/MM/YYYY format.
 * 
 * @param {string} date Date in YYYY-MM-DD format
 * @returns {string} Date in DD/MM/YYYY format
 */
export function formatDate(date) {
    const dateArr = date.split('-');

    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];

    const formatted = `${day}/${month}/${year}`;
    return formatted;
}