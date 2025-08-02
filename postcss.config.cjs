const path = require('path');

module.exports = {
  plugins: {
    '@tailwindcss/postcss': {
      // Explicitly point to the Tailwind config file using an absolute path
      config: path.resolve(__dirname, 'tailwind.config.cjs')
    },
    'autoprefixer': {},
  },
}