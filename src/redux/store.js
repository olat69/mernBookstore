import { configureStore } from "@reduxjs/toolkit";
import booksApi from "./features/book/booksApi";
import cartReducer from "./features/cart/cartSlice";
import ordersApi from "./features/orders/ordersApi";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware, ordersApi.middleware),
});

export default store;
