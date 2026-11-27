import {type ReactNode, useContext} from "react";
import { createPortal } from "react-dom";
import {ThemeContext} from "../theme-context/theme-context.ts";
import styles from "./notification-portal.module.css";

type Props = {
    children: ReactNode;
};

export const NotificationPortal = ({ children }: Props) => {
    const { theme } = useContext(ThemeContext);
    const container = document.getElementById("notification");

    if (!container) return null;

    return createPortal(
        <div
            className={styles.root}
            role="alert"
            data-theme={theme}
            onClick={(event) => event.stopPropagation()}
        >
            {children}
        </div>,
        container,
    );
};