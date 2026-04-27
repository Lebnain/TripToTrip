/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        sand: {
          50: '#faf8f4',
          100: '#f2ede2',
          200: '#e8ddc8',
          300: '#d9c9a8',
          400: '#c9b285',
          500: '#b89a65',
          600: '#a07f4f',
          700: '#836641',
          800: '#6b5337',
          900: '#57432e',
        },
        ink: {
          DEFAULT: '#1a1410',
          soft: '#2d2520',
          muted: '#6b5f56',
        },
        sky: {
          drift: '#e8f0f7',
          deep: '#2563a8',
        }
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'shimmer': 'shimmer 1.8s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
