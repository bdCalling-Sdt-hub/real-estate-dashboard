/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#0052B4",
      black: "#131D27",
      white: "#fff",
      gray: "#575858",
    },
    fontSize: {
      40: "3rem",
      32: "1.875rem",
      24: "1.5rem",
      30: "1.875rem",
      20: "1.25rem",
      16: "1rem",
      18: "1.125rem",
    },
    fontWeight: {
      500: 500,
      600: 600,
      700: 700,
      800: 800,
    },
    // spacing: {
    //   24: "1.5rem",
    //   // 24: "6rem",
    //   30: "7.5rem",
    // },
    extend: {},
  },
  plugins: [],
};
