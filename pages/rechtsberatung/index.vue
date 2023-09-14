<template>
  <div>
    <section class="mb-8 md:mb-12">
      <h1 class="mb-2">Rechtsberatung von Traumanwälten</h1>
      <p class="text-xl">Lassen Sie sich online zu festen Preisen von einem Rechtsanwalt beraten.</p>
    </section>
    <section>
      <h2 class="mb-6">Rechtsdienstleistungen</h2>
      <div class="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div class="border p-4 rounded-md" v-for="(service, index) in legalServices" :key="index">
          <h3>{{ service.name }}</h3>
          <p v-if="service.excerpt" class="mt-2">{{ service.excerpt }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RechtsberatungIndexPage',
  head() {
    return {
      title: 'Rechtsberatung - Traumanwalt'
    }
  },
  async asyncData({ app }) {
    const legalServices = await app.$axios.$get('/api/legal-services')
    return {
      legalServices
    }
  }
}
</script>
