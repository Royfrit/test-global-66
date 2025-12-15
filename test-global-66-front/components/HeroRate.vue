<template>
  <section class="bg-primary text-white">
    <div class="max-w-6xl mx-auto px-6 pt-10 flex flex-col lg:flex-row items-center justify-between">

      <!-- Left content -->
      <div class="space-y-4">

        <!-- SLOT DE TÍTULO -->
        <h1 class="text-3xl lg:text-4xl font-bold">
          <slot name="title"></slot>
        </h1>

        <!-- SLOT DE LA TASA -->
        <p class="text-4xl font-extrabold">
          <slot name="rate"></slot>
        </p>

        <!-- SLOT DE LA LEYENDA -->
        <p class="text-white/80 text-sm">
          <slot name="legend"></slot>
        </p>
      </div>

      <!-- Right image -->
      <div class="relative flex-shrink-0">
        <img :src="flag"  loading="lazy" class="w-64 h-64 object-contain" alt="dollar banner" />
      </div>

    </div>
  </section>
</template>

<script>
export default {
  props: {
    flag: String
  }
}
</script>