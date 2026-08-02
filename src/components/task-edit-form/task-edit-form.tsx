import type {Task} from "../../types/types.ts";
import {useState} from "react";
import styles from "./task-edit-form.module.css"
import {useDispatch} from "react-redux";
import {updateTask} from "../../redux/entities/tasks/tasksSlice.ts";

type Props = {
    task: Task;
    onClose: () => void;
}
export const TaskEditForm = ({task, onClose} : Props) => {
    const dispatch = useDispatch();
    const [taskName, setTaskName] = useState(task.name);

    const [taskDescription, setTaskDescription] = useState(task.description);
    const taskTime =
        task.date.split("T")[1]?.slice(0, 5) ?? "12:00";
    const [time, setTime] = useState(taskTime);

    const handleUpdateTask: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (!taskName.trim()) return;
        const newTask = {
            ...task,
            name: taskName.trim(),
            description: taskDescription.trim(),
            date: `${task.date.split("T")[0]}T${time}:00`,
        }

        dispatch(updateTask(newTask));

        onClose();
    };
    return (
        <form
            onSubmit={handleUpdateTask}
            className={styles.root}
        >
            <input
                autoFocus
                type="text"
                value={taskName}
                onChange={(e) =>
                    setTaskName(e.target.value)
                }
                className={styles.field}
            />
            <input
                type="time"
                value={time}
                onChange={(e) =>
                    setTime(e.target.value)
                }
                className={styles.field}
            />
            <textarea
                value={taskDescription}
                onChange={(e) =>
                    setTaskDescription(
                        e.target.value
                    )
                }
                placeholder="Опишите детали задачи..."
                className={styles.textarea}
            />
            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={styles.primaryButton}
                >
                    Save
                </button>
            </div>

        </form>
    );
}