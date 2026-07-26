export const getDateKey = (date: Date) => {
    const year = date.getFullYear();

    const month =
        date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1;

    const day =
        date.getDate() < 10
            ? "0" + date.getDate()
            : date.getDate();

    return `${year}-${month}-${day}`;
};

export const isSameDate = (a: Date, b: Date) => {
    return (
        a.getDate() === b.getDate() &&
        a.getMonth() === b.getMonth() &&
        a.getFullYear() === b.getFullYear()
    );
};