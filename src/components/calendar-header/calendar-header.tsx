import {ChevronLeft, ChevronRight} from "lucide-react";
import styles from "./calendar-header.module.css";

type Props = {
    monthName: string;
    year: number;
    onNextMonth: () => void;
    onPrevMonth: () => void;
    onToday: () => void;
    onAddTask: () => void;
};
export const CalendarHeader = ({
    monthName,
    year,
    onNextMonth,
    onPrevMonth,
    onToday,
    onAddTask,
    }: Props) => {
    return (
        <div className={styles.root}>
            <div className={styles.navigation}>
                <div className={styles.monthSwitcher}>
                    <button
                        className={styles.monthButton}
                        onClick={onPrevMonth}
                    >
                        <ChevronLeft size={20}/>
                    </button>

                    <span className={styles.monthLabel}>{monthName} {year}</span>
                    <button
                        className={styles.monthButton}
                        onClick={onNextMonth}
                    >
                        <ChevronRight size={20}/>
                    </button>
                </div>

                <button
                    className={styles.todayButton}
                    onClick={onToday}
                >
                    Сегодня
                </button>
            </div>
            <button
                className={styles.newTaskButton}
                onClick={onAddTask}
            >
                + Добавить задачу
            </button>
        </div>
    )
}