import type {Task, TaskRequest} from "../../types/types.ts";
import {useState} from "react";
import styles from "./task-edit-form.module.css"
import {useUpdateTaskMutation} from "../../redux/services/api.ts";
import * as React from "react";

type Props = {
    task: Task;
    onClose: () => void;
}
export const TaskEditForm = ({task, onClose} : Props) => {
    const [taskName, setTaskName] = useState(task.name);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const taskTime =
        task.date.split("T")[1]?.slice(0, 5) ?? "12:00";
    const [time, setTime] = useState(taskTime);

    const [
        updateTask,
        {
            isLoading: isUpdating,
            isError: isUpdateError
        }
    ] = useUpdateTaskMutation();

    const handleUpdateTask: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault();

        if (!taskName.trim()) return;

        const newTask: TaskRequest = {
            name: taskName.trim(),
            description: taskDescription.trim(),
            date: `${task.date.split("T")[0]}T${time}:00Z`,
            visibility: task.visibility,
        }
        try {
            await updateTask({id: task.id, changes: newTask}).unwrap();
            onClose();

        } catch (error) {
            console.error(
                "Не удалось обновить задачу:",
                error,
            );
        }
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
                    disabled={isUpdating}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={isUpdating || !taskName.trim()}
                >
                    Save
                </button>
            </div>
            {isUpdateError && (
                <p>
                    Не удалось обновить задачу
                </p>
            )}
        </form>
    );
}