import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],  // Items will now include a quantity property
    },
    reducers: {
        addItem: (state, action) => {
            const { id, quantity, price } = action.payload;
            const existingItem = state.items.find(item => item.card.info.id === id);
            
            if (existingItem) {
              existingItem.quantity = quantity; // Update quantity
              existingItem.totalPrice = price * quantity; // Update total price
            } else {
              state.items.push({
                ...action.payload,
                totalPrice: price * quantity // Set total price for new item
              });
            }
          },
          removeItem: (state, action) => {
            const { id } = action.payload;
            state.items = state.items.filter(item => item.card.info.id !== id);
          },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
