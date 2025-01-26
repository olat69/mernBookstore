export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://mern-bookstore-khaki.vercel.app"; // Replace with your actual production URL
  } else {
    // If in development environment, use the local server
    return "http://localhost:5000";
  }
};
