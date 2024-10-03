/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#237DF7',
        backgrd:'#F5F6FA'
      },
      scrollbar: {
        thin: '2px', // Width of the scrollbar
        thumb: '#888', // Thumb color
        track: '#f1f1f1', // Track color
      },
    },
  },
  variants: {
    scrollbar: ['rounded'], // Add this to use the rounded option
  },
  
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

