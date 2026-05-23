import classNames from 'classnames'
import styles from './calendar-day.module.css'
import type {Task} from "../../types/types.ts";

type Props = {
    date?: Date
    tasks?: Task[];
    isCurrentDay?: boolean,
}

export const CalendarDay = ({ date, tasks, isCurrentDay} : Props) => {
     return (
        <div className={classNames(styles.root, {
            [styles.active]: isCurrentDay
            })}
        >
            {date?.getDate()}

            {tasks?.map((task: Task) => (
                <div key={task.id}>{task.name}</div>
            ))}

        </div>
     )
}