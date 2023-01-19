import { configureStore } from "@reduxjs/toolkit";
import { persistCombineReducers } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage';
import authenticationReducer from "./authenticationSlice";

const persistConfig = {
    key: 'root',
    storage: storage,
};

const persistedReducer = persistCombineReducers(
    persistConfig, 
    {
        authentication: authenticationReducer
    }
); 

export const store = configureStore({
    reducer: persistedReducer
});