import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#080b14",
          900: "#0d1220",
          800: "#141b2d",
          700: "#1d2740",
          600: "#2a3550",
        },
        accent: {
          400: "#4cc9f0",
          500: "#2fb3e0",
          600: "#1d8fbd",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
