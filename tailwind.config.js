/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blinkit: {
          yellow: '#F8CB46',
          'yellow-light': '#FFF8E1',
          'yellow-dark': '#E5B834',
          green: '#0C831F',
          'green-hover': '#096618',
          'green-light': '#F3F9F4',
          'green-border': '#19882B',
          black: '#1C1C1C',
          text: '#222222',
          muted: '#666666',
          subdued: '#828282',
          border: '#EEEEEE',
          'border-light': '#F1F1F1',
          bg: '#F4F6FB',
          card: '#FFFFFF',
          badge: '#E8F5E9'
        }
      },
      fontFamily: {
        sans: ['"Okra"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'blinkit': '0 2px 8px rgba(0,0,0,0.06)',
        'blinkit-hover': '0 8px 16px rgba(0,0,0,0.1)',
        'drawer': '-4px 0 24px rgba(0,0,0,0.15)',
        'search': '0 4px 12px rgba(0,0,0,0.08)',
      }
    },
  },
  plugins: [],
}
