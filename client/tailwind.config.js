/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(100%)', },
          '100%': { transform: 'translateY(0px)', },
        },
        slideOutDown: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        slideInUp: 'slideInUp 0.6s ease',
        slideOutDown: 'slideOutDown 1s ease-in-out',
      },
    },

  },
  plugins: [],
}


