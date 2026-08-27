import {SearchInput} from "../search-input/search-input.tsx";
import {TaskSearchResult} from "../task-search-result/task-search-result.tsx";
import { useMemo, useState} from "react";
import {useSearchTasksInfiniteQuery} from "../../redux/services/api.ts";
import styles from "./task-search.module.css";
import { useDebounce } from "../../hooks/useDebounce.ts";

const PAGE_SIZE = 5;
export const TaskSearch = () => {
    const [filter, setFilter] = useState("")
    // const [pageNumber, setPageNumber] = useState(0);
    // const [tasks, setTasks] = useState<Task[]>([]);
    // const [hasNextPage, setHasNextPage] = useState(true);

    const normalizedFilter = filter.trim()
    const debouncedFilter = useDebounce(
        normalizedFilter,
        300
    )
    const isWaitingForDebounce =
        normalizedFilter !== debouncedFilter;

    const {
        currentData,
        isLoading,
        isFetching,
        isError,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage,
    } = useSearchTasksInfiniteQuery(
        {
            filter: debouncedFilter,
            size: PAGE_SIZE,
        },
        {
            skip:
                normalizedFilter.length === 0 ||
                debouncedFilter.length === 0,
        }
    );

    const tasks = useMemo(
        () =>
            currentData?.pages.flatMap(
                (page) => page.content,
            ) ?? [],
        [currentData]
    )

    const handleScroll = (
        event: React.UIEvent<HTMLDivElement>
    )=> {
        const element = event.currentTarget;

        const isNearBottom =
            element.scrollHeight -
            element.scrollTop -
            element.clientHeight < 20

        if (
            isNearBottom &&
            !isWaitingForDebounce &&
            hasNextPage &&
            !isFetching
        ) {
            void fetchNextPage();
        }
    }

    const showNoResults =
        !isFetching &&
        !isError &&
        currentData !== undefined &&
        tasks.length === 0;

    return (
        <div className={styles.root}>
            <SearchInput
                value={filter}
                onChange={setFilter}
            />
            {normalizedFilter &&
                <div
                    className={styles.results}
                    onScroll={handleScroll}
                >
                    {isLoading && (
                        <div className={styles.status}>
                            Поиск...
                        </div>
                    )}

                    {isError && (
                        <div className={styles.status}>
                            Не удалось выполнить поиск
                        </div>
                    )}

                    {showNoResults && (
                            <div className={styles.status}>
                                Задачи не найдены
                            </div>
                    )}

                    {tasks.length !== 0 &&
                        <div className={styles.resultsHeader}>
                            <span>По всем месяцам</span>

                            <span>
                                {tasks.length} результатов
                            </span>
                        </div>
                    }

                    {tasks.map((task) => (
                        <TaskSearchResult
                            key={task.id}
                            task={task}
                        />
                    ))}

                    {isFetchingNextPage && (
                        <div className={styles.status}>
                            Загружаем ещё...
                        </div>
                    )}

                </div>}
        </div>

    )
}