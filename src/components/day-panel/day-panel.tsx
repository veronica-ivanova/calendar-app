import type {Task} from "../../types/types.ts";
import {TaskList} from "../task-list/task-list.tsx";
import {TaskCreateForm} from "../task-create-form/task-create-form.tsx";
import {useState} from "react";
import styles from './day-panel.module.css'
import {CalendarDays} from "lucide-react";
type Props = {
    selectedDate: string;
    tasks: Task[];
    addTask: (task: Task) => void,
    removeTask: (id: string) => void;
    updateTask: (task: Task) => void;
    onComplete: (id: string) => void;
}

export const DayPanel = ({
    selectedDate,
    tasks,
    addTask,
    removeTask,
    updateTask,
    onComplete,
} : Props) => {
    const [isCreateTaskOpen, setIsCreateTaskOpen ] = useState(false);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <h2>{selectedDate}</h2>
                    <span className={styles.subtitle}>Сегодня</span>
                </div>
                <div className={styles.headerIcon}>
                    <CalendarDays size={28} />
                </div>
            </div>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h3>Задачи на день</h3>
                    {!isCreateTaskOpen &&
                        <button
                            className={styles.addButton}
                            onClick={() => setIsCreateTaskOpen(true)}
                        >
                            + Добавить задачу
                        </button>}
                </div>
                {isCreateTaskOpen && (
                    <TaskCreateForm
                        selectedDate={selectedDate}
                        addTask={addTask}
                        onClose={() => setIsCreateTaskOpen(false)}
                    />
                )}
                <TaskList
                    tasks={tasks}
                    onDelete={removeTask}
                    onEdit={updateTask}
                    onComplete={onComplete}
                />
            </section>
        </div>
    )
}