/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#008fd7', // Primary Blue
          hover: '#006ba1',   // Hover
          light: '#e6f4fb',   // Background
        },
        accent: {
          DEFAULT: '#f7b400', // Accent Orange
          hover: '#b98700',   // Hover
        },
        secondary: {
          DEFAULT: '#2f318a', // Secondary Violet
          dark: '#232568',    // Footer Background
        },
        semantic: {
          red: '#a80022',     // Alerts/Tags
        },
        neutral: {
          bg: '#fcfcfc',      // Background
          text: '#4e4e4e',    // Text
          border: '#e0e0e0',  // Borders
        }
      },
      animation: {
        'scroll-left': 'scroll-left 40s linear infinite',
        'scroll-right': 'scroll-right 40s linear infinite',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'scroll-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}
