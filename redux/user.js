import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let user_orders, user_name;

if (typeof window !== "undefined") {
    if(window.localStorage.getItem('user_orders')){
        user_orders = JSON.parse(window.localStorage.getItem('user_orders'));
    }
    if(window.localStorage.getItem('user_name')){
        user_name = window.localStorage.getItem('user_name');
    }
}

const initialState = {
  userToken: '',
  isLoggedIn: false,
  userId: '',
  userName: user_name ? user_name : '',
  orders: user_orders ? user_orders : [],
  signupSuccessMsg: '',
  loginSuccessMsg: '',
}

export const signup = createAsyncThunk("user/signup",
    async (user, { rejectWithValue }) => {
        try{
            const requestToken = await fetch('https://miaryory.com/pulse/wp-json/jwt-auth/v1/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'admin',
                    password: 'C1WW 7EiF B6tE SRxg i9Lw L6I3',
                })
            });

            if(!requestToken.ok){
                return rejectWithValue();
            }
    
            const token = await requestToken.json();

            try{
                const request = await fetch('https://miaryory.com/pulse/wp-json/wp/v2/users',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+token.token,
                    },
                    body: JSON.stringify({
                        first_name: user.firstName,
                        last_name: user.lastName,
                        username: user.email,
                        email: user.email,
                        password: user.password,
                        roles: 'customer'
                    })
                });
    
                if(!request.ok){
                    return rejectWithValue('Sign Up not successful');
                }

                return 'Sign Up successful! Log In to see your account.';
        
            }
            catch(err){
                return rejectWithValue(err.response.data);
            }
        }
        catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);

//when loging in: get authentication token > get user info > get orders for that user
export const login = createAsyncThunk("user/login",
    async (user, { dispatch, rejectWithValue }) => {
        try{
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
    
            if(!request.ok){
                return rejectWithValue('Wrong credentials');
            }

            //return the token - data.token
            const data = await request.json();

            //once user is autenticated > get all info about the user
            try{
                const wpRequest = await fetch('https://miaryory.com/pulse/wp-json/wp/v2/users/me',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+data.token
                    }
                });

                if(!wpRequest.ok){
                    return rejectWithValue();
                }
    
                const wpUser = await wpRequest.json();

                //once we have info about the user > get all orders for this customer with the ID
                try{
                    const orders = dispatch(getOrders(wpUser.id));
                    //console.log(wpUser);
                    const payload = {token: data.token, user: wpUser, orders: (await orders).payload};
                    return payload;
                }
                catch(err){
                    return rejectWithValue(err.response.data);
                }

            }
            catch(err){
                return rejectWithValue(err.response.data);
            }

        }
        catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);

export const getOrders = createAsyncThunk("user/getOrders",
    async (userId, { rejectWithValue }) => {

        try{

            const requestToken = await fetch('https://miaryory.com/pulse/wp-json/jwt-auth/v1/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: 'admin',
                    password: 'C1WW 7EiF B6tE SRxg i9Lw L6I3',
                })
            });

            if(!requestToken.ok){
                return rejectWithValue();
            }
    
            const token = await requestToken.json();

            try{
                //get orders for this customer
                const ordersRequest = await fetch('https://miaryory.com/pulse/wp-json/wc/v2/orders?customer='+userId,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ token.token
                    }
                });
    
                if(!ordersRequest.ok){
                    return rejectWithValue();
                }
                
                const orders = await ordersRequest.json();
                //console.log(orders);
                return orders;
            }
            catch(err){
                return rejectWithValue(err.response.data);
            }
        }
        catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);


// RTK: createSlice combines initialstate, reducer and actions
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
      setUser: (state, action) => {
        state.userToken = action.payload.loggedUserToken;
        state.userId = action.payload.loggedUserId;
        state.isLoggedIn = true;
      },
      setOrders: (state, action) => {
          state.orders = action.payload;
      },
      logout: (state) =>{
          state.userToken = '';
          state.isLoggedIn = false;
          state.userId = '';
          state.userName = '';
          state.orders = [];
          window.localStorage.removeItem('user_token');
          window.localStorage.removeItem('user_id');
          window.localStorage.removeItem('user_orders');
          window.localStorage.removeItem('user_name');
      }
  },
  extraReducers:{
      [signup.fulfilled]: (state, action) =>{
          state.signupSuccessMsg = action.payload;
      },
      [signup.rejected]: (state, action) =>{
          state.isLoggedIn = false;
          state.signupSuccessMsg = action.payload;
      },
      [login.fulfilled]: (state, action) => {
          state.userToken = action.payload.token;
          state.isLoggedIn = true;
          state.userId = action.payload.user.id;
          state.userName = action.payload.user.name;
          state.orders = action.payload.orders;
          window.localStorage.setItem('user_token', action.payload.token);
          window.localStorage.setItem('user_id', action.payload.user.id);
          window.localStorage.setItem('user_name', action.payload.user.name);
          window.localStorage.setItem('user_orders', JSON.stringify(action.payload.orders));
          state.loginSuccessMsg = '';
      },
      [login.rejected]: (state, action) =>{
          state.userToken = '';
          state.isLoggedIn = false;
          state.userId = '';
          state.orders = [];
          state.loginSuccessMsg = action.payload;
      },
      [getOrders.fulfilled]: (state, action) => {
          state.orders = action.payload;
      },
      [getOrders.rejected]: (state) => {
          state.orders = [];
      }
  }
});

// Action creators are generated for each case reducer function
export const { setUser, logout, setOrders } = userSlice.actions;

export default userSlice.reducer;