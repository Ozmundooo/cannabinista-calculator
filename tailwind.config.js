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
      primary: "#BCADA0",
      secondary: "#E8EFB4",
      tertiary: "#635256",
    },
    extend: {
      fontFamily: {
        title: ['"Libre Baskerville"', "sans-serif"],
        subtitle: ["Helvetica Neue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
