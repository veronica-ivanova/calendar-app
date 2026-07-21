import type {Task} from "../../types/types.ts";
import {useState} from "react";
import {TaskEditForm} from "../task-edit-form/task-edit-form.tsx";

import styles from "./task-item.module.css";

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
            className={task.completed ? styles.completed : ""}
        >
            {taskTime && <span>{taskTime}</span>}
            <button
                type="button"
                className={styles.taskName}
                onClick={() => setIsDescriptionOpen(prev => !prev)}
            >
                {task.name}
            </button>
            <button onClick={()=> onDelete(task.id)}>
                Remove
            </button>
            <button onClick={()=> setIsEditing(true)}>
                Edit
            </button>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onComplete(task.id)}
            />

            {isDescriptionOpen && task.description && (
                <p>{task.description}</p>
            )}

        </div>
    )
};
