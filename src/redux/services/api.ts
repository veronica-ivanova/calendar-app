import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {SearchTasksResponse, Task, TaskRequest, TasksResponse, TaskVisibility} from "../../types/types.ts";

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
type SearchTasksArgs = {
    filter: string;
    size: number;
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
        }),
        searchTasks: builder.infiniteQuery<
            SearchTasksResponse, // ответ одной страницы
            SearchTasksArgs, // параметры поиска
            number // тип pageNumber
        >({
            infiniteQueryOptions: {
                // Сервер начинает пагинацию с нулевой страницы.
                initialPageParam: 0,
                // Вызывается после загрузки каждой страницы.
                getNextPageParam: (
                    lastPage,
                    _allPages,
                    lastPageNumber
                ) => {
                    if (lastPage.isLast) {
                        return undefined
                    }
                    return lastPageNumber + 1;
                },
            },

            query: ({
                queryArg: { filter, size },
                pageParam
            }) => ({
                url: "tasks",
                params: {
                    filter,
                    pageNumber: pageParam,
                    size,
                }
            }),
            providesTags: ["Tasks"],
        }),
    })
})

export const {
    useGetTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useSetTaskCompletedMutation,
    useSearchTasksInfiniteQuery
} = api;