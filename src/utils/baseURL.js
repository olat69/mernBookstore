export const getBaseUrl = () => {
  if (process.env.NODE_ENV === "production") {
    // If in production environment, use the production URL (Vercel)
    return "https://mern-bookstore-khaki.vercel.app"; // Replace with your actual production URL
  } else {
    // If in development environment, use the local server
    return "http://localhost:5000";
  }
};
