import classNames from 'classnames'
import styles from './calendar-day.module.css'
import type {Task} from "../../types/types.ts";
import {CalendarTaskList} from "../calendar-task-list/calendar-task-list.tsx";
import {isSameDate} from "../../utils/date.ts";

type Props = {
    date: Date
    tasks: Task[];
    onClick: () => void;
    isSelected: boolean;
    isOutsideMonth: boolean;
}

export const CalendarDay = ({
    date,
    tasks,
    onClick,
    isSelected,
    isOutsideMonth
}: Props) => {

    const today = new Date();
    const isCurrentDay = isSameDate(date, today)

    return (
        <div
            onClick={onClick}
            className={classNames(styles.root, {
                [styles.outsideMonth] : isOutsideMonth,
                [styles.selected]: isSelected
            })}>
            <div
                className={classNames(styles.dayNumber, {
                    [styles.active]: isCurrentDay,
                })}
            >
                {date.getDate()}
            </div>
            <CalendarTaskList
                tasks={tasks}
            />
        </div>
    )
}