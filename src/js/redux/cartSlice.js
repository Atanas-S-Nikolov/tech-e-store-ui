import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        backStepReducer: (state) => {
          state.activeStep -= 1;
        },
        nextStepReducer: (state) => {
          state.activeStep += 1;
        },
        resetStepReducer: (state) => {
          state.activeStep = 0;
        }
    }
});

export const { backStepReducer, nextStepReducer, resetStepReducer } = cartSlice.actions;
export default cartSlice.reducer;
