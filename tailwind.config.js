/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
// tailwind.config.js
theme: {
  extend: {
    colors: {
      tower: {
        pink: "#ff3c7e",
        yellow: "#facc15",
        teal: "#4fd1c5",
        purple: "#a78bfa",
        brick: "#b83232",
        black: "#1a1a1a",
        cream: "#fef9c3",
      },
    },
  },
},
  plugins: [],
}
