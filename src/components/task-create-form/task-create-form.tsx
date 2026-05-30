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
            date: `${selectedDate}T${time}:00`
        });

        setTaskName("");
        setTaskDescription("")
        setTime("12:00");
        onClose();
    }
    return (
        <form
            className={styles.root}
            onSubmit={handleCreateTask}>
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task title..."
            />
            <input type="time"
                   value={time}
                   onChange={(e) => setTime(e.target.value)}
            />
            <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="detailed task description..."
            />
            <button type="submit">
                Add
            </button>
            <button
                type="button"
                onClick={onClose}
            >
                Cancel
            </button>
        </form>
    )
}