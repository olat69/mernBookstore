import { createSlice } from "@reduxjs/toolkit";

// Load cart items from localStorage on initial load
const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: savedCart,
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

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    increment(state, action) {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += 1;
      }
      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    decrement(state, action) {
      const item = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    setCartItems(state, action) {
      // This will be used to set the cart from the backend
      state.cartItems = action.payload;
      // Save to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    clearNotification(state) {
      state.notification = null;
    },

    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem("cartItems"); // Remove cart from localStorage
    },
  },
});

export const {
  addToCart,
  removeItem,
  increment,
  decrement,
  setCartItems,
  clearNotification,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
