/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      maxWidth: {
        50: "50%",
        60: "60%",
        70: "70%",
        75: "75%",
        80: "80%",
        90: "90%",
        custom179: "180px",
      },
      maxHeight: {
        50: "50%",
        60: "60%",
        70: "70%",
        75: "75%",
        80: "80%",
        90: "90%",
        custom180: "180px",
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      screens: {
        360: "360px",
        xs: "430px",
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
