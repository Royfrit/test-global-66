<template>
  <div class="min-h-screen">

    <HeaderNav :logo="logo" :flagChile="flagChile" />

    <HeroRate :flag="flag">

      <template #title>
        Valor del dólar hoy
      </template>

      <template #rate>
        1 USD = <span>{{ formattedRate }}</span> {{ currency.code }}
      </template>

      <template #legend>
        Tipo de cambio para <strong>{{ formattedDate }}</strong> a las
        <strong>{{ formattedTime }}</strong> UTC
      </template>

    </HeroRate>

    <LocalPaySection
      :banner="banner"
      :playstore="playstore"
      :appstore="appstore"
    />

    <SubscribeForm />

  </div>
</template>

<script>

import { getCurrencyFromSlug } from '@/utils/currencies'

import HeaderNav from '@/components/HeaderNav.vue'
import HeroRate from '@/components/HeroRate.vue'
import LocalPaySection from '@/components/LocalPaySection.vue'
import SubscribeForm from '@/components/SubscribeForm.vue'

import logo from '@/assets/images/text-right.svg'
import flag from '@/assets/images/flag.svg'
import banner from '@/assets/images/banner.svg'
import playstore from '@/assets/images/playstore.svg'
import appstore from '@/assets/images/appstore.svg'
import flagChile from '@/assets/images/flagChile.svg'
import { parseISODate, formatCLDate, formatCLTime } from '@/utils/formatters'

export default {
  components: {
    HeaderNav,
    HeroRate,
    LocalPaySection,
    SubscribeForm
  },

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
      return parseISODate(this.asOf)
    },

    formattedDate() {
      return formatCLDate(this.dateObj)
    },

    formattedTime() {
      return formatCLTime(this.dateObj)
    },

    canonicalUrl() {
      return `https://tudominio.com/precio/${this.slug}`
    }
  },
  head() {
    const title = `Valor del dólar hoy en ${this.currency.country} (${this.currency.code})`
    const description = `Consulta el tipo de cambio actualizado del dólar (USD → ${this.currency.code}) para hoy. Última actualización ${this.formattedDate}.`

    return {
      htmlAttrs: { lang: 'es-CL' },
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:locale', property: 'og:locale', content: 'es_CL' }
      ],
      link: [
        { rel: 'canonical', href: this.canonicalUrl },
        {
          rel: 'alternate',
          hreflang: 'es-CL',
          href: this.canonicalUrl
        }
      ],
      script: [
        {
          type: 'application/ld+json',
          json: {
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            "name": `Valor del dólar hoy en ${this.currency.country}`,
            "description": description,
            "currency": this.currency.code,
            "exchangeRate": this.formattedRate,
            "datePublished": this.asOf,
            "url": this.canonicalUrl
          }
        }
      ]
    }
  }
}
</script>

