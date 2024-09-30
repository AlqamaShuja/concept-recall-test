import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import metricsReducer from './slice/metricsSlice';
import postSlice from './slice/postSlice';

export const store = configureStore({
  reducer: {
    metrics: metricsReducer,
    users: userReducer,
    posts: postSlice,
  },
});
