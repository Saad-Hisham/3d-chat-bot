// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../Redux/RobotSettings';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
