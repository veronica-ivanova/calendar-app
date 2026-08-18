import type {Task} from "../../types/types.ts";
import {useState} from "react";
import {TaskEditForm} from "../task-edit-form/task-edit-form.tsx";
import styles from "./task-item.module.css";
import classNames from "classnames";
import {Pencil, Trash2, UsersRound} from "lucide-react";
import {TaskCheckBox} from "../task-checkbox/task-checkbox.tsx";
import {useDeleteTaskMutation} from "../../redux/services/api.ts";
import {ErrorMessage} from "../error-message/error-message.tsx";

type Props = {
    task: Task;
};
export const TaskItem = ({ task } : Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const taskTime = new Date(task.date).toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });

    const [
        deleteTask,
        {
            isLoading: isDeleting,
            isError: isDeleteError,
        },
    ] = useDeleteTaskMutation();

    const handleDelete = async () => {
        try {
            await deleteTask(task.id).unwrap();
        }  catch (error) {
                console.error(
                    `Не удалось удалить задачу ${task.id}:`,
                    error,
                );
        }
    }

    if (isEditing) {
        return (
            <TaskEditForm
                task={task}
                onClose={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div
            className={classNames(styles.task, {
                [styles.completed]: task.completed,
            })}
        >
            <div className={styles.taskHeader}>
                <TaskCheckBox
                    task={task}
                    showErrorMessage
                />
                {taskTime && (
                    <span className={styles.taskTime}>
                        {taskTime}
                    </span>
                )}
                <button
                    type="button"
                    className={styles.taskName}
                    onClick={() => setIsDescriptionOpen(prev => !prev)}
                >
                    {task.name}
                </button>
                {task.visibility === "PUBLIC" && (
                    <span title="Публичная задача">
                        <UsersRound
                            size={16}
                            aria-label="Публичная задача"
                        />
                    </span>
                )}
                <div className={styles.actions}>
                    <button
                        className={styles.actionButton}
                        onClick={() => setIsEditing(true)}
                    >
                        <Pencil size={16}/>
                    </button>
                    <button
                        type="button"
                        className={styles.actionButton}
                        disabled={isDeleting}
                        onClick={handleDelete}
                    >
                        <Trash2 size={16}/>
                    </button>
                </div>
            </div>
            {isDescriptionOpen && task.description && (
                <p className={styles.description}>
                    {task.description}
                </p>
            )}
            {isDeleteError && (
                <ErrorMessage>
                    Не удалось удалить задачу. Попробуйте позже.
                </ErrorMessage>
            )}
        </div>
    )
};
