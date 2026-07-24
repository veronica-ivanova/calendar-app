import {useState} from "react";
import * as React from "react";
import type {Task} from "../../types/types.ts";
import styles from "./task-create-form.module.css";

type Props ={
    selectedDate: string;
    addTask: (task: Task) => void,
    onClose: () => void;
}
export const TaskCreateForm = ({
    selectedDate,
    addTask,
    onClose
} : Props) => {

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [time, setTime] = useState("12:00");

    const handleCreateTask: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (!taskName.trim()) return;

        addTask({
            id: crypto.randomUUID(),
            name: taskName.trim(),
            description: taskDescription.trim(),
            // date: new Date(selectedDate).toISOString(),
            date: `${selectedDate}T${time}:00`,
            completed: false,
        });

        setTaskName("");
        setTaskDescription("")
        setTime("12:00");
        onClose();
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
                    Add
                </button>
            </div>

        </form>
    )
}