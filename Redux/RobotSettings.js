// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    state: "Greeting",  // Initial value of `state` property
  },
  reducers: {
    changeState: (state, action) => {
      // Toggle the state between "Talking" and "Greeting"
      state.state = action.payload
    },
  },
});

export const { changeState } = counterSlice.actions;
export default counterSlice.reducer;
