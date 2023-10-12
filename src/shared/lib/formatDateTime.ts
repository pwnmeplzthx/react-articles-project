type dateType = 'date' | 'dateTime'

export function formatDateTime(value: string, dateFormat?: dateType) {
    if (!dateFormat) dateFormat = 'date';
    if (dateFormat === 'dateTime') {
        return new Date(value).toLocaleString();
    }

    const date = new Date(value);
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    let ddStr = '';
    let mmStr = '';

    if (dd < 10) ddStr = `0${dd}`;
    if (mm < 10) mmStr = `0${mm}`;

    return `${ddStr || dd}.${mmStr || mm}.${yyyy}`;
}
