import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoggedIn: false,
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
        }
    }
);


// RTK: createSlice combines initialstate, reducer and actions
export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers:{
      [signup.fulfilled]: (state, action) =>{
          //state.user = action.payload.id;
          //window.localStorage.setItem('userId', action.payload.user.id);
          //window.localStorage.setItem('jwtToken', action.payload.token.jwt);
      },
      [signup.rejected]: (state) =>{
          state.isLoggedIn = false;
      },
  }
});

// Action creators are generated for each case reducer function
//export const { login } = userSlice.actions;

export default userSlice.reducer;