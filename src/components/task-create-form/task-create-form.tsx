import {useState} from "react";
import * as React from "react";
import type {TaskRequest} from "../../types/types.ts";
import styles from "./task-create-form.module.css";
import {useCreateTaskMutation} from "../../redux/services/api.ts";
import {createISOString} from "../../utils/date.ts";
import classNames from "classnames";
import {ErrorMessage} from "../error-message/error-message.tsx";

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

    const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);
    const showTaskNameError = isSubmitAttempted && !taskName.trim()

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
        setIsSubmitAttempted(true)

        if (!taskName.trim()) return;

        const newTask: TaskRequest = {
            name: taskName.trim(),
            description: taskDescription.trim(),
            date: createISOString(selectedDate, time),
            visibility: "PRIVATE"
        }
        try {
            await createTask(newTask).unwrap();
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
                className={classNames(styles.field, {
                    [styles.inputError] : showTaskNameError
                })}
            />
            {showTaskNameError && (
                <ErrorMessage>
                    Введите название задачи
                </ErrorMessage>
            )}
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
                    disabled={isCreating}
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={isCreating}
                >
                    {isCreating ? "Создание..." : "Создать задачу"}
                </button>
            </div>
            {isCreateError && (
                <ErrorMessage>
                    Не удалось создать задачу. Попробуйте позже.
                </ErrorMessage>
            )}
        </form>
    )
}