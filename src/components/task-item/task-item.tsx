import type {Task} from "../../types/types.ts";
import {useState} from "react";
import {TaskEditForm} from "../task-edit-form/task-edit-form.tsx";

type Props = {
    task: Task;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
    onComplete: (id: string) => void;
};
export const TaskItem = ({task, onDelete, onEdit, onComplete} : Props) => {
    const [isEditing, setIsEditing] = useState(false);
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
        <div>
            <span>{task.name}</span>
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

        </div>
    )
};