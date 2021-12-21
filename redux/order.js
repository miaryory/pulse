import { createSlice } from '@reduxjs/toolkit';

let billing, shipping_lines, line_items, shipping;

if (typeof window !== "undefined") {
    if(window.localStorage.getItem('order.billing')){
        billing = JSON.parse(window.localStorage.getItem('order.billing'));
    }
    if(window.localStorage.getItem('order.shipping_lines')){
        shipping_lines = JSON.parse(window.localStorage.getItem('order.shipping_lines'));
    }
    if(window.localStorage.getItem('order.line_items')){
        line_items = JSON.parse(window.localStorage.getItem('order.line_items'));
    }
    if(window.localStorage.getItem('order.shipping')){
        shipping = JSON.parse(window.localStorage.getItem('order.shipping'));
    }
}


const initialState = {
    payment_method: "card",
    payment_method_title: "Card",
    set_paid: false,
    billing: billing ? billing : {},
    shipping: shipping ? shipping : {},
    line_items: line_items? line_items : [],
    shipping_lines: shipping_lines ? shipping_lines : [{total: 0}]
  };

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers:{
        setLineItems: (state, action) => {
            state.line_items = action.payload;
            window.localStorage.setItem('order.line_items', JSON.stringify(action.payload));
        },
        setBilling: (state, action) => {
            state.billing = action.payload.billingInfo;
            state.shipping = action.payload.shippingInfo;
            state.shipping_lines = action.payload.shippingLine;
            window.localStorage.setItem('order.billing', JSON.stringify(action.payload.billingInfo));
            window.localStorage.setItem('order.shipping', JSON.stringify(action.payload.shippingInfo));
            window.localStorage.setItem('order.shipping_lines', JSON.stringify(action.payload.shippingLine));
        }
    }
});

export const {setLineItems, setBilling} = orderSlice.actions;

export default orderSlice.reducer;