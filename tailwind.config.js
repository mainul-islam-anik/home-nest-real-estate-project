/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui" 

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui, // এই যে এখানে 'daisyui' ভেরিয়েবলটি বসানো হয়েছে
  ],
  daisyui: {
    themes: ["light", "dark"], 
  },
}