import styles from './calendar-day.module.css'

type Props = {
    day?: number
}

export const CalendarDay = ({ day } : Props) => {
 return (
    <div className={styles.root}>
        {day ? day : ""}
    </div>
 )
}