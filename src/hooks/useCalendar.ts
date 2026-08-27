import {MONTHS, WEEK_DAYS} from "../constants/calendar.ts";
import {useMemo} from "react";

export const useCalendar = (viewDate: Date) => {
    const month = viewDate.getMonth(); //январь - 0, дек -11
    const year = viewDate.getFullYear();
    return useMemo(() => {
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 день след. месяца = последнему дню текущего

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 - вс , 6 - сб
        const normalizedFirstDay = (firstDayOfMonth + 6) % 7; // 0 - пн, 6 -вс

        // Понедельник первой отображаемой недели.
        const gridStartDate = new Date(
            year,
            month,
            1 - normalizedFirstDay
        );

        //Общее количество ячеек для полного заполнения недель (округление последней недели до полной)
        const calendarDaysCount =
            Math.ceil((normalizedFirstDay + daysInMonth) / 7) * 7;

        const calendarDays = Array.from(
            {length: calendarDaysCount},
            (_, i) => {
                const date = new Date(gridStartDate);
                date.setDate(gridStartDate.getDate() + i); //JS автоматически переходит между месяцами

                return {
                    date,
                    isCurrentMonth:
                    date.getMonth() === month &&
                    date.getFullYear() === year,
                }
            }
        )

        const weekDays = WEEK_DAYS;
        const monthArray = MONTHS;
        return {
            month,
            year,
            weekDays,
            monthArray,
            calendarDays
        };
    }, [year, month]);
}