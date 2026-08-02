import type {Task} from "../../types/types.ts";
import {CalendarTaskItem} from "../calendar-task-item/calendar-task-item.tsx";


type Props = {
    tasks: Task[];
}

export const CalendarTaskList = ({ tasks }: Props) => {
    if (tasks.length === 0) return null;

    return (
        <div>
            {tasks.map(task => (
                <CalendarTaskItem
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
}