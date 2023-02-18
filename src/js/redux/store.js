import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import authenticationReducer from "./authenticationSlice";
import cartReducer from "./cartSlice";
import productCompareReducer from "./productCompareSlice";
import favoritesReducer from "./favoritesSlice";

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistCombineReducers(
    persistConfig, 
    {
        authentication: authenticationReducer,
        cart: cartReducer,
        productCompare: productCompareReducer,
        favorites: favoritesReducer
    }
); 

export const store = configureStore({
    reducer: persistedReducer
});