import styles from "../calendar/calendar.module.css";
import {getDateKey} from "../../utils/date.ts";
import {CalendarDay} from "../calendar-day/calendar-day.tsx";
import type {Task} from "../../types/types.ts";
import {useCalendar} from "../../hooks/useCalendar.ts";

type Props = {
    tasksByDate: Record<string, Task[]>;
    selectedDate: string;
    onSelectDate: (id: string) => void;
    onComplete: (id: string) => void;
};

export const CalendarGrid = ({tasksByDate, selectedDate, onSelectDate, onComplete}:Props) => {
    const {
        currentDay,
        month,
        year,
        days,
        emptyDays,
        weekDays,
        monthArray,
    } = useCalendar();

    return (
        <div>
            <h2>{monthArray[month]}</h2>
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
                                isCurrentDay={currentDay === i + 1}
                                tasks={tasksByDate[dateKey] || []}
                                isSelected={selectedDate === dateKey}
                                onComplete={onComplete}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}