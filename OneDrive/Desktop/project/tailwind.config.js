/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fffaf2',
          100: '#fff0e0',
          200: '#fed8b6',
          300: '#fcbf86',
          400: '#f9a85a',
          500: '#d48a28',
          600: '#b26d20',
          700: '#8d5319',
          800: '#6f4014',
          900: '#51300f'
        }
      },
      boxShadow: {
        glow: '0 20px 45px rgba(0,0,0,0.45)',
        panel: '0 2px 25px rgba(0,0,0,0.34)'
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif']
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
