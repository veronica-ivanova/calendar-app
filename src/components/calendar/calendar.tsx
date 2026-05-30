import { CalendarDay } from "../calenadar-day.tsx/calendar-day";
import styles from './calendar.module.css'
import type {Task} from "../../types/types.ts";
import { getDateKey} from "../../utils/date.ts";
import { useState } from "react";
import {DayPanel} from "../day-panel/day-panel.tsx";

type Props = {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const Calendar = ({tasks, setTasks} : Props) => {

    const addTask = (task: Task) => {
        setTasks(prev => [...prev, task]);
    };

    const removeTask = (taskId: string) => {
        setTasks(prev =>
            prev.filter(task => task.id !== taskId)
        );
    };

    const today = new Date();
    const currentDay = today.getDate(); //число

    const [selectedDate, setSelectedDate] = useState<string>(getDateKey(today));
    const [isCreateTaskOpen, setIsCreateTaskOpen ] = useState(false);


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

    const selectedTasks = taskByDate[selectedDate] || [];

    return (
        <div className={styles.root}>
            <div className={"container"}>
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
                                    onClick={() => setSelectedDate(dateKey)}
                                    date={date}
                                    isCurrentDay={currentDay === i + 1}
                                    tasks={taskByDate[dateKey] || []}
                                    removeTask={removeTask}
                                    isSelected={selectedDate === dateKey}
                                    onAddTask={() => setIsCreateTaskOpen(true)}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <DayPanel
                selectedDate={selectedDate}
                tasks={selectedTasks}
                removeTask={removeTask}
                addTask={addTask}
                isCreateTaskOpen={isCreateTaskOpen}
                onAddTask={() => setIsCreateTaskOpen(true)}
                onClose={() => setIsCreateTaskOpen(false)}
            />
        </div>
    )
}