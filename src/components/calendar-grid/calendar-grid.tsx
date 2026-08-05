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
        weekDays,
        calendarDays
    } = calendar;
    return (
        <div className={styles.root}>
            <div className={styles.weekDays}>
                {weekDays.map((weekDay) => (
                    <h3 key={weekDay}>{weekDay}</h3>
                ))}
            </div>
            <ul className={styles.calendarDay}>
                {calendarDays.map(({date, isCurrentMonth }) => {
                    const dateKey = getDateKey(date);

                    return (
                        <li key={dateKey}>
                            <CalendarDay
                                date={date}
                                tasks={tasksByDate[dateKey] || []}
                                isSelected={selectedDate === dateKey}
                                isOutsideMonth={!isCurrentMonth}
                                onClick={() => onSelectDate(dateKey)}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}