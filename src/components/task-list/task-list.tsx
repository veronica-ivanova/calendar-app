import {TaskItem} from "../task-item/task-item.tsx";
import type {Task} from "../../types/types.ts";
import styles from './task-list.module.css';

type Props = {
    tasks: Task[];
}

export const TaskList = ({ tasks }: Props) => {
    if (tasks.length === 0) return null;

    return (
        <div className={styles.root}>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
}