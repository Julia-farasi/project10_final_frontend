// tailwind.config.js
export default {
  // tailwind.config.js
  theme: {
    extend: {
      colors: {
        primary: "#28713E",
        lightgreen: "#D3EFDE",
        midgreen: "#B1CBA6",
        darkgreen: "#3F5A36",
      },
    },
  },

  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: "#f5f5dc",
          dark: "#e5e5c4",
        },
        emerald: {
          500: "#10b981",
          600: "#059669",
        },
      },
    },
  },
  plugins: [],
};
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 0.5s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
