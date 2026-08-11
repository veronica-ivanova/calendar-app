import {configureStore} from "@reduxjs/toolkit";
import {tasksSlice} from "./entities/tasks/tasksSlice.ts";
import {api} from "./services/api.ts";

export const store = configureStore({
    reducer: {
        [tasksSlice.name] : tasksSlice.reducer,
        [api.reducerPath] : api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});