import styles from "./header.module.css";
import {CalendarCheck, Moon, Sun, User} from "lucide-react";
import classNames from "classnames";
import {ThemeContext} from "../theme-context/theme-context.ts";
import {use} from "react";
export const Header = () => {
    const {theme, changeTheme} = use(ThemeContext);
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
                    <button onClick={() => changeTheme("light")} className={classNames(styles.themeButton, {[styles.themeButtonActive]: theme === "light"})}><Sun size={20}/></button>
                    <button onClick={() => changeTheme("dark")} className={classNames(styles.themeButton, {[styles.themeButtonActive]: theme === "dark"})}><Moon size={20}/></button>
                </div>
                <button className={styles.userButton}><User size={20}/></button>
            </div>
        </header>
    );
};