import type {Task} from "../../types/types.ts";
import {TaskList} from "../task-list/task-list.tsx";

type Props = {
    selectedDate: string;
    tasks: Task[];
    removeTask: (id: string) => void;
}

export const DayPanel = ({
    selectedDate,
    tasks,
    removeTask,
} : Props) => {


    return (
        <div>
            <h2>{selectedDate}</h2>
            <TaskList
            tasks={tasks}
            onDelete={removeTask}/>
        </div>
    )
}