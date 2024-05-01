/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#137013",
      secondary: "#ecc94b",
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animated")],
  // plugins: [require("daisyui")],
});
