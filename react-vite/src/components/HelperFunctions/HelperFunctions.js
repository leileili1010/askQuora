export function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const yearDifference = date.getFullYear() - now.getFullYear();

    if (yearDifference === 0) {
        return `${day} ${month}`;
    } else {
        return `${yearDifference}y`;
    }
}