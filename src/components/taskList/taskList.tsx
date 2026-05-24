import {TaskItem} from "../taskItem/taskItem.tsx";
import type {Task} from "../../types/types.ts";

type Props = {
    tasks: Task[];
    onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, onDelete }: Props) => {
    if (tasks.length === 0) return null;

    return (
        <div>
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};