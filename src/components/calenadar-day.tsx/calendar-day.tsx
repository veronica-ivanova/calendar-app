import classNames from 'classnames'
import styles from './calendar-day.module.css'

type Props = {
    day?: number,
    isCurrentDay?: boolean,
}

export const CalendarDay = ({ day, isCurrentDay } : Props) => {
 return (
    <div className={classNames(styles.root, {
        [styles.active]: isCurrentDay
    })}>
        {day ? day : ""}
    </div>
 )
}