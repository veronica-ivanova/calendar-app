import styles from './calendar.module.css'
import type {Task} from "../../types/types.ts";
import { getDateKey} from "../../utils/date.ts";
import { useState } from "react";
import {DayPanel} from "../day-panel/day-panel.tsx";
import {CalendarGrid} from "../calendar-grid/calendar-grid.tsx";
import {useTasks} from "../../hooks/useTasks.ts";
import {CalendarHeader} from "../calendar-header/calendar-header.tsx";

export const Calendar = () => {

    const {
        tasks,
        addTask,
        removeTask,
        updateTask,
        toggleCompleteTask,
    } = useTasks();

    const today = new Date();
    const [selectedDate, setSelectedDate] = useState<string>(getDateKey(today));

    const tasksByDate = tasks.reduce<Record<string, Task[]>>((acc, task) => {
        const key = task.date.split("T")[0];

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(task);
        return acc;
    }, {})

    const selectedTasks = [...(tasksByDate[selectedDate] || [])].sort(
        (a, b) => a.date.localeCompare(b.date)
    );

    return (
            <div className={styles.root}>
                <div className={styles.calendarContainer}>
                    <CalendarHeader/>
                    <CalendarGrid
                        tasksByDate={tasksByDate}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                        onComplete={toggleCompleteTask}
                    />
                </div>
                <DayPanel
                    selectedDate={selectedDate}
                    tasks={selectedTasks}
                    removeTask={removeTask}
                    addTask={addTask}
                    updateTask={updateTask}
                    onComplete={toggleCompleteTask}
                />
            </div>
    )
}
