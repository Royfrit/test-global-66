<template>
  <nav class="bg-primary text-white">
    <div class="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">

      <!-- Left -->
      <div class="flex items-center gap-8">
        <a href="/" class="flex items-center gap-2">
          <img :src="logo" alt="logo" class="h-6" />
        </a>

        <div class="hidden md:flex items-center gap-6 text-sm">
          <button class="border-b-2 border-green text-green pb-1 font-semibold">
            Personas
          </button>
          <button class="text-white/80 hover:text-white">Empresas</button>

          <div class="flex items-center gap-6 ml-16">
            <button class="text-white/80 hover:text-white">Productos</button>
            <button class="text-white/80 hover:text-white">Beneficios</button>
            <button class="text-white/80 hover:text-white">Ayuda</button>

            <img :src="flagChile" class="h-4 w-4 rounded-full" alt="Chile" />
          </div>
        </div>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-4 text-sm">
        <button class="hidden md:inline-block text-white/90 hover:text-white">
          Iniciar sesión
        </button>

        <button class="bg-white text-primary font-semibold px-4 py-2 rounded-full hover:bg-gray-100">
          Crear cuenta
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    logo: String,
    flagChile: String
  }
}
</script>