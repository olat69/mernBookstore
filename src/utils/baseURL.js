export const getBaseUrl = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:5000";
  } else {
    return "https://mern-bookstore-backend-pearl.vercel.app";
  }
};
