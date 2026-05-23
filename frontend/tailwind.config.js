/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        quest: {
          deep: "#10316b",
          ocean: "#0f7990",
          sun: "#ffd166",
          violet: "#8f7cff",
          sky: "#d9f3ff",
          foam: "#effbff",
        },
      },
      boxShadow: {
        glow: "0 20px 60px rgba(15, 121, 144, 0.18)",
      },
      fontFamily: {
        display: ["Trebuchet MS", "Verdana", "sans-serif"],
        body: ["Nunito", "Trebuchet MS", "Verdana", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-5px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        floaty: "floaty 4s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
