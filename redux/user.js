import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  userToken: '',
  isLoggedIn: false,
  userId: '',
  userName: '',
}

export const signup = createAsyncThunk("user/signup",
    async (user) =>{
            const request = await fetch('https://miaryory.com/pulse/wp-json/wp/v2/users',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbWlhcnlvcnkuY29tXC9wdWxzZSIsImlhdCI6MTYzOTE0NTIzMCwibmJmIjoxNjM5MTQ1MjMwLCJleHAiOjE2Mzk3NTAwMzAsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19._IwPrTqWttevHhaBJ4BXBJo8nzday-_uVM8OFdj7Cq0=',
                },
                body: JSON.stringify({
                    username: user.email,
                    email: user.email,
                    password: user.password,
                    roles: 'customer'
                })
            });

            if(request.ok){
                const data = await request.json();
                console.log(data);
            }
    }
);

export const login = createAsyncThunk("user/login",
    async (user) =>{
        const request = await fetch('https://miaryory.com/pulse/wp-json/jwt-auth/v1/token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user.email,
                password: user.password,
            })
        });

        if(request.ok){
            //return the token - data.token
            const data = await request.json();
            console.log(data);

            const wpRequest = await fetch('https://miaryory.com/pulse/wp-json/wp/v2/users/me',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+data.token
                }
            });

            const wpUser = await wpRequest.json();
            console.log(wpUser);

            const payload = {token: data.token, user: wpUser};
            return payload;
        }
    }
);


// RTK: createSlice combines initialstate, reducer and actions
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
      setUser: (state, action) => {
        state.userToken = action.payload;
        state.isLoggedIn = true;
      },
      logout: (state) =>{
          state.userToken = '';
          state.isLoggedIn = false;
          state.userId = '';
          window.localStorage.removeItem('user_token');
          window.localStorage.removeItem('cart_key');
      }
  },
  extraReducers:{
      [signup.fulfilled]: (state, action) =>{
          //state.user = action.payload.id;
      },
      [signup.rejected]: (state) =>{
          state.isLoggedIn = false;
      },
      [login.fulfilled]: (state, action) =>{
          state.userToken = action.payload.token;
          state.isLoggedIn = true;
          state.userId = action.payload.user.id;
          window.localStorage.setItem('user_token', action.payload.token);
      },
      [login.rejected]: (state) =>{
          state.isLoggedIn = false;
      }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;