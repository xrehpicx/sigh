/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  content: [
    // "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {},
      backgroundColor: {
        primary: {
          50: "#f5f3fa",
          100: "#e0d8ef",
          200: "#c3b1de",
          300: "#9e81c7",
          400: "#7b57aa",
          500: "#633e8e",
          600: "#4f2f72",
          700: "#42295c",
          800: "#38254a",
          900: "#0a070d",
        },
      },
      colors: (theme) => ({
        primary: {
          50: "#faf5ff",
          100: "#f3e7ff",
          200: "#e9d4ff",
          300: "#d8b2ff",
          400: "#b870ff",
          500: "#a951fb",
          600: "#942eef",
          700: "#7f1ed2",
          800: "#6b1eab",
          900: "#58198a",
        },
        background: {
          50: "#f5f3fa",
          100: "#e0d8ef",
          200: "#c3b1de",
          300: "#9e81c7",
          400: "#7b57aa",
          500: "#633e8e",
          600: "#4f2f72",
          700: "#42295c",
          800: "#38254a",
          900: "#0a070d",
        },
      }),
    },
  },
  plugins: [],
};
