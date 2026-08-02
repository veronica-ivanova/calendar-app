import styles from "./calendar-grid.module.css";
import {getDateKey} from "../../utils/date.ts";
import {CalendarDay} from "../calendar-day/calendar-day.tsx";
import type {Task} from "../../types/types.ts";
import {useCalendar} from "../../hooks/useCalendar.ts";

type Props = {
    tasksByDate: Record<string, Task[]>;
    selectedDate: string;
    onSelectDate: (id: string) => void;
    calendar: ReturnType<typeof useCalendar>;
};

export const CalendarGrid = ({calendar, tasksByDate, selectedDate, onSelectDate}:Props) => {
    const {
        days,
        emptyDays,
        weekDays,
        year,
        month
    } = calendar;
    return (
        <div className={styles.root}>
            <div className={styles.weekDays}>
                {weekDays.map((weekDay) => (
                    <h3 key={weekDay}>{weekDay}</h3>
                ))}
            </div>
            <ul className={styles.calendarDay}>
                {emptyDays.map((_, i) => {
                    return (
                        <li key={`empty-day-${i}`}
                            className={styles.emptyDay}>
                        </li>
                    );
                })}
                {days.map((_, i) => {
                    const date = new Date(year, month, i + 1);
                    const dateKey = getDateKey(date);
                    return (
                        <li key={`day-${i}`}>
                            <CalendarDay
                                onClick={() => onSelectDate(dateKey)}
                                date={date}
                                tasks={tasksByDate[dateKey] || []}
                                isSelected={selectedDate === dateKey}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}