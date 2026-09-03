import type {TaskVisibilityFilter} from "../../types/types.ts";
import {TaskList} from "../task-list/task-list.tsx";
import {TaskCreateForm} from "../task-create-form/task-create-form.tsx";
import styles from './day-panel.module.css'
import {CalendarDays} from "lucide-react";
import {formatDateKey, isTodayDateKey} from "../../utils/date.ts";
import {useGetTasksQuery} from "../../redux/services/api.ts";

type Props = {
    selectedDate: string;
    visibility: TaskVisibilityFilter;
    isCreateTaskOpen: boolean;
    onOpenCreateTask: () => void;
    onCloseCreateTask: () => void;
}

export const DayPanel = ({
                             selectedDate,
                             visibility,
                             isCreateTaskOpen,
                             onOpenCreateTask,
                             onCloseCreateTask,
                         }: Props) => {

    const {currentData, isFetching, isError,} = useGetTasksQuery({
        dateFrom: selectedDate,
        dateTo: selectedDate,
        visibility,
    })

    const tasks = [...(currentData?.tasks ?? [])].sort(
        (a, b) => a.date.localeCompare(b.date)
    );

    const formattedDate = formatDateKey(selectedDate);
    const isToday = isTodayDateKey(selectedDate);

    const sectionTitle = isFetching
        ? 'Загрузка задач...'
        : isError
            ? 'Не удалось получить задачи'
            : tasks.length > 0
                ? 'Задачи на день'
                : 'Задач нет';

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h2>{formattedDate}</h2>

                    {isToday && (
                        <span className={styles.subtitle}>
                            Сегодня
                        </span>
                    )}
                </div>
                <div className={styles.headerIcon}>
                    <CalendarDays size={28}/>
                </div>
            </div>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h3>
                        {sectionTitle}
                    </h3>
                    {!isCreateTaskOpen &&
                        <button
                            className={styles.addButton}
                            onClick={onOpenCreateTask}
                        >
                            + Добавить задачу
                        </button>
                    }
                </div>
                {isCreateTaskOpen && (
                    <TaskCreateForm
                        selectedDate={selectedDate}
                        onClose={onCloseCreateTask}
                    />
                )}

                {!isFetching && !isError && (
                    <TaskList
                        tasks={tasks}
                    />
                )}
            </section>
        </div>
    )
}
