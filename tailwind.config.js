/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EEDC5B",
        secondary: "#0D0842",
        blackbg: "#F3F3F3",
      },
      fontFamily: {
        primary: ["Montserrat", "sans -serif"],
        secondary: ["Nunito Sans", "sans - serif"],
      },
    },
  },
  plugins: [],
};
