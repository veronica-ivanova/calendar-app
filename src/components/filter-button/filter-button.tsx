import classNames from "classnames";
import styles from "./filter-button.module.css";
import type {LucideIcon} from "lucide-react";

type Props = {
    label: string;
    isActive: boolean;
    icon: LucideIcon;
    count?: number;
    onClick: () => void
}

export const FilterButton = ({
    label,
    isActive,
    icon: Icon,
    count,
    onClick,
}: Props) => {
    return (
        <button
            className={classNames(styles.root, {
                [styles.active]: isActive,
            })}
            type="button"
            onClick={onClick}
        >
            <Icon size={17}/>
            <span>{label}</span>
            {count !== undefined && (
                <span className={styles.count}>
                    {count}
                </span>
            )}
        </button>
    )
}