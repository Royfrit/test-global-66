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
        primary: '#1F49B6',
        secondary: '#00D1FF',
        dark: '#0B0D17',
        light: '#F5F7FB',
        green: '#01D196',
        grey: '#F5F7FE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
