import styles from "./task-checkbox.module.css"
import type {Task} from "../../types/types.ts";
import {useSetTaskCompletedMutation} from "../../redux/services/api.ts";
import * as React from "react";
import classNames from "classnames";
type Props = {
    task: Task;
    showErrorMessage?: boolean;
};
export const TaskCheckBox = ({ task, showErrorMessage = false } : Props) => {
    const [
        setTaskCompleted,
        {
            isLoading: isCompleting,
            isError: isCompleteError,
            reset: resetCompleteState,
        }
    ] = useSetTaskCompletedMutation({
        fixedCacheKey: `set-task-completed-${task.id}`
    });

    const handleCompletedChange: React.ChangeEventHandler<HTMLInputElement> =
        async (event) => {
            const completed = event.currentTarget.checked;

            try {
                await setTaskCompleted({
                    id: task.id,
                    completed
                }).unwrap();
            } catch (error) {
                console.error(error);
            }
    }

    const errorMessage = "Не удалось изменить статус задачи";

    return (
        <span className={styles.root}>
            <input
                className={classNames(styles.checkbox, {
                    [styles.checkboxError]: isCompleteError,
                })}
                type="checkbox"
                checked={task.completed}
                onChange={handleCompletedChange}
                disabled={isCompleting}
                aria-label={
                    task.completed
                        ? "Отметить задачу как невыполненную"
                        : "Отметить задачу как выполненную"
                }
            />
            {showErrorMessage && isCompleteError && (
                <span className={styles.error} role="alert">
                    <span className={styles.errorText}>
                        {errorMessage}
                    </span>

                    <button
                        className={styles.closeButton}
                        type="button"
                        onClick={resetCompleteState}
                        aria-label="Закрыть сообщение об ошибке"
                    >
                      ×
                    </button>
                </span>
            )}
        </span>
    )
}