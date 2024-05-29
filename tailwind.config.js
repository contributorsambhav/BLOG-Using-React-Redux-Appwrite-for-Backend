/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode : 'class',
  mode : 'jit',

   variants: {
      extend: {
        textColor: ['dark', 'hover', 'dark:hover'], // Add dark:hover here
      },
    },
  theme: {
    extend: {},
  },
  plugins: [],
}

