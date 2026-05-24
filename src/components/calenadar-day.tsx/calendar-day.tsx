import classNames from 'classnames'
import styles from './calendar-day.module.css'
import type {Task} from "../../types/types.ts";
import {useState} from "react";
import { getDateKey} from "../../utils/date.ts";
import {TaskList} from "../taskList/taskList.tsx";

type Props = {
    date: Date
    tasks: Task[];
    isCurrentDay: boolean,
    addTask: (task: Task) => void,
    removeTask: (taskId: string) => void;
}

export const CalendarDay = ({ date, tasks, isCurrentDay, addTask, removeTask} : Props) => {
    const [newTask, setNewTask] = useState("");

    function handleAddTask() {
        if (!newTask.trim() || !date) return;

        addTask({
            id: crypto.randomUUID(),
            name: newTask,
            description: newTask,
            date: getDateKey(date),
        });

        setNewTask("");
    }

     return (
        <div className={classNames(styles.root, {
            [styles.active]: isCurrentDay
        })}>
            <div>{date.getDate()}</div>

            <TaskList
                tasks={tasks}
                onDelete={removeTask}
            />

            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter a task..."
            />

            <button onClick={handleAddTask}>
                Add
            </button>
        </div>
     )
}