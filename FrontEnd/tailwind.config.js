/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          dark: {
            900: '#0a192f',
            800: '#0f1e3a', 
            700: '#142849'
          }
        }
      },
    },
    plugins: [],
  }