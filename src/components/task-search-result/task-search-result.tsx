import type {Task} from "../../types/types.ts";
import styles from "../task-search-result/task-search-result.module.css";
import {UserRound, UsersRound} from "lucide-react";

type Props = {
    task: Task;
}
export const TaskSearchResult = ({task} :Props) => {
    const date = new Date(task.date);
    const formattedDate = date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
    });
    const formattedTime = date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit",
    });
    const isPublic = task.visibility === "PUBLIC";
    return (
        <div className={styles.root}>
            <h3
                className={styles.name}
                title={task.name}
            >
                {task.name}
            </h3>
            <div
                className={styles.date}
            >
                {formattedDate} · {formattedTime}
            </div>
            <span
                className={`
                    ${styles.visibility}
                    ${isPublic ? styles.public : styles.private}
                `}
            >
                {isPublic ? (
                    <UsersRound
                        size={14}
                        aria-hidden="true"
                    />
                ) : (
                    <UserRound
                        size={14}
                        aria-hidden="true"
                    />
                )}
                {isPublic ? "Публичная" : "Только я"}
            </span>
        </div>
    )
}
