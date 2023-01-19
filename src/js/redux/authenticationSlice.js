import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    role: "",
    accessToken: "",
    refreshToken: "",
    isLoggedIn: false
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
            state.isLoggedIn = true;
        },
        logoutReducer: (state) => {
            state.username = initialState.username;
            state.role = initialState.role;
            state.accessToken = initialState.accessToken;
            state.refreshToken = initialState.refreshToken;
            state.isLoggedIn = initialState.isLoggedIn;
        }
    }
});

export const { loginReducer, logoutReducer } = authenticationSlice.actions;
export default authenticationSlice.reducer;
