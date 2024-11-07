/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Add Roboto font
      },
      screens: {
        // Custom breakpoints
        'sm': '640px',
        'md': '768px',
        'lg': '990px',
      },
    },
  },
  plugins: [],
}
