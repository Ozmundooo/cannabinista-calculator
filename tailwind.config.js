/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      black: "#000000",
      white: "#FFFFFF",
      primary: "#B3ADA8",
      secondary: "#1A2C38",
      tertiary: "#775144",
    },
    extend: {
      fontFamily: {
        title: ['"Young Serif"', "sans-serif"],
        subtitle: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
