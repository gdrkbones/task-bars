module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'rotate-y': {
          '0%, 100%': {
            transform: 'rotateY(0deg)',
          },
          '50%': {
            transform: 'rotateY(90deg)',
          },
        },
      },
      animation: {
        rotatey: 'rotate-y 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
