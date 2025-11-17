/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        board: {
          'light': '#fef3c7',
          'dark': '#b45309',
          'light-dm': '#d1d5db',
          'dark-dm': '#4b5563',
        }
      }
    },
  },
  plugins: [],
}

