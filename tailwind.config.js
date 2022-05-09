const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: '#ed111f',
      secondary: "#f42525",
      dark: '#151A21',
      darker: '#242C37',
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: '#323D4D',
      green: "#24BE87",
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
    },
    fontFamily: {
      inter: 'inter'
    },
    container: {
      padding: '2rem',
      center: true
    },
    extend: {},
  },
  plugins: [
    
  ]
}
