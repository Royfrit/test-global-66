export default {
    ssr: true,
    components: true,
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/tailwindcss'
    ],
    css: [
        '@/assets/css/tailwind.css'
    ],
    serverMiddleware: [{ path: '/api/rates', handler: '~/api/rates.js' }],
    build: {}
}        