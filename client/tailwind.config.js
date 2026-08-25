/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFDF6",
        ink: "#2B2A1F",
        chili: "#B5432A",
        turmeric: "#E8A23A",
        muted: "#8A7F63",
      },
    },
  },
  plugins: [],
};
