/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./src/**/*.{html,js}",
    "./buoi 1/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'brand-600': '#10b981',
        'accent-500': '#f59e0b',
        'ink': '#0f172a',
        'muted': '#64748b',
        'surface': '#ffffff',
        'line': '#e2e8f0',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'card': '0.875rem',
      }
    },
  },
  plugins: [],
}