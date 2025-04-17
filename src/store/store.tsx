// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import UIReducer from './ui/UISlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        ui:UIReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;