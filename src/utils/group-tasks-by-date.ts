import type {Task} from "../types/types.ts";
import {getDateKey} from "./date.ts";

export const groupTasksByDate = (
    tasks: Task[]
) : Record<string, Task[]> => {
    const tasksByDate = tasks.reduce<Record<string, Task[]>>(
        (acc, task) => {
        const key = getDateKey(new Date(task.date));

        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(task);
        return acc;
    }, {})

    Object.values(tasksByDate).forEach((tasks) => {
        tasks.sort((a, b) => a.date.localeCompare(b.date));
    })

    return tasksByDate
}