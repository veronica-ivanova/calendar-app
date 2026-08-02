import {tasks} from "../../../mock.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Task} from "../../../types/types.ts";

type TasksState = {
    ids: string[];
    entities: Record<string, Task>;
}
const initialState: TasksState = {
    entities: tasks.reduce<Record<string, Task>>(
        (acc, task) => {
            acc[task.id] = task;
            return acc;
        },
        {}),
    ids: tasks.map(task => task.id),
}

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            const task = action.payload;

            if (state.entities[task.id]) {
                return;
            }

            state.ids.push(task.id);
            state.entities[task.id] = task;
        },
        removeTask(state, action: PayloadAction<string>) {
            const taskId = action.payload;

            delete state.entities[taskId];

            state.ids = state.ids.filter(id => id !== taskId);
        },
        updateTask(state, action: PayloadAction<Task>) {
            const updatedTask = action.payload;

            if (state.entities[updatedTask.id]) {
                state.entities[updatedTask.id] = updatedTask;
            }
        },
        toggleCompleteTask(state, action: PayloadAction<string>) {
            const task = state.entities[action.payload];

            if (task) {
                task.completed = !task.completed;
            }
        }
    },
    selectors: {
        selectTaskById: (state, id: string) => state.entities[id],
        selectTaskIds: (state) => state.ids,
        selectAllTasks: state => state.ids.map(id => state.entities[id])
    }
})

export const { selectTaskById, selectTaskIds, selectAllTasks } = tasksSlice.selectors;
export const {addTask, removeTask, updateTask, toggleCompleteTask } = tasksSlice.actions;