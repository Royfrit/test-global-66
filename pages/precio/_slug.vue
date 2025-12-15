<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <main class="max-w-5xl mx-auto px-6 space-y-12">
      
      <!-- Hero -->
      <section class="space-y-4">
        <h1 class="text-3xl font-bold text-gray-900">
          Valor del dólar hoy
        </h1>

        <p class="text-2xl font-semibold text-primary">
          1 USD = {{ formattedRate }} {{ currency.code }}
        </p>

        <p class="text-gray-600 text-sm">
          Tipo de cambio para <strong>{{ formattedDate }}</strong> a las
          <strong>{{ formattedTime }}</strong> UTC
        </p>
      </section>

      <!-- Bloque “Sé Global, paga como local” -->
      <section class="bg-white rounded-3xl shadow p-8 flex flex-col lg:flex-row items-center gap-10">
        <div class="space-y-4 max-w-md">
          <h2 class="text-2xl font-bold">
            Sé Global, <span class="text-primary">paga como local</span>
          </h2>

          <p class="text-gray-600">
            Convierte dólares a {{ currency.name }} con un tipo de cambio competitivo y transfiere al instante.
          </p>

          <div class="flex gap-4 pt-2">
            <button class="bg-primary text-white px-6 py-3 font-semibold rounded-full hover:bg-primary-dark transition">
              Abrir cuenta
            </button>

            <button class="border border-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
              Ver detalles
            </button>
          </div>
        </div>

        <div class="w-40 h-72 bg-primary rounded-3xl shadow-lg lg:ml-auto"></div>
      </section>

    </main>
  </div>
</template>

<script>

import { getCurrencyFromSlug } from '@/utils/currencies'

export default {
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
      console.log("SSR DATA:", data);

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
    if(!this.asOf) return null
      const clean = this.asOf.replace(/\u200B/g, '')
      const d = new Date(clean)
      return isNaN(d.getTime()) ? null : d
    },

    formattedDate() {
    if(!this.dateObj) return ''
      return this.dateObj.toLocaleDateString('es-CL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    },

    formattedTime() {
        console.log(this.asOf)
      if(!this.asOf) return ''
      const clean = this.asOf.replace(/\u200B/g, '');
      return this.asOf.slice(11, 16)
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
