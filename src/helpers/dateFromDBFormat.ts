export const dateFromDBFormat = (date: string) => {
    const dateFormat = new Date(date);
    dateFormat.setMinutes(dateFormat.getMinutes() - dateFormat.getTimezoneOffset());
    return dateFormat.toISOString().slice(0, 16);
}