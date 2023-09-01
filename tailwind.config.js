/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFD15B",
        second:"#7A7A7A",
      },

      fontFamily: {
        anton: ["Anton", "sans-serif"],
        Manrope: ["Manrope"],
      },
      backgroundImage: {
        header: "url('./assets/images/header.jpg')",
      },
    },
  },
  plugins: [],
};
