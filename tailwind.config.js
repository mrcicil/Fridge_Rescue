export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'recipe': {
          50: '#FFF7ED',  // Lightest orange/cream
          100: '#FFEDD5', // Light peach
          200: '#FED7AA', // Warm cream
          300: '#FDBA74', // Soft orange
          400: '#FB923C', // Medium orange
          500: '#F97316', // Primary orange
          600: '#EA580C', // Dark orange
          700: '#C2410C', // Deeper orange
          800: '#9A3412', // Brown orange
          900: '#7C2D12', // Darkest orange/brown
        },
        'sage': {
          50: '#F8FAF9',
          100: '#E6EAE8',
          200: '#CED5D1',
          300: '#B5C0BB',
          400: '#97A39D',
          500: '#7A877F',
          600: '#5F6964',
          700: '#454C48',
          800: '#2C302E',
          900: '#141615',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}