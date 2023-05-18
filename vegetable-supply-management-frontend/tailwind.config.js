// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainColor: "#54a83b",
        mainColorLight: "#7be33b",
        secondColor: "#eef0ed",
        linearTopColor: "#78CF49",
        linearBottomColor: "#388700" 
      },
      fontSize: {
        base: '0.875rem'
      }
    },
  },
  plugins: [],
}
