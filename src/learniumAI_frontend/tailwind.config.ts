import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        basic: {
          black: "#010101",
          white: "#FFFFFF",
        },
        gray: {
          light: "#F9F9F9",
          lightMedium: "#C4C4C4",
          normal: "#757575",
        },
        primary: {
          light: "#F1ECFF",
          "light-hover": "#E9E3FF",
          "light-active": "#D2C4FF",
          normal: "#6F41FF",
          "normal-hover": "#6F41FF",
          "normal-active": "#5934CC",
          dark: "#5331BF",
          "dark-hover": "#432799",
          "dark-active": "#321D73",
          darker: "#271759",
          backgorund: "#0C0B27",
        },
        gradientStart: "#2D0066",
        gradientMiddle: "#140B44",
        gradientEnd: "#0C0B27",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
