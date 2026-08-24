/** @type {import('tailwindcss').Config} */
module.exports = {
  /* Kích hoạt Dark Mode bằng class '.dark' ở thẻ <html> */
  darkMode: 'class',
  
  content: [
    "./*.html",
    "./pages/**/*.html",
    "./page/**/*.html",
    "./buoi 1/**/*.html",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        /* Màu thương hiệu tĩnh */
        'brand-600': '#10b981',
        'accent-500': '#f59e0b',
        
        /* Ánh xạ Màu Token theo CSS Variables */
        'ink': 'var(--color-ink)',
        'ink-invert': 'var(--color-ink-invert)',
        'muted': 'var(--color-muted)',
        'surface': 'var(--color-surface)',
        'surface-dark': 'var(--color-surface-dark)',
        'surface-alt': 'var(--color-surface-alt)',
        'surface-alt-dark': 'var(--color-surface-alt-dark)',
        'line': 'var(--color-line)',
        'line-invert': 'var(--color-line-invert)',
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