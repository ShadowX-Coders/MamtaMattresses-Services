/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F7F8F4',
        brand: {
          dark: '#0F4837',
          primary: '#176B52',
          hover: '#135742',
          light: '#DCEBE2',
          sage: '#EAF1E8',
          accent: '#B8DCC5',
        },
        charcoal: {
          DEFAULT: '#202824',
          muted: '#718078',
          subtle: '#9CAAA2',
          border: '#E2EBE5',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'clay': '8px 12px 24px rgba(23, 107, 82, 0.07), -6px -6px 16px rgba(255, 255, 255, 0.9), inset 1px 1px 2px rgba(255, 255, 255, 0.8)',
        'clay-sm': '4px 6px 14px rgba(23, 107, 82, 0.05), -3px -3px 10px rgba(255, 255, 255, 0.8), inset 1px 1px 2px rgba(255, 255, 255, 0.7)',
        'clay-hover': '12px 18px 30px rgba(23, 107, 82, 0.12), -8px -8px 20px rgba(255, 255, 255, 0.95), inset 1px 1px 3px rgba(255, 255, 255, 0.9)',
        'clay-pressed': 'inset 3px 3px 8px rgba(23, 107, 82, 0.12), inset -2px -2px 6px rgba(255, 255, 255, 0.7)',
        'clay-pill': '6px 8px 18px rgba(23, 107, 82, 0.08), -4px -4px 12px rgba(255, 255, 255, 0.95)',
        'clay-green': '6px 10px 22px rgba(23, 107, 82, 0.28), -4px -4px 12px rgba(255, 255, 255, 0.3), inset 1px 1px 2px rgba(255, 255, 255, 0.35)',
        'clay-input': 'inset 2px 2px 6px rgba(32, 40, 36, 0.06), inset -2px -2px 6px rgba(255, 255, 255, 0.8)',
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      }
    },
  },
  plugins: [],
}
