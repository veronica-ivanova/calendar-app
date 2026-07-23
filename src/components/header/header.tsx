import styles from "./header.module.css";
import {CalendarCheck, Moon, Sun, User} from "lucide-react";
import classNames from "classnames";
export const Header = () => {
    return (
        <header className={styles.root}>
            <div className={styles.logo}>
                <div className={styles.logoIcon}>
                    <CalendarCheck size={28}/>
                </div>
                <h1>Мой календарь</h1>
            </div>

            <div className={styles.actions}>
                <div className={styles.themeToggle}>
                    <button className={classNames(styles.themeButton, styles.themeButtonActive)}><Sun size={20}/></button>
                    <button className={styles.themeButton}><Moon size={20}/></button>
                </div>
                <button className={styles.userButton}><User size={20}/></button>
            </div>
        </header>
    );
};