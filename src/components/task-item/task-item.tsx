import type {Task} from "../../types/types.ts";
import {useState} from "react";
import {TaskEditForm} from "../task-edit-form/task-edit-form.tsx";

import styles from "./task-item.module.css";
import classNames from "classnames";
import {Pencil, Trash2} from "lucide-react";
import {TaskCheckBox} from "../task-checkbox/task-checkbox.tsx";

type Props = {
    task: Task;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
    onComplete: (id: string) => void;
};
export const TaskItem = ({task, onDelete, onEdit, onComplete} : Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const taskTime = task.date.split("T")[1]?.slice(0, 5);

    if (isEditing) {
        return (
            <TaskEditForm
                task={task}
                onEdit={onEdit}
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
                <TaskCheckBox task={task} onComplete={onComplete} />
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
                <div className={styles.actions}>
                    <button
                        className={styles.actionButton}
                        onClick={() => setIsEditing(true)}
                    >
                        <Pencil size={16}/>
                    </button>
                    <button
                        className={styles.actionButton}
                        onClick={() => onDelete(task.id)}
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
        </div>
    )
};
