import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    role: "",
    accessToken: "",
    refreshToken: "",
    isAuthenticated: false
}

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            const payload = action.payload;
            state.username = payload.username;
            state.role = payload.role;
            state.accessToken = payload.accessToken;
            state.refreshToken = payload.refreshToken;
            state.isAuthenticated = true;
        },
        logoutReducer: (state) => {
            state.username = initialState.username;
            state.role = initialState.role;
            state.accessToken = initialState.accessToken;
            state.refreshToken = initialState.refreshToken;
            state.isAuthenticated = initialState.isAuthenticated;
        },
        refreshTokenReducer: (state, action) => {
            const payload = action.payload;
            state.accessToken = payload.accessToken;
        }
    }
});

export const { loginReducer, logoutReducer, refreshTokenReducer } = authenticationSlice.actions;
export default authenticationSlice.reducer;
