import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: []
}

export const productCompareSlice = createSlice({
    name: "productCompare",
    initialState,
    reducers: {
        addProductReducer: (state, action) => {
          if (state.products.length === 3) {
            throw new Error("Cannot compare more than 3 products! Remove some of other products to add new.");
          }
          state.products.push(action.payload);
        },
        removeProductReducer: (state, action) => {
          const productsCopy = [...state.products];
          const index = productsCopy.indexOf(action.payload);
          productsCopy.splice(index, 1);
          state.products = productsCopy;
        },
        resetCompareStateReducer: (state) => {
          state.products = initialState.products;
        }
    }
});

export const { addProductReducer, removeProductReducer, resetCompareStateReducer } = productCompareSlice.actions;
export default productCompareSlice.reducer;
