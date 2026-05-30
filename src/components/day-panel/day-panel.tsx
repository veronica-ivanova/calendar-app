import type {Task} from "../../types/types.ts";
import {TaskList} from "../task-list/task-list.tsx";
import {TaskCreateForm} from "../task-create-form/task-create-form.tsx";

type Props = {
    selectedDate: string;
    tasks: Task[];
    addTask: (task: Task) => void,
    removeTask: (id: string) => void;
    isCreateTaskOpen: boolean;
    onAddTask: () => void;
    onClose: () => void;
}

export const DayPanel = ({
    selectedDate,
    tasks,
    addTask,
    removeTask,
    isCreateTaskOpen,
    onAddTask,
    onClose
} : Props) => {

    return (
        <div>
            <h2>{selectedDate}</h2>

            {!isCreateTaskOpen &&
                <button onClick={onAddTask}>
                    + Add Task
                </button>}

            {isCreateTaskOpen &&
                <TaskCreateForm
                    selectedDate={selectedDate}
                    addTask={addTask}
                    onClose={onClose}/>
            }
            <TaskList
                tasks={tasks}
                onDelete={removeTask}
            />
        </div>
    )
}