import {useState} from "react";
import type {Task} from "../types/types.ts";
import {tasks as mockTasks} from "../mock.ts";


export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const addTask = (task: Task) => {
        setTasks(prev => [...prev, task]);
    };

    const removeTask = (taskId: string) => {
        setTasks(prev =>
            prev.filter(task => task.id !== taskId)
        );
    };

    const updateTask = (updatedTask: Task) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === updatedTask.id
                    ? updatedTask
                    : task
            )
        );
    }
    const toggleCompleteTask = (taskId: string) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === taskId
                    ? {
                        ...task,
                        completed: !task.completed,
                    }
                    : task
            )
        );
    }

    return {
        tasks,
        addTask,
        removeTask,
        updateTask,
        toggleCompleteTask,
    };
}