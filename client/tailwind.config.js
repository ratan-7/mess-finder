/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        kraft: "#F2ECDD",
        "kraft-dot": "#DED4B8",
        cream: "#FFFDF6",
        ink: "#2B2A1F",
        muted: "#8A7F63",
        dash: "#D8CFAF",
        "dash-dark": "#B8AD8C",
        chili: "#B5432A",
        turmeric: "#E8A23A",
        rose: "#D4577E",
        banner: "#EBDFC0",
      },
      fontFamily: {
        display: ["'Baloo 2'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
