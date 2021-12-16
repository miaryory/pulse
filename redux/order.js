import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payment_method: "stripe",
    payment_method_title: "Stripe",
    set_paid: false,
    billing: {},
    shipping: {},
    line_items: [],
    shipping_lines: []
  };

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        setLineItems: (state, action) => {
            state.line_items = action.payload;
        },
        setBilling: (state, action) => {
            state.billing = action.payload.billingInfo;
            state.shipping = action.payload.shippingInfo;
            state.shipping_lines = action.payload.shippingLine;
        }
    }
});

export const {setLineItems, setBilling} = orderSlice.actions;

export default orderSlice.reducer;