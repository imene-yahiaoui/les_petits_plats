/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#FFD15B', // Ajoutez votre couleur primaire personnalisée
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
      },
    },
  },
  plugins: [],
};
