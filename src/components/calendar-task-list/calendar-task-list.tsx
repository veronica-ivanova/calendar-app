import type {Task} from "../../types/types.ts";
import {CalendarTaskItem} from "../calendar-task-item/calendar-task-item.tsx";


type Props = {
    tasks: Task[];
    onComplete: (id: string) => void;
}

export const CalendarTaskList = ({ tasks, onComplete }: Props) => {
    if (tasks.length === 0) return null;

    return (
        <div>
            {tasks.map(task => (
                <CalendarTaskItem
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                />
            ))}
        </div>
    );
}