import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  notification: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        state.notification = {
          type: "error",
          message: "Item is already in the cart!",
          id: action.payload._id,
        };
        return;
      }

      state.cartItems.push({ ...action.payload, quantity: 1 });
      state.notification = {
        type: "success",
        message: "Item added to cart successfully!",
        id: action.payload._id,
      };
    },

    increment(state, action) {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += 1;
      }
    },

    decrement(state, action) {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
    },

    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const {
  addToCart,
  removeItem,
  increment,
  decrement,
  clearNotification,
} = cartSlice.actions;

export default cartSlice.reducer;
