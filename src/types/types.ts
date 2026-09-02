export type TaskVisibility = "PRIVATE" | "PUBLIC";
export type TaskVisibilityFilter = "ALL" | TaskVisibility;

export type Task = {
    id: string;
    name: string;
    description: string;
    date: string;
    createdAt: string;
    updatedAt: string;
    visibility: TaskVisibility;
    completed: boolean;
};

export type TaskRequest = Pick<
    Task,
    "name" | "description" | "visibility" | "date"
>
export type TasksResponse = {
    tasks: Task[];
    states: {
        allCount: number;
        publicCount: number;
        privateCount: number;
    }
}
export type SearchTasksResponse = {
    content: Task[],
    isLast: boolean,
    totalElements: number,
}