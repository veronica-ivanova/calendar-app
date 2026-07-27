import {createContext} from "react";

export type Theme = "light" | "dark";
type ThemeContextType = {
    theme: "light" | "dark";
    changeTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    changeTheme: () => {},
});