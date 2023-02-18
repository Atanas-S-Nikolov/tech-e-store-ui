import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: []
}

export const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavoriteProductReducer: (state, action) => {
      state.products.push(action.payload);
    },
    removeFavoriteProductReducer: (state, action) => {
      const productsCopy = [...state.products];
      const index = productsCopy.indexOf(action.payload);
      productsCopy.splice(index, 1);
      state.products = productsCopy;
    }
  }
});

export const { addFavoriteProductReducer, removeFavoriteProductReducer } = favoritesSlice.actions;
export default favoritesSlice.reducer;