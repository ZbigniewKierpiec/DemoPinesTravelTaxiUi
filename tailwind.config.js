/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontSize: {
        tiny: "10px", // Ustaw bardziej realistyczny rozmiar
      },
    },
  },
  plugins: [],
};
