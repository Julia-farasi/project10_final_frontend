// tailwind.config.js
export default {
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
