/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx,scss}", // Ensure this includes SCSS files
  ],
  theme: {
    extend: {
      fontSize: {
        tiny: "10px",
        "9xl": "2.2rem",
        "8xl": "1.7rem",
        "11xl": "12rem",
      },

      animation: {
        "shadow-pulse": "shadow-pulse 1.5s ease-in-out infinite", // Define the animation
      },
      keyframes: {
        "shadow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }, // No shadow at start and end
          "50%": { boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }, // Shadow appears in the middle
        },
      },
    },
  },
  plugins: [],
};
