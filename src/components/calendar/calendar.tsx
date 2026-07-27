import styles from './calendar.module.css'
import type {Task} from "../../types/types.ts";
import { getDateKey} from "../../utils/date.ts";
import { useState } from "react";
import {DayPanel} from "../day-panel/day-panel.tsx";
import {CalendarGrid} from "../calendar-grid/calendar-grid.tsx";
import {useTasks} from "../../hooks/useTasks.ts";
import {CalendarHeader} from "../calendar-header/calendar-header.tsx";
import {useCalendar} from "../../hooks/useCalendar.ts";

export const Calendar = () => {

    const {
        tasks,
        addTask,
        removeTask,
        updateTask,
        toggleCompleteTask,
    } = useTasks();

    const today = new Date();

    const [viewDate, setViewDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    ); //1июля
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

    const calendar= useCalendar(viewDate);

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

    const nextMonth = () => {
        setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }
    const prevMonth = () => {
        setViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));

    }
    const onToday = () => {
        setViewDate(today);
        setSelectedDate(getDateKey(today))
    }
    return (
            <div className={styles.root}>
                <div className={styles.calendarContainer}>
                    <CalendarHeader
                        monthName={calendar.monthArray[calendar.month]}
                        year={calendar.year}
                        onNextMonth={nextMonth}
                        onPrevMonth={prevMonth}
                        onToday={onToday}
                        onAddTask={() => setIsCreateTaskOpen(true)}
                    />
                    <CalendarGrid
                        calendar={calendar}
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
                    isCreateTaskOpen={isCreateTaskOpen}
                    onOpenCreateTask={() => setIsCreateTaskOpen(true)}
                    onCloseCreateTask={() => setIsCreateTaskOpen(false)}
                />
            </div>
    )
}
