import { UserRound, UsersRound} from "lucide-react";
import {FilterButton} from "../filter-button/filter-button.tsx";
import type {TaskVisibilityFilter} from "../../types/types.ts";
import styles from "./filter-panel.module.css";
import {TaskSearch} from "../task-search/task-search.tsx";

type Props = {
    visibility: TaskVisibilityFilter;
    allCount?: number;
    publicCount?: number;
    onVisibilityChange: (value: TaskVisibilityFilter) => void;
};
export const FilterPanel = ({
    visibility,
    allCount,
    publicCount,
    onVisibilityChange,
} : Props) => {
    return (
        <div className={styles.root}>
            <TaskSearch/>

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
