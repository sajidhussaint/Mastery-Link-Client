/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#00e600",
      secondary: "#ecc94b",
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animated")],
  // plugins: [require("daisyui")],
});
