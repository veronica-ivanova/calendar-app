import type {Task} from "../../types/types.ts";
import styles from "../task-search-result/task-search-result.module.css";
import {UserRound, UsersRound} from "lucide-react";

type Props = {
    task: Task;
    onSelect: (task: Task) => void;
}
export const TaskSearchResult = ({task, onSelect} :Props) => {
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
        <button
            type="button"
            className={styles.root}
            onClick={() => onSelect(task)}
        >
            <span
                className={styles.name}
                title={task.name}
            >
                {task.name}
            </span>
            <span
                className={styles.date}
            >
                {formattedDate} · {formattedTime}
            </span>
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
        </button>
    )
}
