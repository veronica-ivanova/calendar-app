import styles from "./task-checkbox.module.css"
import type {Task} from "../../types/types.ts";
type Props = {
    task: Task;
    onComplete: (id: string) => void;
};
export const TaskCheckBox = ({task, onComplete} : Props) => {
    return (
        <input
            className={styles.checkbox}
            type="checkbox"
            checked={task.completed}
            onChange={() => onComplete(task.id)}
        />
    )
}