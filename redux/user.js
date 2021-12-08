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
    signup: async (state, action) => {
        const request = await fetch('https://api.chec.io/v1/customers',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': 'sk_367064858fb2939a71856823f7cbeb5322ef250531792',
            },
            body: JSON.stringify({
                email: 'miary.mahandry@gmail.com'
            })
        });

        const data = await request.json();
    },
    login: (state) => {
      state.loggedInUser = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signup, login } = userSlice.actions;

export default userSlice.reducer;