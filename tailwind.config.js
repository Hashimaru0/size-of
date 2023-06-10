/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ui: {
          100: "#52545c",
          200: "#3a3c42",
          300: "#27292e",
          400: "#212226",
          500: "#16171a",
        },
      },
    },
  },
  plugins: [],
};
