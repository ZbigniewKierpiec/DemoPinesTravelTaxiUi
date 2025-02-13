/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontSize: {
        tiny: "10px",
        "9xl": "2.2rem",
        "8xl":"1.7rem"
      },

      colors: {
        "custom-red": "#FF5733", // Twój własny czerwony kolor
      },
    },
  },
  plugins: [],
};
