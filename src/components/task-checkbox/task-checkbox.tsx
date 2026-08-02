import styles from "./task-checkbox.module.css"
import type {Task} from "../../types/types.ts";
import {useDispatch} from "react-redux";
import {toggleCompleteTask} from "../../redux/entities/tasks/tasksSlice.ts";
type Props = {
    task: Task;
};
export const TaskCheckBox = ({ task } : Props) => {
    const dispatch = useDispatch();
    return (
        <input
            className={styles.checkbox}
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleCompleteTask(task.id))}
        />
    )
}