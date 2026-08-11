import {useState} from "react";
import * as React from "react";
import type {TaskRequest} from "../../types/types.ts";
import styles from "./task-create-form.module.css";
import {useCreateTaskMutation} from "../../redux/services/api.ts";

type Props ={
    selectedDate: string;
    onClose: () => void;
}
export const TaskCreateForm = ({
    selectedDate,
    onClose
} : Props) => {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [time, setTime] = useState("12:00");
    const [
        createTask,
        {
            isLoading: isCreating,
            isError: isCreateError
        }
    ] = useCreateTaskMutation();

    const handleCreateTask: React.FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault();

        if (!taskName.trim()) return;

        const newTask: TaskRequest = {
            name: taskName.trim(),
            description: taskDescription.trim(),
            date: `${selectedDate}T${time}:00Z`,
            visibility: "PRIVATE"
        }
        try {
            const createdTask = await createTask(newTask).unwrap();
            console.log("Created task", createdTask);
            setTaskName("");
            setTaskDescription("")
            setTime("12:00");
            onClose();
        } catch (error) {
            console.log("error", error)
        }
    }
    return (
        <form
            onSubmit={handleCreateTask}
            className={styles.root}
        >
            <input
                autoFocus
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Название задачи"
                className={styles.field}
            />
            <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={styles.field}
            />
            <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Опишите детали задачи..."
                className={styles.textarea}
            />
            {isCreateError && (
                <p>
                    Не удалось создать задачу
                </p>
            )}
            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={onClose}
                    disabled={isCreating}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={isCreating || !taskName.trim()}
                >
                    Add
                </button>
            </div>

        </form>
    )
}