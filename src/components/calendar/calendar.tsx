import { CalendarDay } from "../calenadar-day.tsx/calendar-day";
import styles from './calendar.module.css'

export const Calendar = () => {
    const today = new Date();
    const currentDay = today.getDate();
    console.log(today);
    console.log(currentDay);

    const month = today.getMonth(); //январь - 0, дек -11
    const year = today.getFullYear();

    const daysInMonth = new Date(year, month + 1, 0).getDate(); // 0 день след. месяца = последнему дню текущего

    const days = Array.from({ length: daysInMonth })

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 - вс , 6 - сб
    const normalizedFirstDay = (firstDayOfMonth + 6) % 7; // 0 - пн, 6 -вс
    const emptyDays = Array.from({ length: normalizedFirstDay })
    const monthArray = [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь",
    ];
    const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

    return (
        <div className={"container"}>
            <h2>{monthArray[month]}</h2>
            <div className={styles.weekDays}>
                {weekDays.map((weekDay) => (
                    <h3 key={weekDay}>{weekDay}</h3>
                ))}
            </div>
            <ul className={styles.root}>
                {[...emptyDays, ...days].map((_, i) => {
                    const dayNumber = i - emptyDays.length + 1;

                    return (
                        <li key={`calendar-day-${i}`}>
                            <CalendarDay
                                day={dayNumber > 0 ? dayNumber : undefined}
                                isCurrentDay={currentDay === dayNumber}
                            />
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}