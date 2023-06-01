import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: {}
}

export const quickOrderSlice = createSlice({
    name: "quickOrder",
    initialState,
    reducers: {
      updateQuickOrderReducer: (state, action) => {
        state.order = action.payload;
      },
      resetQuickOrderReducer: (state) => {
        state.order = initialState.order;
      },
  }
});

export const { updateQuickOrderReducer, resetQuickOrderReducer } = quickOrderSlice.actions;
export default quickOrderSlice.reducer;
