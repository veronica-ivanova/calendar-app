import styles from "./task-checkbox.module.css"
import type {Task} from "../../types/types.ts";
import {useSetTaskCompletedMutation} from "../../redux/services/api.ts";
import * as React from "react";
import classNames from "classnames";
import {ErrorMessage} from "../error-message/error-message.tsx";
import {NotificationPortal} from "../notification-portal/notification-portal.tsx";
type Props = {
    task: Task;
};
export const TaskCheckBox = ({ task } : Props) => {
    const [
        setTaskCompleted,
        {
            isLoading: isCompleting,
            isError: isCompleteError,
            reset: resetCompleteState,
        }
    ] = useSetTaskCompletedMutation(
    //     {fixedCacheKey: `set-task-completed-${task.id}`}
    );

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
                onClick={(event) => event.stopPropagation()}
                onChange={handleCompletedChange}
                disabled={isCompleting}
                aria-label={
                    task.completed
                        ? "Отметить задачу как невыполненную"
                        : "Отметить задачу как выполненную"
                }
            />

            {isCompleteError && (
                    <NotificationPortal>
                        <ErrorMessage onClose={resetCompleteState}>
                            Не удалось изменить статус задачи. Попробуйте позже.
                        </ErrorMessage>
                    </NotificationPortal>
            )}
        </div>
    )
}