import type {Task} from "../../types/types.ts";
import styles from './calendar-task-item.module.css'
import classNames from "classnames";
type Props = {
    task: Task;
    onComplete: (id: string) => void;
};

export const CalendarTaskItem = ({ task, onComplete }: Props) => {
    return (
        <div className={styles.root}>
            <input
                className={styles.checkbox}
                type="checkbox"
                checked={task.completed}
                onClick={(e) => e.stopPropagation()}
                onChange={() => onComplete(task.id)}
            />
            <span className={classNames(styles.name, {
                [styles.completed]: task.completed,
            })}
            >
                {task.name}</span>
        </div>
    );
};