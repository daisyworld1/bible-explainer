/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './styles/**/*.{css}', // 👈 this picks up globals.css in /styles
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }