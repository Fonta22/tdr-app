// YYYY-MM-DD

export function formatDate(date) {
    const dateArr = date.split('-');

    const year = dateArr[0];
    const month = dateArr[1];
    const day = dateArr[2];

    const formatted = `${day}/${month}/${year}`;
    return formatted;
}