/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import tailwindcssAnimated from "tailwindcss-animated";
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-lexend)"],
      },
      // note: 'screens' is used to define the screen size breakpoints, similar to how media queries work in default CSS
      screens: {
        xs: "320px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        loginblue: "#32A4DC",
        loginblueop: "#32a3dc4b",
        socskyblue: "#CDF6FF",
        orangetheme: "#FD7566",
        lightblue: "#CDF6FF",
        lightgrey: "#d1d5db",
        green: "#007E00",
        red: "#D60505",
        darkmodegreen: "#2EC732",
        darkmodered: "#FF4040",
        clearbtn: "#E56060",
      },
    },
  },
  variants: {},
  // note: daisyui adds a lot of pre-built styles for components
  // note: tailwindcssAnimated is a tailwind plug that adds a lot of pre-built animations and makes animation waaaaaaay easier
  plugins: [daisyui, tailwindcssAnimated],
};
