import type {Task} from "../../types/types.ts";
import {TaskList} from "../task-list/task-list.tsx";
import {TaskCreateForm} from "../task-create-form/task-create-form.tsx";
import styles from './day-panel.module.css'
import {CalendarDays} from "lucide-react";
import {formatDateKey, isTodayDateKey} from "../../utils/date.ts";

type Props = {
    selectedDate: string;
    tasks: Task[];
    isCreateTaskOpen: boolean;
    onOpenCreateTask: () => void;
    onCloseCreateTask: () => void;
}

export const DayPanel = ({
                             selectedDate,
                             tasks,
                             isCreateTaskOpen,
                             onOpenCreateTask,
                             onCloseCreateTask,
                         }: Props) => {

    const formattedDate = formatDateKey(selectedDate);
    const isToday = isTodayDateKey(selectedDate);

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
                        {tasks.length > 0 ? 'Задачи на день' : 'Задач нет'}
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

                <TaskList
                    tasks={tasks}
                />
            </section>
        </div>
    )
}