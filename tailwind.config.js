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
      
    },
  },
  plugins: [],
};
