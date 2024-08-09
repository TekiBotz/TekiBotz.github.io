import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from './slices/authSlice';

/*
Configure and create the Redux store
*/
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,  // Reducer for managing API-related state
        auth: authSliceReducer,  // Reducer for managing authentication state
    },
    // Middleware configuration to include API slice middleware
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,  // Enable Redux DevTools for debugging
});

export default store;