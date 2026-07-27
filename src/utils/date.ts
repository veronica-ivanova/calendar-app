import {MONTH_NAMES, WEEK_DAY_FULLNAMES} from "../constants/calendar.ts";
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

export const formatDateKey = (dateKey: string) => {
    const [year, month, day] = dateKey.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return `${day} ${MONTH_NAMES[month - 1]}, ${WEEK_DAY_FULLNAMES[date.getDay()]}`;
};

export const isTodayDateKey = (dateKey: string) => {
    return dateKey === getDateKey(new Date());
};