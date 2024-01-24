/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    // "./node_modules/tw-elements/dist/js/**/*.js",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'

  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    require('flowbite/plugin'),
    // require("tw-elements/dist/plugin.cjs")

  ],
}