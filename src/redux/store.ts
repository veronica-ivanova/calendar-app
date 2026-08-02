import {configureStore} from "@reduxjs/toolkit";
import {tasksSlice} from "./entities/tasks/tasksSlice.ts";

export const store = configureStore({
    reducer: {
        [tasksSlice.name] : tasksSlice.reducer,
    }
});