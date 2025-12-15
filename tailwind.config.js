module.exports = {
    content: [
      './components/**/*.vue',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.js',
      './nuxt.config.js',
    ],
  theme: {
    extend: {
      colors: {
        primary: '#0052FF',
        secondary: '#00D1FF',
        dark: '#0B0D17',
        light: '#F5F7FB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
