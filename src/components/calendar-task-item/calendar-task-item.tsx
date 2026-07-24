import type {Task} from "../../types/types.ts";
import styles from './calendar-task-item.module.css'
import classNames from "classnames";
import {TaskCheckBox} from "../task-checkbox/task-checkbox.tsx";
type Props = {
    task: Task;
    onComplete: (id: string) => void;
};

export const CalendarTaskItem = ({ task, onComplete }: Props) => {
    return (
        <div className={styles.root}>
            <TaskCheckBox task={task} onComplete={onComplete} />
            <span className={classNames(styles.name, {
                [styles.completed]: task.completed,
            })}
            >
                {task.name}</span>
        </div>
    );
};