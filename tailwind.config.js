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
        80: "80%",
        90: "90%",
        custom1382: "1382px",
        custom179: "180px",
      },
      maxHeight: {
        50: "50%",
        60: "60%",
        70: "70%",
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
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
