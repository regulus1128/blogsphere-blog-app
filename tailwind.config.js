/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Assistant: ["Assistant", 'sans-serif'],
        jost: ["Jost", 'sans-serif'],
        sourceSans: ["Source Sans 3", 'sans-serif'],
        mukta: ["Mukta", 'sans-serif'],
      }
    },
  },
  plugins: [],
}


