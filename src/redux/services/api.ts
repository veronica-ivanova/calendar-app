import { createApi } from "@reduxjs/toolkit/query/react";
import type {
    LoginRequest, LoginResponse, RegisterRequest,
    SearchTasksResponse,
    Task,
    TaskRequest,
    TasksResponse,
    TaskVisibilityFilter, User
} from "../../types/types.ts";
import {baseQueryWithReauth, refreshSession} from "./baseQuery.ts";

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
    visibility?: TaskVisibilityFilter;
}
type SearchTasksArgs = {
    filter: string;
    size: number;
}

export const api = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        getTasks: builder.query<TasksResponse, GetTasksArgs>({
            query: ( {dateFrom, dateTo, visibility}) => ({
                url: "tasks/all",
                params: {
                    dateFrom,
                    dateTo,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    visibility: visibility === "ALL" ? undefined : visibility
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
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (body) => ({
                url: "auth/login",
                method: "POST",
                body,
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "auth/logout",
                method: "POST",
            }),
        }),
        getMe: builder.query<User, void>({
            query: () => "auth/me",
        }),
        register: builder.mutation<void, RegisterRequest>({
            query: (body) => ({
                url: "register",
                method: "POST",
                body,
            }),
        }),
        refresh: builder.query<null, void>({
            async queryFn(_, queryApi) {
                const result = await refreshSession(queryApi);
                 if (result.error) {
                     return { error: result.error };
                 }
                 return { data: null}
            }
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
    useSearchTasksInfiniteQuery,
    useLoginMutation,
    useRegisterMutation,
    useRefreshQuery,
    useGetMeQuery,
    useLogoutMutation
} = api;