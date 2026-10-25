import {
    type BaseQueryApi,
    type BaseQueryFn,
    type FetchArgs,
    fetchBaseQuery,
    type FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import {clearSession, setAccessToken} from "../features/auth/authSlice.ts";
import type {LoginResponse} from "../../types/types.ts";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://my.calendar-web.ru/api/",
    credentials: "include",

    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;

        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

const requestRefresh = async (queryApi: BaseQueryApi) => {
    const result = await baseQuery(
        {
            url: "auth/refresh",
            method: "POST",
        },
        queryApi,
        {}
    )
    if (result.error) {
        if (result.error.status === 401) {
            queryApi.dispatch(clearSession());
        }
        return result;
    }

    //Сохраняем новый access token
    const data = result.data as LoginResponse;
    queryApi.dispatch(setAccessToken(data.accessToken));

    return result
}

// Promise выполняющегося refresh-запроса.
let refreshPromise: ReturnType<typeof requestRefresh> | null = null;

// Возвращает существующий запрос или запускает новый.
export const refreshSession = (queryApi: BaseQueryApi) => {
    if (!refreshPromise) {
        refreshPromise = requestRefresh(queryApi).finally(() => {
            refreshPromise = null;
        });
    }
    return refreshPromise;
}

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, queryApi, extraOptions) => {

    // токен, с которым отправляем запрос.
    const tokenBeforeRequest = (queryApi.getState() as RootState).auth.accessToken;

    let result = await baseQuery(
        args,
        queryApi,
        extraOptions
    );

    // Для этих endpoints автоматический refresh не нужен.
    const isAuthEndpoint = [
        "login",
        "register",
        "logout",
        "refresh",
    ].includes(queryApi.endpoint);

    //Если не 401 - возвращаем результат
    if (result.error?.status !== 401 || isAuthEndpoint) {
        return result
    }

    // Пока мы ждали ответ, другой запрос мог обновить токен.
    const currentToken =
        (queryApi.getState() as RootState).auth.accessToken;

    if (!currentToken) {
        return result;
    }

    // Токен не изменился — нужно его обновить.
    if (currentToken === tokenBeforeRequest) {
        //Если 401 - обновляем access token
        //Refresh-cookie браузер отправит автоматически
        const refreshResult = await refreshSession(queryApi);
        if (refreshResult.error) {
            return { error: refreshResult.error };
        }
    }

    //Повторяем исходный запрос
    result = await baseQuery(
        args,
        queryApi,
        extraOptions
    );
    if (result.error?.status === 401) {
        queryApi.dispatch(clearSession());
    }
    return result
}