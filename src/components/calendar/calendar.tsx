import { CalendarDay } from "../calenadar-day.tsx/calendar-day";
import styles from './calendar.module.css'
import {tasks} from "../../mock.ts";
import type {Task} from "../../types/types.ts";

export const Calendar = () => {
    const today = new Date();
    const currentDay = today.getDate();

    const month = today.getMonth(); //январь - 0, дек -11
    const year = today.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 день след. месяца = последнему дню текущего

    const days = Array.from({ length: daysInMonth })

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 - вс , 6 - сб
    const normalizedFirstDay = (firstDayOfMonth + 6) % 7; // 0 - пн, 6 -вс
    const emptyDays = Array.from({ length: normalizedFirstDay })
    const monthArray = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];
    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    const taskByDate = tasks.reduce<Record<string, Task[]>>((acc, task) => {
        const key = task.date.split("T")[0];

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(task);
        return acc;
    }, {})

    const getDateKey = (year: number, month: number, day: number) => {
        const m = month + 1 < 10 ? "0" + (month + 1) : month + 1;
        const d = day < 10 ? "0" + day : day;

        return `${year}-${m}-${d}`;
    };

    return (
        <div className={"container"}>
            <h2>{monthArray[month]}</h2>
            <div className={styles.weekDays}>
                {weekDays.map((weekDay) => (
                    <h3 key={weekDay}>{weekDay}</h3>
                ))}
            </div>
            <ul className={styles.root}>
                {emptyDays.map((_, i) => {
                    return (
                        <li key={`empty-day-${i}`}>
                            <CalendarDay/>
                        </li>
                    );
                })}
                {days.map((_, i) => {
                    const date = new Date(year, month, i + 1);
                    const dateKey = getDateKey(year, month, i + 1);
                    // const dateKey = date.toISOString().split("T")[0] 31/05 ->30/04
                    return (
                        <li key={`day-${i}`}>
                            <CalendarDay
                                date={date}
                                isCurrentDay={currentDay === i + 1}
                                tasks={taskByDate[dateKey || ""]}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}