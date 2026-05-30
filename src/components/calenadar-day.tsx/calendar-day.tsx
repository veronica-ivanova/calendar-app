import classNames from 'classnames'
import styles from './calendar-day.module.css'
import type {Task} from "../../types/types.ts";
import {TaskList} from "../task-list/task-list.tsx";

type Props = {
    date: Date
    tasks: Task[];
    isCurrentDay: boolean,
    removeTask: (taskId: string) => void;
    onClick: () => void;
    isSelected: boolean;
    onAddTask: () => void;
}

export const CalendarDay = ({
    date,
    tasks,
    isCurrentDay,
    removeTask,
    onClick,
    isSelected,
    onAddTask
}: Props) => {

    return (
        <div
            onClick={onClick}
            className={classNames(styles.root, {
                [styles.active]: isCurrentDay,
                [styles.selected]: isSelected
            })}>
            <div>{date.getDate()}</div>

            <TaskList
                tasks={tasks}
                onDelete={removeTask}
            />

            <button onClick={onAddTask}>
                +
            </button>
        </div>
    )
}