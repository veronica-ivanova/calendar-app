import {useState} from "react";
import {Login} from "../../components/auth/login/login.tsx"
import {Register} from "../../components/auth/register/register.tsx"
import {CalendarCheck} from "lucide-react";
import styles from "./auth.module.css";

export type AuthMode = "login" | "register";

export const Auth = () => {
    const [selected, setSelected] = useState<AuthMode>("login");
    const [message, setMessage] = useState<string>("");

    const handleModeChange = (mode: AuthMode) => {
        setMessage("");
        setSelected(mode);
    };

    const handleRegistered = () => {
        setMessage("Вы успешно зарегистрировались. Войдите в аккаунт.");
        setSelected("login");
    }

    return (
        <main className={styles.root}>
            <section className={styles.card}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <CalendarCheck size={28}/>
                    </div>
                    <h2>Мой календарь</h2>
                </div>
                <div className={styles.switcher}>
                    <button
                        type="button"
                        aria-pressed={selected === "login"}
                        className={styles.tab}
                        onClick={() => handleModeChange("login")}
                    >
                        Вход
                    </button>

                    <button
                        type="button"
                        aria-pressed={selected === "register"}
                        className={styles.tab}
                        onClick={() => handleModeChange("register")}
                    >
                        Регистрация
                    </button>
                </div>
                {message && <p className={styles.message}>{message}</p>}

                {selected === "login" ? (
                    <Login setSelected={handleModeChange}/>
                ) : (
                    <Register
                        setSelected={handleModeChange}
                        onRegistered={handleRegistered}
                    />
                )}
            </section>
        </main>
    );
}