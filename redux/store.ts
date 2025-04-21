import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import commentReducer from './features/commentSlice';

export const store = configureStore({
    reducer: {
        users: userReducer,
        comments: commentReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
