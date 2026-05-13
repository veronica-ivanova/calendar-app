import { CalendarDay } from "../calenadar-day.tsx/calendar-day";
import styles from './calendar.module.css'

export const Calendar = () => {
    const today = new Date();

    const month = today.getMonth(); //январь - 0, дек -11
    const year = today.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 день след. месяца = последнему дню текущего

    const days = Array.from({ length: daysInMonth })

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 - вс , 6 - сб
    const normalizedFirstDay = (firstDayOfMonth + 6) % 7; // 0 - пн, 6 -вс
    const emptyDays = Array.from({ length: normalizedFirstDay })

    return (
        <div className={"container"}>
            <ul className={styles.root}>
                {[...emptyDays, ...days].map((_, i) => {
                    const dayNumber = i - emptyDays.length + 1;

                    return (
                        <li key={i}>
                            <CalendarDay day={dayNumber > 0 ? dayNumber : undefined} />
                        </li>
                    );
                })}
            </ul>
        </div>

    )
}