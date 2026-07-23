import {TaskItem} from "../task-item/task-item.tsx";
import type {Task} from "../../types/types.ts";
import styles from './task-list.module.css';

type Props = {
    tasks: Task[];
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
    onComplete: (id: string) => void;
}

export const TaskList = ({ tasks, onDelete, onEdit, onComplete }: Props) => {
    if (tasks.length === 0) return null;

    return (
        <div className={styles.root}>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onComplete={onComplete}
                />
            ))}
        </div>
    );
}