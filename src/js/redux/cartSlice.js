import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
  productsCount: 0
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
        },
        updateProductsCountReducer: (state, action) => {
          state.productsCount = action.payload;
        }
    }
});

export const { backStepReducer, nextStepReducer, resetStepReducer, updateProductsCountReducer } = cartSlice.actions;
export default cartSlice.reducer;
