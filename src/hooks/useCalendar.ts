import {MONTHS, WEEK_DAYS} from "../constants/calendar.ts";

export const useCalendar = () => {
    const today = new Date();
    const currentDay = today.getDate(); //число
    const month = today.getMonth(); //январь - 0, дек -11
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 день след. месяца = последнему дню текущего

    const days = Array.from({ length: daysInMonth })
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 - вс , 6 - сб
    const normalizedFirstDay = (firstDayOfMonth + 6) % 7; // 0 - пн, 6 -вс
    const emptyDays = Array.from({ length: normalizedFirstDay })
    const weekDays = WEEK_DAYS;
    const monthArray = MONTHS;
    return {
        today,
        month,
        year,
        weekDays,
        monthArray,
        emptyDays,
        days,
        currentDay,
    };
}