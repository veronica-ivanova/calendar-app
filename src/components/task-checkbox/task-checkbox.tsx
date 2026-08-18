import styles from "./task-checkbox.module.css"
import type {Task} from "../../types/types.ts";
import {useSetTaskCompletedMutation} from "../../redux/services/api.ts";
import * as React from "react";
import classNames from "classnames";
import {ErrorMessage} from "../error-message/error-message.tsx";
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

    return (
        <div className={styles.root}>
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
                <ErrorMessage
                    className={styles.completeError}
                    onClose={resetCompleteState}
                >
                    Не удалось изменить статус задачи. Попробуйте позже.
                </ErrorMessage>
            )}
        </div>
    )
}