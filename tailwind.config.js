/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {},
  },
  plugins: [],
}
