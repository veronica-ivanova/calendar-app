import {type ReactNode, useCallback, useState} from "react";
import {ThemeContext, type Theme,} from "./theme-context.ts";

type Props = {
    children: ReactNode;
};
export const ThemeContextProvider = ({ children } : Props) => {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light" || savedTheme === "dark") {
            return savedTheme;
        }
        return "light";
    });

    const changeTheme = useCallback((newTheme: Theme) => {
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }, []);

    return (
        <ThemeContext value={{theme, changeTheme}}>
            <div data-theme={theme}>
                {children}
            </div>
        </ThemeContext>
    );
};
