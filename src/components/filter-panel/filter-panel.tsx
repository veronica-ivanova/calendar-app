import { UserRound, UsersRound} from "lucide-react";
import {SearchInput} from "../search-input/search-input.tsx";
import {FilterButton} from "../filter-button/filter-button.tsx";
import type {TaskVisibilityFilter} from "../../types/types.ts";
import styles from "./filter-panel.module.css";

type Props = {
    query: string;
    visibility: TaskVisibilityFilter;
    allCount?: number;
    publicCount?: number;
    onQueryChange: (value: string) => void;
    onVisibilityChange: (value: TaskVisibilityFilter) => void;
};
export const FilterPanel = ({
    query,
    visibility,
    allCount,
    publicCount,
    onQueryChange,
    onVisibilityChange
} : Props) => {
    return (
        <div className={styles.root}>
            <SearchInput
                value={query}
                onChange={onQueryChange}
            />
            <div className={styles.filterButtonContainer}>
                <FilterButton
                    label="Все задачи"
                    icon={UserRound}
                    count={allCount}
                    isActive={visibility === "ALL"}
                    onClick={() => onVisibilityChange("ALL")}
                />
                <FilterButton
                    label="Публичные"
                    icon={UsersRound}
                    count={publicCount}
                    isActive={visibility === "PUBLIC"}
                    onClick={() => onVisibilityChange("PUBLIC")}
                />

            </div>

        </div>
    )
}