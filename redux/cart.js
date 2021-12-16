import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart_key: '',
    item_count: 0,
    items: [],
    subtotal: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        setCart: (state, action) => {
            state.cart_key = action.payload.cart_key;
            state.item_count = action.payload.item_count;
            state.items = action.payload.items;
            state.subtotal = action.payload.totals.subtotal + ' ' +action.payload.currency.currency_symbol;
        },
        clearCart: (state) => {
            state.cart_key= '';
            state.item_count= 0;
            state.items= [];
            state.subtotal= 0;
            window.localStorage.removeItem('cart_key');
        }
    }
});

export const {setCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;

