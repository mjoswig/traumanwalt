<template>
  <div>
    <section class="mb-8 md:mb-12">
      <h1 class="mb-2">Rechtsberatung von Traumanwälten</h1>
      <p class="text-xl">Lassen Sie sich online zu festen Preisen von einem Rechtsanwalt beraten.</p>
    </section>
    <section>
      <h2 class="mb-6">Beratungsleistungen</h2>
      <div class="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div class="border flex flex-col justify-between p-4 rounded-md space-y-1" v-for="(service, index) in legalServices" :key="index">
          <div>
            <img v-if="service.thumbnail_url" class="h-20 w-auto mb-3" :src="service.thumbnail_url" />
            <h3 class="text-lg lg:text-xl">{{ service.name }}</h3>
          </div>
          <div>
            <span class="block text-gray-500 lg:text-lg mb-3">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(service.price) }} inkl. MwSt.</span>
            <Btn :is-disabled="true" class="w-full">Jetzt beraten lassen</Btn>
          </div>
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
