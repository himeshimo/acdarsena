/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Noto Sans JP", "system-ui", "sans-serif"],
        display: ["Oswald", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        darsena: {
          navy: "#07111f",
          ink: "#0a1728",
          steel: "#17283a",
          fog: "#9aa7b5",
          red: "#d71920",
          rust: "#a9442f",
          brass: "#d2a45f",
        },
      },
      boxShadow: {
        harbor: "0 18px 45px rgba(0,0,0,.34)",
      },
    },
  },
  plugins: [],
};
