import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseUrl } from "../../../utils/baseURL"; // You can adjust this if needed

const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/cart`, // Assuming your backend API for cart is under /api/cart
    credentials: "include", // For handling cookies/sessions if needed
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // Endpoint to fetch cart by userId
    getCartByUserId: builder.query({
      query: (userId) => ({
        url: `/${userId}`, // Assuming your backend uses userId as a path parameter
      }),
      providesTags: ["Cart"], // Tag to manage cache invalidation or refetching
    }),

    // Endpoint to save or update the cart
    saveCart: builder.mutation({
      query: ({ userId, cartItems }) => ({
        url: "/",
        method: "POST",
        body: { userId, cartItems }, // Send userId and cartItems to save
        credentials: "include", // Optional, if using sessions/cookies
      }),
      // Invalidate cache for Cart when saving data
      invalidatesTags: ["Cart"],
    }),
  }),
});

// Export hooks to use in your components
export const { useGetCartByUserIdQuery, useSaveCartMutation } = cartApi;

export default cartApi;
