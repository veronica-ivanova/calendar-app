import {Search} from "lucide-react";
import styles from "./search-input.module.css";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export const SearchInput = ({
    value,
    onChange,
}: Props) => {
    return (
        <div className={styles.root}>
            <Search
                className={styles.searchIcon}
                size={18}
                aria-hidden="true"
            />
            <input
                className={styles.input}
                value={value}
                type="search"
                placeholder="Поиск задач"
                onChange={(event) => {
                    onChange(event.currentTarget.value);
                }}
            />
        </div>
    )
}