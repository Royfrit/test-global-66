<template>
  <div class="min-h-screen">
    
    <!-- HEADER + HERO azul -->
    <section class="bg-primary text-white">
      <div class="max-w-6xl mx-auto px-6">

        <!-- NAVBAR -->
        <nav class="flex items-center h-16">
          <!-- Logo + menú izquierda -->
          <div class="flex items-center gap-8">
            <a href="/" class="flex items-center gap-2">
              <img :src="logo" alt="logo" class="h-6" />
            </a>

            <div class="hidden md:flex items-center gap-6 text-sm">
              <button class="border-b-2 border-green text-green pb-1 font-semibold">
                Personas
              </button>
              <button class="text-white/80 hover:text-white">
                Empresas
              </button>
              <div class="flex items-center gap-6 ml-28">
                <button class="text-white/80 hover:text-white">
                  Productos
                  </button>
                  <button class="text-white/80 hover:text-white">
                    Beneficios
                  </button>
                  <button class="text-white/80 hover:text-white">
                    Ayuda
                  </button>
                    <img :src="flagChile" class="h-4 w-4 rounded-full size-400" alt="Chile" />
              </div>
       
            </div>
          </div>

          <!-- Lado derecho: país + botones -->
          <div class="flex items-center gap-4 ml-8 text-sm">
            <button class="hidden md:inline-block text-white/90 hover:text-white">
              Iniciar sesión
            </button>

            <button class="bg-white text-primary font-semibold px-4 py-2 rounded-full hover:bg-gray-100">
              Crear cuenta
            </button>
          </div>
        </nav>

        <!-- HERO -->
        <div class="pt-10 flex flex-col lg:flex-row items-center justify-between">

          <!-- Texto -->
          <div class="space-y-4">
            <h1 class="text-3xl lg:text-4xl font-bold">
              Valor del dólar hoy
            </h1>

            <p class="text-4xl font-extrabold">
              1 USD = <span>{{ formattedRate }}</span> {{ currency.code }}
            </p>

            <p class="text-white/80 text-sm">
              Tipo de cambio para <strong>{{ formattedDate }}</strong> a las
              <strong>{{ formattedTime }}</strong> UTC
            </p>
          </div>

          <!-- Gráfico de banderas como en la maqueta -->
          <div class="relative flex-shrink-0">
              <img :src="flag" class="w-400 h-400 size-400" alt="USD/CLP" />
          </div>

        </div>
      </div>
    </section>

    <!-- Sección “Sé Global, paga como local” -->
    <section class="max-w-6xl mx-auto px-6 py-20">
      <div class="bg-grey h-96 mt-9 rounded-3xl shadow-xl p-10 flex flex-col lg:flex-row items-center gap-12 relative">

        <!-- Texto -->
        <div class="space-y-4 max-w-md">
          <h2 class="text-3xl font-bold">
            Sé Global,<br><span class="text-primary">paga como local</span>
          </h2>

          <p class="text-gray-600 text-lg">
            Tu Cuenta Global para pagar, convertir, enviar dinero y más.
          </p>

          <div class="flex gap-4 pt-2">
              <img :src="playstore" alt="Play Store" class="h-6" />
        

           <img :src="appstore" alt="App Store" class="h-6" />
          </div>
        </div>

        <!-- Mockups como en el ejemplo -->
        <div class="flex items-end gap-6 lg:absolute lg:right-9">
          <img :src="banner" class="w-400 h-400 size-400" alt="USD/CLP" />
        </div>

      </div>
    </section>

  </div>
</template>

<script>

import { getCurrencyFromSlug } from '@/utils/currencies'
import logo from '@/assets/images/text-right.svg'
import flag from '@/assets/images/flag.svg'
import banner from '@/assets/images/banner.svg'
import playstore from '@/assets/images/playstore.svg'
import appstore from '@/assets/images/appstore.svg'
import flagChile from '@/assets/images/flagChile.svg'

export default {
  data() {
    return { logo, flag, banner, playstore, appstore, flagChile }
  },
    async asyncData({ params, error, $axios }) {
    const slug = params.slug

    const currency = getCurrencyFromSlug(slug)
    console.log("Currency:", currency);
    if (!currency) {
      return error({ statusCode: 404, message: 'Divisa no encontrada' })
    }

    try {
      // SSR: llamar al endpoint interno
      const data = await $axios.$get('/api/rates', {
        params: { base: 'USD', target: currency.code }
      })


      const rate = data.rates[currency.code]
      const asOf = data.asOf

      return {
        slug,
        currency,
        rate,
        asOf
      }
    } catch (e) {
      return error({
        statusCode: 500,
        message: 'Error cargando tasas'
      })
    }
  },

  computed: {
    formattedRate() {
      const f = new Intl.NumberFormat(this.currency.locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
      return f.format(this.rate)
    },

    dateObj() {
      if (!this.asOf) return null
      const clean = this.asOf.replace(/\u200B/g, '')
      const iso = /Z$|([+-]\d{2}:?\d{2})$/.test(clean) ? clean : `${clean}Z`
      const d = new Date(iso)
      return isNaN(d.getTime()) ? null : d
    },

    formattedDate() {
      if (!this.dateObj) return ''
      return new Intl.DateTimeFormat('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      }).format(this.dateObj)
    },

    formattedTime() {
      if (!this.dateObj) return ''
      return new Intl.DateTimeFormat('es-CL', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      }).format(this.dateObj)
    },

    canonicalUrl() {
      return `https://tudominio.com/precio/${this.slug}`
    }
  },

  head() {
    console.log(this.currency)
    const title = `Valor del dólar hoy en ${this.currency.country} (${this.currency.code})`
    const description = `Consulta el tipo de cambio actualizado del dólar (USD → ${this.currency.code}) para hoy. Última actualización ${this.formattedDate}.`

    return {
      htmlAttrs: { lang: 'es-CL' },
      title,
      meta: [
        { hid: 'description', name: 'description', content: description }
      ],
      link: [
        { rel: 'canonical', href: this.canonicalUrl },
        {
          rel: 'alternate',
          hreflang: 'es-CL',
          href: this.canonicalUrl
        }
      ]
    }
  }
}
</script>

<style>

</style>
