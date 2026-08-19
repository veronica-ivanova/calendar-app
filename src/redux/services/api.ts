import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Task, TaskRequest, TasksResponse, TaskVisibility} from "../../types/types.ts";

type UpdateTaskArgs = {
    id: Task["id"];
    changes: TaskRequest
}
type SetTaskCompletedArgs = {
    id: Task["id"];
    completed: boolean
}
type GetTasksArgs = {
    dateFrom: string;
    dateTo: string;
    visibility?: TaskVisibility;
}

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: "https://my.calendar-web.ru/api/"}),
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        getTasks: builder.query<TasksResponse, GetTasksArgs>({
            query: ( {dateFrom, dateTo, visibility}) => ({
                url: "tasks/all",
                params: {
                    dateFrom,
                    dateTo,
                    visibility
                }
            }),
            providesTags: ["Tasks"],
        }),
        getTaskById: builder.query<Task, string>({
            query: (id) => `tasks/${id}`
        }),
        createTask: builder.mutation<Task, TaskRequest>({
            query: (task) => ({
                url: `tasks`,
                body: task,
                method: "POST",
            }),
            invalidatesTags: ["Tasks"]
        }),
        deleteTask: builder.mutation<void, string>({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateTask: builder.mutation<Task, UpdateTaskArgs>({
            query: ({id, changes}) => ({
                url: `tasks/${id}`,
                method: "PUT",
                body: changes
            }),
            invalidatesTags: ["Tasks"]
        }),
        setTaskCompleted: builder.mutation<Task, SetTaskCompletedArgs>({
            query: ({id, completed}) => ({
                url: `/tasks/${id}/completed`,
                method: "PATCH",
                body: { completed }
            }),
            invalidatesTags: ["Tasks"]
        })
    })
})

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useSetTaskCompletedMutation,
} = api;