<template>
  <section class="max-w-6xl mx-auto px-6 py-20">
    <div class="bg-gray-100 h-96 rounded-3xl shadow-xl p-10 flex flex-col lg:flex-row items-center gap-12 relative">

      <!-- Text -->
      <div class="space-y-4 max-w-md">
        <h2 class="text-3xl font-bold">
          Sé Global,<br><span class="text-primary">paga como local</span>
        </h2>

        <p class="text-gray-600 text-lg">
          Tu Cuenta Global para pagar, convertir, enviar dinero y más.
        </p>

        <!-- Store buttons -->
        <div class="flex gap-4 pt-2">
          <img :src="playstore" loading="lazy" alt="Play Store" class="h-6" />
          <img :src="appstore" loading="lazy" alt="App Store" class="h-6" />
        </div>
      </div>

      <!-- Banner -->
      <div class="flex items-end gap-6 lg:absolute lg:right-9">
        <img :src="banner"  loading="lazy" class="w-64 h-64 object-contain" alt="banner" />
      </div>

    </div>
  </section>
</template>

<script>
export default {
  props: {
    banner: String,
    playstore: String,
    appstore: String
  }
}
</script>