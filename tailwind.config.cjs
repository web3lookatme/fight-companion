const path = require('path');

module.exports = {
  content: [
    path.resolve(__dirname, "./index.html"),
    path.resolve(__dirname, "./src/**/*.{js,ts,jsx,tsx}"),
  ],
  theme: {
    extend: {
      colors: {
        'onyx': '#111111',
        'charcoal': '#1D1D1D',
        'gold': '#FFD700',
        'accent-red': '#E50914',
        'light-gray': '#F5F5F5',
        'medium-gray': '#999999',
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'heading': ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
}