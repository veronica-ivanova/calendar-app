import styles from './calendar.module.css'
import type {Task, TaskVisibilityFilter} from "../../types/types.ts";
import { getDateKey} from "../../utils/date.ts";
import { useState } from "react";
import {DayPanel} from "../../components/day-panel/day-panel.tsx";
import {CalendarGrid} from "../../components/calendar-grid/calendar-grid.tsx";
import {CalendarHeader} from "../../components/calendar-header/calendar-header.tsx";
import {useCalendar} from "../../hooks/useCalendar.ts";
import {FilterPanel} from "../../components/filter-panel/filter-panel.tsx";
import {useGetTasksQuery} from "../../redux/services/api.ts";
import {groupTasksByDate} from "../../utils/group-tasks-by-date.ts";
import {ErrorMessage} from "../../components/error-message/error-message.tsx";

export const Calendar = () => {

    const today = new Date();

    const [viewDate, setViewDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    ); //1число
    const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

    const calendar= useCalendar(viewDate);

    const [selectedDate, setSelectedDate] = useState<string>(getDateKey(today));
    const [visibility, setVisibility] = useState<TaskVisibilityFilter>("ALL");

    const firstVisibleDate = getDateKey(
        calendar.calendarDays[0].date,
    );

    const lastVisibleDate = getDateKey(
        calendar.calendarDays[calendar.calendarDays.length - 1].date,
    );

    const {
        data,
        isLoading,
        isError
    } = useGetTasksQuery( {
            dateFrom: firstVisibleDate,
            dateTo: lastVisibleDate,
            visibility,
    });
    const tasks = data?.tasks ?? []
    const allCount = data?.states.allCount ?? 0;
    const publicCount = data?.states.publicCount ?? 0;

    if (isLoading) {
        return <div>Загрузка задач...</div>;
    }

    const tasksByDate = groupTasksByDate(tasks);

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
    const handleSelectSearchTask = (task: Task) => {
        const taskDate = new Date(task.date);
        setViewDate(taskDate);
        setSelectedDate(getDateKey(taskDate));
        setVisibility("ALL")
    };

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
                        visibility={visibility}
                        allCount={allCount}
                        publicCount={publicCount}
                        onVisibilityChange={setVisibility}
                        onSelectSearchTask={handleSelectSearchTask}
                    />

                    {isError && (
                        <ErrorMessage>
                            Не удалось загрузить задачи. Попробуйте позже.
                        </ErrorMessage>
                    )}

                    <CalendarGrid
                        calendar={calendar}
                        tasksByDate={tasksByDate}
                        selectedDate={selectedDate}
                        onSelectDate={setSelectedDate}
                    />
                </div>
                <DayPanel
                    selectedDate={selectedDate}
                    visibility={visibility}
                    isCreateTaskOpen={isCreateTaskOpen}
                    onOpenCreateTask={() => setIsCreateTaskOpen(true)}
                    onCloseCreateTask={() => setIsCreateTaskOpen(false)}
                />
            </div>
    )
}
