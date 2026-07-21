import type {Task} from "../../types/types.ts";
import {TaskList} from "../task-list/task-list.tsx";
import {TaskCreateForm} from "../task-create-form/task-create-form.tsx";
import {useState} from "react";
import styles from './day-panel.module.css'
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
            <h2>{selectedDate}</h2>

            {!isCreateTaskOpen &&
                <button onClick={() => setIsCreateTaskOpen(true)}>
                    + Add Task
                </button>}

            {isCreateTaskOpen &&
                <TaskCreateForm
                    selectedDate={selectedDate}
                    addTask={addTask}
                    onClose={() => setIsCreateTaskOpen(false)}
                />
            }
            <TaskList
                tasks={tasks}
                onDelete={removeTask}
                onEdit={updateTask}
                onComplete={onComplete}
            />
        </div>
    )
}