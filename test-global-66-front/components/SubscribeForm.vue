<template>
  <section class="max-w-6xl mx-auto px-6 py-20">
    <div class="bg-white shadow-lg rounded-3xl p-10 text-center space-y-6">

      <h2 class="text-3xl font-bold text-gray-900">
        ¿Quieres recibir novedades y actualizaciones?
      </h2>

      <p class="text-gray-600 max-w-md mx-auto">
        Déjanos tu nombre y correo para avisarte cuando publiquemos nuevas tasas,
        promociones o cambios importantes en el mercado.
      </p>

      <form @submit.prevent="submitForm" class="space-y-4 max-w-sm mx-auto">

        <input
          v-model="name"
          type="text"
          placeholder="Tu nombre"
          required
          class="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        />

        <input
          v-model="email"
          type="email"
          placeholder="Tu email"
          required
          class="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        />

        <button
          type="submit"
          class="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition w-full"
        >
          Registrarme
        </button>

      </form>

      <p v-if="success" class="text-green-600 text-sm font-medium">
        ¡Gracias! Te avisaremos pronto.
      </p>

      <p v-if="errorMessage" class="text-red-600 text-sm font-medium">
        {{ errorMessage }}
      </p>

    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      success: false,
      errorMessage: ""
    }
  },

  methods: {
    async submitForm() {
      try {
        const response = await this.$axios.$post(
          "http://localhost:3001/api/subscribe",
          {
            name: this.name,
            email: this.email
          }
        )

        if (response.success) {
          this.success = true
          this.errorMessage = ""
          this.name = ""
          this.email = ""
        }
      } catch (err) {
        console.error("Error al enviar formulario:", err)
        this.errorMessage = "No se pudo procesar tu solicitud."
        this.success = false
      }
    }
  }
}
</script>
