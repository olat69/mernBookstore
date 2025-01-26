export const getBaseUrl = () => {
  if (window.location.hostname !== "localhost") {
    return "https://mern-bookstore-khaki.vercel.app";
  } else {
    return "http://localhost:5000";
  }
};
