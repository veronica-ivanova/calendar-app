import  {type ReactNode} from "react";
import styles from "./error-message.module.css";
import classNames from "classnames";
type Props = {
    children: ReactNode,
    className?: string,
    onClose?: () => void;
}

export const ErrorMessage = ({
    children,
    className,
    onClose
} : Props)  => {
    return (
        <div className={classNames(styles.root, className)}>
            <span className={styles.message}>
                {children}
            </span>
            {onClose && (
                <button
                    className={styles.closeButton}
                    type="button"
                    onClick={onClose}
                    aria-label="Закрыть сообщение об ошибке"
                >
                    ×
                </button>
            )}
        </div>
    )
}