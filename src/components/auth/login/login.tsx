import {useNavigate} from "react-router";
import {useLoginMutation} from "../../../redux/services/api.ts";
import type {LoginRequest} from "../../../types/types.ts";
import {useForm} from "react-hook-form";
import type {AuthMode} from "../../../pages/auth/auth.tsx";
import styles from "../auth-form.module.css";

type Props = {
    setSelected: (value: AuthMode) => void
}
export const Login = ({ setSelected } :Props) => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<LoginRequest>({
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: LoginRequest) => {
        try {
            await login(data).unwrap();
            navigate("/", { replace: true })
        } catch (error) {
            const isUnauthorized =
                typeof error === "object" &&
                error !== null &&
                "status" in error &&
                error.status === 401;

            setError("root.server", {
                type: "server",
                message: isUnauthorized
                    ? "Неверный email или пароль"
                    : "Не удалось войти. Попробуйте ещё раз.",
            });
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <fieldset className={styles.fields} disabled={isSubmitting}>
                <div className={styles.field}>
                    <label htmlFor="login-email" className={styles.label}>Email:</label>
                    <input
                        id="login-email" type="email"
                        className={`${styles.input} ${errors.email ? styles.invalid : ""}`}
                        aria-describedby={
                            errors.email
                                ? "login-email-error"
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
                        <p
                            className={styles.error}
                            id="login-email-error"
                        >
                            {errors.email.message}
                        </p>
                    )}

                </div>

                <div className={styles.field}>
                    <label htmlFor="login-password" className={styles.label}>Пароль</label>
                    <input
                        id="login-password"
                        className={`${styles.input} ${errors.password ? styles.invalid : ""}`}
                        type="password"
                        aria-describedby={
                            errors.password
                                ? "login-password-error"
                                : undefined
                        }
                        {...register("password", {
                            required: "Введите пароль",
                        })}
                    />
                    {errors.password && (
                        <p id="login-password-error"
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
                    Войти
                </button>
            </fieldset>

            <p className={styles.footer}>
                Нет аккаунта?{" "}
                <button
                    type="button"
                    className={styles.link}
                    disabled={isSubmitting}
                    onClick={() => setSelected("register")}
                >
                    Зарегистрируйтесь
                </button>
            </p>
        </form>
    )
}