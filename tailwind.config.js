import {nextui} from '@nextui-org/react'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',  // 512px
        '144': '36rem',  // 576px
        '160': '40rem',  // 640px
        '184': '44rem',  // 640px
        '192': '48rem',  // 768px
        '256': '64rem',  // 1024px
        '320': '80rem',  // 1280px
        '384': '96rem',  // 1536px
      },
      keyframes: {
        modalOpen: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        modalOpen: 'modalOpen 0.3s ease-out',
      },
   
      colors: {
        "primary" : "#8800ff"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
