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
        }
    }
});

export const {setCart} = cartSlice.actions;

export default cartSlice.reducer;

