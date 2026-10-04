import {createSlice} from "@reduxjs/toolkit";

type AuthState = {
    accessToken: string | null;
    status: "checking" | "authenticated" | "anonymous";
}
const initialState: AuthState = {
    accessToken: null,
    status: "checking",
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
            state.status = "authenticated"
        },
        clearSession: (state) => {
            state.accessToken = null;
            state.status = "anonymous";
        },
    }
})

export const { setAccessToken, clearSession } = authSlice.actions;
export default authSlice.reducer;