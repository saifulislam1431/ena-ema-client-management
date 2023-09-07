/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        lightTheme: {

          "primary": "#FF5733",

          "secondary": "#E65E40",

          "accent": "#FF756E",

          "neutral": "#221c26",

          "base-100": "#f9f9fb",

          "info": "#2e68e5",

          "success": "#0d5941",

          "warning": "#b68f11",

          "error": "#d92650",
        },
      },
      "night"
    ],
  },
  plugins: [require("daisyui")],
}

