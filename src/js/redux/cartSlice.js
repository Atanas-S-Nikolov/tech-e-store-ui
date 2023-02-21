import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeStep: 0,
  products: []
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
      updateProductsReducer: (state, action) => {
        state.products = action.payload;
      },
      resetCartReducer: (state) => {
        state.activeStep = initialState.activeStep;
        state.products = initialState.products;
      },
  }
});

export const { backStepReducer, nextStepReducer, resetCartReducer, updateProductsReducer } = cartSlice.actions;
export default cartSlice.reducer;
