/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "success": "#0D9488",
        "secondary": "#0F766E",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          // ডিফল্ট লাইট থিমের কালার এবং আপনার কাস্টম কালার
          "primary": "#0D9488",
          "secondary": "#0F766E",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "success": "#0D9488",
          "success-content": "#ffffff",
          "secondary-content": "#ffffff",
          "info": "#2094f3",
          "warning": "#ff9900",
          "error": "#ff5724",
        },
      },
      "dark",
    ],
  },
}