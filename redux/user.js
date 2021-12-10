import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  jwtToken: '',
  user: null,
  isLoggedIn: false,
}

export const signup = createAsyncThunk("user/signup",
    async (email) =>{
        try{
            const request = await fetch('https://api.chec.io/v1/customers',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': 'sk_367064858fb2939a71856823f7cbeb5322ef250531792',
                },
                body: JSON.stringify({
                    email: email,
                })
            });

            if(request.ok){
                const user = await request.json();
                try{
                    const request = await fetch('https://api.chec.io/v1/customers/'+user.id+'/issue-token',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-Authorization': 'sk_367064858fb2939a71856823f7cbeb5322ef250531792',
                        },
                    });
        
                    const token = await request.json();
                    return {user: user, token: token};
                }
                catch(error){
                    console.log(error);
                }
            }
        }
        catch(error){
            console.log(error);
        }
    }
);

export const login = createAsyncThunk("user/login",
    async (email) =>{
        
    }
);


// RTK: createSlice combines initialstate, reducer and actions
export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers:{
      [signup.fulfilled]: (state, action) =>{
          state.jwtToken = action.payload.token.jwt;
          state.user = action.payload.user;
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