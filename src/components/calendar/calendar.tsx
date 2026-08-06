import styles from './calendar.module.css'
import type {Task, TaskVisibilityFilter} from "../../types/types.ts";
import { getDateKey} from "../../utils/date.ts";
import { useState } from "react";
import {DayPanel} from "../day-panel/day-panel.tsx";
import {CalendarGrid} from "../calendar-grid/calendar-grid.tsx";
import {CalendarHeader} from "../calendar-header/calendar-header.tsx";
import {useCalendar} from "../../hooks/useCalendar.ts";
import {useSelector} from "react-redux";
import {selectAllTasks} from "../../redux/entities/tasks/tasksSlice.ts";
import {FilterPanel} from "../filter-panel/filter-panel.tsx";

export const Calendar = () => {

    const today = new Date();

    const [viewDate, setViewDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    ); //1июля
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

    const [query, setQuery] = useState("");

    const calendar= useCalendar(viewDate);

    const [selectedDate, setSelectedDate] = useState<string>(getDateKey(today));
    const [visibility, setVisibility] = useState<TaskVisibilityFilter>("all");

    const tasks = useSelector(selectAllTasks)

    const visibleTasks = visibility === "public"
        ? tasks.filter((task) => task.visibility === "public")
        : tasks;

    const tasksByDate = visibleTasks.reduce<Record<string, Task[]>>((acc, task) => {
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
    const tasksInCurrentMonth = tasks.filter((task) => {
        const taskDate = new Date(task.date);

        return (
            taskDate.getFullYear() === viewDate.getFullYear() &&
            taskDate.getMonth() === viewDate.getMonth()
        );
    });

    const allCount = tasksInCurrentMonth.length;

    const publicCount = tasksInCurrentMonth.filter(
        (task) => task.visibility === "public",
    ).length;

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
                    <FilterPanel
                        query={query}
                        visibility={visibility}
                        allCount={allCount}
                        publicCount={publicCount}
                        onQueryChange={setQuery}
                        onVisibilityChange={setVisibility}
                    />
                    <CalendarGrid
                        calendar={calendar}
                        tasksByDate={tasksByDate}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />
                </div>
                <DayPanel
                    selectedDate={selectedDate}
                    tasks={selectedTasks}
                    isCreateTaskOpen={isCreateTaskOpen}
                    onOpenCreateTask={() => setIsCreateTaskOpen(true)}
                    onCloseCreateTask={() => setIsCreateTaskOpen(false)}
                />
            </div>
    )
}
