/**
 * Converts the date from YYYY-MM-DD to DD/MM/YYYY format.
 * 
 * @param {string} date Date in YYYY-MM-DD format
 * @returns {string} Date in DD/MM/YYYY format
 */
export function formatDate(date: string): string {
    const dateArr: string[] = date.split('-');

    const year: string = dateArr[0];
    const month: string = dateArr[1];
    const day: string = dateArr[2];

    const formatted: string = `${day}/${month}/${year}`;
    return formatted;
}