module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '112': '28rem',
        '120': '30rem',
      },
      colors: {
        'indigo-dark': '#3A3053',
        'grey-dark': '#232027',
        'teal-primary': '#2CD0D1'
      },
      fontSize: {
        '5xl': ['3rem', '4.25rem'],
        '6xl': ['3.75rem', '4.25rem']
      },
      minWidth: {
        '0': '0',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        'full': '100%',
      },
      inset: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
      margin: {
        '-30': '-7.5rem',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
