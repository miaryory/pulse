import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userToken: null,
  loggedInUser: null,
}

// RTK: createSlice combines initialstate, reducer and actions
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //state = initialState
    //this is the action and logic
    login: (state) => {
      state.loggedInUser = true;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions;

export default userSlice.reducer;