import {ChevronLeft, ChevronRight} from "lucide-react";
import styles from "./calendar-header.module.css";

export const CalendarHeader = () => {
    return (
        <div className={styles.root}>
            <div className={styles.navigation}>
                <div className={styles.monthSwitcher}>
                    <button className={styles.monthButton}>
                        <ChevronLeft size={20}/>
                    </button>

                    <span className={styles.monthLabel}>Июль 2026</span>
                    <button className={styles.monthButton}>
                        <ChevronRight size={20}/>
                    </button>
                </div>

                <button className={styles.todayButton}>Сегодня</button>
            </div>
            <button className={styles.newTaskButton}>+ Добавить задачу</button>
        </div>
    )
}