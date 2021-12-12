import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import cartReducer from './cart';
import orderReducer from './order';

export const store = configureStore({
  reducer: {
      user: userReducer,
      cart: cartReducer,
      order: orderReducer,
  },
});