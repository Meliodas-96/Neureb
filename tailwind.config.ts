import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clinical: {
          bg: "#030712", // obsidian deep dark
          card: "rgba(15, 23, 42, 0.75)",
          border: "rgba(51, 65, 85, 0.5)",
          cyan: "#06b6d4",
          blue: "#3b82f6",
          red: "#ef4444",
          artery: "#f43f5e",
          vein: "#0284c7",
          nerve: "#fef08a",
          brain: "#fbcfe8",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ping-slow": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "radar": "radar 2s linear infinite",
      },
      keyframes: {
        radar: {
          "0%": { transform: "scale(0.8)", opacity: "0.9" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
