import type {AuthMode} from "../../../pages/auth/auth.tsx";
import {useRegisterMutation} from "../../../redux/services/api.ts";
import {useForm} from "react-hook-form";
import type { RegisterRequest} from "../../../types/types.ts";
import styles from "../auth-form.module.css";

type Props = {
    setSelected: (value: AuthMode) => void
    onRegistered: () => void;
}
export const Register = ({ setSelected, onRegistered } :Props) => {
    const [registerUser] = useRegisterMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<RegisterRequest>({
        mode: "onBlur",
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: RegisterRequest) => {
        try {
            await registerUser(data).unwrap();
            onRegistered();
        } catch {
            setError("root.server", {
                type: "server",
                message: "Не удалось зарегистрироваться. Попробуйте ещё раз.",
            });
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <fieldset className={styles.fields} disabled={isSubmitting}>
                <div className={styles.field}>
                    <label htmlFor="register-name" className={styles.label}>Имя</label>
                    <input
                        id="register-name"
                        className={`${styles.input} ${errors.name ? styles.invalid : ""}`}
                        type="text"
                        aria-describedby={
                            errors.name ? "register-name-error" : undefined
                        }
                        {...register("name", {
                            required: "Введите имя",
                            setValueAs: (value: string) => value.trim(),
                        })}
                    />

                    {errors.name && (
                        <p id="register-name-error">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className={styles.field}>
                    <label htmlFor="register-email" className={styles.label}>Email:</label>
                    <input
                        id="register-email"
                        className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
                        type="email"
                        aria-describedby={
                            errors.email
                                ? "register-email-error"
                                : undefined
                        }
                        {...register("email", {
                            required: "Введите email",
                            setValueAs: (value: string) => value.trim(),
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Введите корректный email"
                            }
                        })}
                    />
                    {errors.email && (
                        <p id="register-email-error">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div className={styles.field}>
                    <label htmlFor="register-password" className={styles.label}>Пароль</label>
                    <input
                        id="register-password"
                        className={`${styles.input} ${errors.password ? styles.invalid : ""}`}
                        type="password"
                        aria-describedby={
                            errors.password
                                ? "register-password-error"
                                : undefined
                        }
                        {...register("password", {
                            required: "Введите пароль",
                        })}
                    />
                    {errors.password && (
                        <p id="register-password-error"
                           className={styles.error}
                        >
                            {errors.password.message}
                        </p>
                    )}
                </div>
                {errors.root?.server && (
                    <p className={styles.error}>{errors.root.server.message}</p>
                )}
                <button type="submit" className={styles.submit}>
                    Зарегистрироваться
                </button>
            </fieldset>

            <p className={styles.footer}>
                Уже есть аккаунт?{" "}
                <button
                    type="button"
                    className={styles.link}
                    disabled={isSubmitting}
                    onClick={() => setSelected("login")}
                >
                    Войти
                </button>
            </p>
        </form>
    )
}