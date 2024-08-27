// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: [],
//     },
//     reducers : {
//         addItem : (state, action) => {
//             state.items.push(action.payload);
//         }, 
//         removeItem : (state) => {
//             state.items.pop();
//         },
//         clearCart : (state) => {
//             // state.items.length = 0;
//             return {items : []};
//         },
//     },
// });

// export const {addItem, removeItem, clearCart} = cartSlice.actions;

// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.card.info.id === action.payload.card.info.id);
            if (itemIndex > -1) {
                state.items.splice(itemIndex, 1);
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
