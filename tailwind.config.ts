import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx,mdx}"],
  theme: {
    fontFamily: {
      mono: "var(--mono, monospace)",
    },
    colors: {
      "p-color": "#FFD",
      "s-color": "#FFA",
      "a-color": "#ff7d3c",
      "ah-color": "#ffa900",
      "t-color": "#101010",
      "l-color": "#692cb6",
      "lh-color": "#a034a9",
      "bt-color": "#CF418E",
      "lbt-color": "#F2596A",
      "b-color": "#2727af",
    },
    keyframes: {
      fadeIn: {
        "0%": {
          mask: "linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 150% 0 / 400% no-repeat",
          opacity: ".2",
        },
        "100%": {
          mask: "linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) 0 / 400% no-repeat",
          opacity: "1",
        },
      },
      hardFadeIn: {
        "0%": { opacity: "0", filter: "brightness(1)" },
        "10%": { opacity: "1", filter: "brightness(1.1)" },
        "100%": { opacity: "1", filter: "brightness(1)" },
      },
      smoothFadeIn: {
        "0%": {
          opacity: "0",
          clipPath: "inset(5%)",
          transform: "scale(111.11%)",
        },
        "100%": { opacity: "1", clipPath: "inset(0)", transform: "scale(1)" },
      },
    },
    animation: {
      "fade-in": "fadeIn 1s ease-in-out",
      "hard-fade-in": "hardFadeIn 1s ease-in-out",
      "smooth-fade-in": "smoothFadeIn 1s ease-in-out",
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
