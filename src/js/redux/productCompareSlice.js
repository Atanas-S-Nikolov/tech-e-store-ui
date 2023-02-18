import { createSlice } from "@reduxjs/toolkit";

import ProductCompareError from "../errors/ProductCompareError";

const initialState = {
  products: []
}

export const productCompareSlice = createSlice({
    name: "productCompare",
    initialState,
    reducers: {
        addProductReducer: (state, action) => {
          const payload = action.payload;
          if (state.products.length === 3) {
            throw new ProductCompareError("Cannot compare more than 3 products! Remove some of the other products to add new.");
          } else if (state.products.some(product => product.name === payload.name)) {
            throw new ProductCompareError("This product is already added!");
          }
          state.products.push(payload);
        },
        removeProductReducer: (state, action) => {
          const productsCopy = [...state.products];
          const index = action.payload;
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
