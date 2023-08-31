/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFD15B",
      },

      fontFamily: {
        anton: ["Anton", "sans-serif"],
      },
      backgroundImage: {
        header: "url('./assets/images/header.jpg')",
      },
    },
  },
  plugins: [],
};
