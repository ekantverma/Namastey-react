import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.card.info.id === action.payload.card.info.id);
            if (itemIndex > -1) {
                // Item already in cart, increment the quantity
                state.items[itemIndex].quantity += 1;
            } else {
                // Item not in cart, add it with quantity 1
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.card.info.id === action.payload.card.info.id);
            if (itemIndex > -1) {
                if (state.items[itemIndex].quantity > 1) {
                    // If quantity is more than 1, decrement the quantity
                    state.items[itemIndex].quantity -= 1;
                } else {
                    // Remove item if quantity is 1
                    state.items.splice(itemIndex, 1);
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;


