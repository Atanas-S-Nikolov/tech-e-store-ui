import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartResponse: {}
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      updateCartReducer: (state, action) => {
        state.cartResponse = action.payload;
      },
      resetCartReducer: (state) => {
        state.cartResponse = initialState.cartResponse;
      },
  }
});

export const { updateCartReducer, resetCartReducer } = cartSlice.actions;
export default cartSlice.reducer;
