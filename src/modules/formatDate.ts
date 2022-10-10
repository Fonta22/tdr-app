/**
 * Converts the date from YYYY-MM-DD to DD/MM/YYYY format.
 * 
 * @param {string} date Date in YYYY-MM-DD format
 * @returns {string} Date in DD/MM/YYYY format
 */
export function formatDate(date: string): string {
    const dateArr: string[] = date.split('-');

    const year: string = dateArr[0];
    // Number().toString() to delete first 0
    const month: string = Number(dateArr[1]).toString();
    const day: string = Number(dateArr[2]).toString();

    const formatted: string = `${day}/${month}/${year}`;
    return formatted;
}