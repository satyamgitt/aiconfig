import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import profileReducer from './profileSlice';
import houseReducer from './houseSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    house: houseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;