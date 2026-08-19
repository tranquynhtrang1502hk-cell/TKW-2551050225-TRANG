/** @type {import('tailwindcss').Config} */
module.exports = {
  /* Khai báo kích hoạt Dark Mode bằng class '.dark' ở thẻ <html> */
  darkMode: 'class',
  
  content: [
    "./*.html",
    "./src/**/*.{html,js}",
    "./buoi 1/*.html"
  ],
  theme: {
    extend: {
      colors: {
        /* Màu thương hiệu tĩnh */
        'brand-600': '#10b981',
        'accent-500': '#f59e0b',
        
        /* Ánh xạ Màu Token theo CSS Variables (Nhiệm vụ 3) */
        'ink': 'var(--color-ink)',
        'muted': 'var(--color-muted)',
        'surface': 'var(--color-surface)',
        'surface-alt': 'var(--color-surface-alt)',
        'line': 'var(--color-line)',
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