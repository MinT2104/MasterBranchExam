/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        title: "#E4F6ED",
        darkOrange: "#F9BE81",
        lightOrange: "#FFE4C8",
        darkBlue: "#0F4C81",
        lightBlue: "#5684AE",
      },
    },
  },
  plugins: [],
};
