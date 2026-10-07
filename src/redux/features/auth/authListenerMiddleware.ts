import {createListenerMiddleware} from "@reduxjs/toolkit";
import {clearSession} from "./authSlice.ts";
import {api} from "../../services/api.ts";

export const authListenerMiddleware = createListenerMiddleware();

authListenerMiddleware.startListening({
    actionCreator: clearSession,
    effect: (_, listenerApi) => {
        listenerApi.dispatch(api.util.resetApiState())
    }
})