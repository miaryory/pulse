import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    payment_method: "",
    payment_method_title: "",
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
        },
        setPayment: (state, action) => {
            state.payment_method = action.payload.paymentMethod;
            state.payment_method_title = action.payload.paymentTitle;
        }
    }
});

export const {setLineItems, setBilling, setPayment} = orderSlice.actions;

export default orderSlice.reducer;