import type {Task} from "../../types/types.ts";
import {useState} from "react";
import styles from "./task-edit-form.module.css"

type Props = {
    task: Task;
    onEdit: (task: Task) => void,
    onClose: () => void;
}
export const TaskEditForm = ({task, onEdit, onClose} : Props) => {
    const [taskName, setTaskName] = useState(task.name);

    const [taskDescription, setTaskDescription] = useState(task.description);
    const taskTime =
        task.date.split("T")[1]?.slice(0, 5) ?? "12:00";
    const [time, setTime] = useState(taskTime);

    const handleUpdateTask: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (!taskName.trim()) return;

        onEdit({
            ...task,
            name: taskName.trim(),
            description: taskDescription.trim(),
            date: `${task.date.split("T")[0]}T${time}:00`,
        });

        onClose();
    };
    return (
        <form
            className={styles.root}
            onSubmit={handleUpdateTask}
        >
            <input
                type="text"
                value={taskName}
                onChange={(e) =>
                    setTaskName(e.target.value)
                }
                placeholder="Task title"
            />

            <input
                type="time"
                value={time}
                onChange={(e) =>
                    setTime(e.target.value)
                }
            />

            <textarea
                value={taskDescription}
                onChange={(e) =>
                    setTaskDescription(
                        e.target.value
                    )
                }
                placeholder="Detailed task description..."
            />

            <button type="submit">
                Save
            </button>

            <button
                type="button"
                onClick={onClose}
            >
                Cancel
            </button>
        </form>
    );
}