import {tasks as mockTasks} from "../../../mock.ts";
import {createEntityAdapter, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Task} from "../../../types/types.ts";

const tasksAdapter = createEntityAdapter<Task>()

const initialState = tasksAdapter.setAll(
    tasksAdapter.getInitialState(),
    mockTasks,
)

export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: tasksAdapter.addOne,
        removeTask: tasksAdapter.removeOne,
        updateTask: tasksAdapter.updateOne,
        toggleCompleteTask(state, action: PayloadAction<string>) {
            const task = state.entities[action.payload];

            if (task) {
                task.completed = !task.completed;
            }
        }
    },
    selectors: {
        ...tasksAdapter.getSelectors()
    }
})

export const {
    selectById: selectTaskById,
    selectIds: selectTaskIds,
    selectAll: selectAllTasks,
} = tasksSlice.selectors;

export const {
    addTask,
    removeTask,
    updateTask,
    toggleCompleteTask
} = tasksSlice.actions;