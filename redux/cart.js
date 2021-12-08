import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    total_items: 0,
    total_unique_items: 0,
    line_items: [],
    subtotal: 0,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        setCart: (state, action) => {
            state.total_items = action.payload.total_items;
            state.total_unique_items = action.payload.total_unique_items;
            state.line_items = action.payload.line_items;
            state.subtotal = action.payload.subtotal;
        }
    }
});

export const {setCart} = cartSlice.actions;

export default cartSlice.reducer;

