<template>
  <div>
    <div class="breadcrumb-nav flex flex-wrap items-center text-sm md:text-base mb-6">
      <nuxt-link class="mr-2" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>
      </nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mr-2" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link to="/rechtsberatung">Rechtsberatung</nuxt-link>
    </div>
    <section class="flex flex-col lg:flex-row items-center mb-8 md:mb-12">
      <div class="w-full lg:w-2/5">
        <h1 class="mb-2">Rechtsberatung von Traumanwälten</h1>
        <p class="text-xl">Lassen Sie sich online von einem Traumanwalt beraten. Rechtsverbindlicher Rat in 48 Stunden mit 100% Geld-zurück-Garantie.</p>
      </div>
      <div class="pt-4 lg:pt-8 w-full lg:w-3/5">
        <img src="@/assets/images/traumanwalt-rechtsberatung.png" />
      </div>
    </section>
    <section>
      <h2 class="mb-6">Alle Beratungsleistungen</h2>
      <div class="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div class="border flex flex-col justify-between rounded-md space-y-1" v-for="(legalService, index) in legalServices" :key="index">
          <div>
            <div class="h-40 bg-cover bg-center bg-no-repeat rounded-t-md mb-3" :style="`background-image: url(${legalService.thumbnail_url});`"></div>
            <h3 class="text-lg lg:text-xl px-4">{{ legalService.name }}</h3>
          </div>
          <div class="px-4 pb-4">
            <span class="block lg:text-lg mb-3">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(legalService.price) }}</span>
            <Btn class="w-full" @click="$router.push(`/rechtsberatung/${legalService.slug}`)">Mehr erfahren</Btn>
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
      title: 'Online-Rechtsberatung - Traumanwalt'
    }
  },
  async asyncData({ app }) {
    const legalFields = await app.$axios.$get('/api/legal-fields')
    const legalServices = await app.$axios.$get('/api/legal-services')
    return {
      legalFields,
      legalServices,
      questionForm: {
        subject: '',
        legalField: '',
        description: ''
      }
    }
  }
}
</script>
