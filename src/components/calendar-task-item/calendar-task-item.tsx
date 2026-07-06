import type {Task} from "../../types/types.ts";
type Props = {
    task: Task;
    onComplete: (id: string) => void;
};

export const CalendarTaskItem = ({ task, onComplete }: Props) => {
    return (
        <div>
            <input
                type="checkbox"
                checked={task.completed}
                onClick={(e) => e.stopPropagation()}
                onChange={() => onComplete(task.id)}
            />
            <span>{task.name}</span>
        </div>
    );
};