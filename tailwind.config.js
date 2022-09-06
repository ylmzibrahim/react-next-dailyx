const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
    fontFamily: {
      shadowsintolight: ["SHADOWS_INTO_LIGHT", "cursive"],
      ...defaultTheme.fontFamily,
    },
    screens: {
      xs: { max: "1024px" },
      "2xs": { max: "600px" },
      "3xs": { max: "500px" },
      ...defaultTheme.screens,
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
