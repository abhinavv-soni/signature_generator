/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bce0ff',
          300: '#8ccbff',
          400: '#49a6ff',
          500: '#2b7fff',
          600: '#1a5ff7',
          700: '#1a4be6',
          800: '#1c3eb9',
          900: '#1c3992',
        },
        secondary: {
          50: '#fdf2ff',
          100: '#fae6ff',
          200: '#f4ccff',
          300: '#eba3ff',
          400: '#de69ff',
          500: '#c836f5',
          600: '#ae1dd3',
          700: '#901aad',
          800: '#77198c',
          900: '#641b73',
        },
        accent: {
          50: '#edfff7',
          100: '#d5ffee',
          200: '#aeffdd',
          300: '#70ffc3',
          400: '#2bffa1',
          500: '#00dc82',
          600: '#00b268',
          700: '#008c56',
          800: '#066c46',
          900: '#075a3c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        'glow': '0 0 20px rgba(43, 127, 255, 0.4)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      scale: {
        '102': '1.02',
        '98': '0.98',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};