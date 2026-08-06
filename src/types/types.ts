export type TaskVisibility = "private" | "public"
export type TaskVisibilityFilter = "all" | "public";
export type Task = {
    id: string;
    name: string;
    description: string;
    date: string;
    completed: boolean;
    visibility: TaskVisibility
}