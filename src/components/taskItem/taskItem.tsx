import type {Task} from "../../types/types.ts";

type Props = {
    task: Task;
    onDelete: (id: string) => void;
};
export const TaskItem = ({task, onDelete} : Props) => {
    return (
        <div>
            <span>{task.name}</span>
            <button onClick={()=> onDelete(task.id)}>
                Remove
            </button>
        </div>
    )
};