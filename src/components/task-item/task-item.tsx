import type {Task} from "../../types/types.ts";
import {useState} from "react";
import {TaskEditForm} from "../task-edit-form/task-edit-form.tsx";
import styles from "./task-item.module.css";
import classNames from "classnames";
import {Pencil, Trash2} from "lucide-react";
import {TaskCheckBox} from "../task-checkbox/task-checkbox.tsx";
import {useDispatch} from "react-redux";
import {removeTask} from "../../redux/entities/tasks/tasksSlice.ts";

type Props = {
    task: Task;
};
export const TaskItem = ({ task } : Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const taskTime = task.date.split("T")[1]?.slice(0, 5);

    const dispatch = useDispatch();

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
                <TaskCheckBox task={task}/>
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
                        onClick={() => dispatch(removeTask(task.id))}
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
