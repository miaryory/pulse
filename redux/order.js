import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const woocommerce = new WooCommerceRestApi({
    url: "https://miaryory.com/pulse/",
    consumerKey: 'ck_5cf4431c368c435e78af69db4420aee290953554',
    consumerSecret: 'cs_8187b3569cf2ed1899a0eb7d261c77a7db21f8c4',
    version: "wc/v3",
    queryStringAuth: true
});

let billing, shipping_lines, line_items, shipping, user_id;

if (typeof window !== "undefined") {
    if(window.localStorage.getItem('user_id')){
        user_id = JSON.parse(window.localStorage.getItem('user_id'));
    }
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
    customer_id: user_id ? user_id : 0,
    payment_method: "card",
    payment_method_title: "Card",
    set_paid: false,
    billing: billing ? billing : {},
    shipping: shipping ? shipping : {},
    line_items: line_items? line_items : [],
    shipping_lines: shipping_lines ? shipping_lines : [{total: '0'}],
};

export const createOrder = createAsyncThunk('order/createOrder',
    async (order, { rejectWithValue }) =>{
        woocommerce.post("orders", order)
        .then((response) => {
            console.log(response.data.id);
            const orderId = response.data.id;
            return orderId;
        })
        .catch((error) => {
            rejectWithValue(error.response.data);
        });
    }
);

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
        },
        clearOrderStored: (state) =>{
            state.billing = {},
            state.shipping = {},
            state.line_items = [],
            state.shipping_lines = [{total: '0'}],
            window.localStorage.removeItem('order.line_items');
            window.localStorage.removeItem('order.billing');
            window.localStorage.removeItem('order.shipping');
            window.localStorage.removeItem('order.shipping_lines');
        }
    },
    extraReducers:{
        [createOrder.rejected]: (state) => {
            console.log('createOrder rejected');
        },
    }
});

export const {setLineItems, setBilling, clearOrderStored} = orderSlice.actions;

export default orderSlice.reducer;