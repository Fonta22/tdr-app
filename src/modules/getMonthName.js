export const monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

export function getMonthName(i) {
    return monthNames[i - 1];
}