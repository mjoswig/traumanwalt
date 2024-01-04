<template>
  <div>
    <div class="breadcrumb-nav flex flex-wrap items-center text-sm md:text-base mb-6 md:mb-12">
      <nuxt-link class="mr-2" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>
      </nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mr-2" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link class="mr-2" to="/rechtsberatung">Rechtsberatung</nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mr-2" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link :to="`/rechtsberatung/${legalService.slug}`">{{ legalService.name }}</nuxt-link>
    </div>
    <div class="mb-6">
      <h1>{{ legalService.name }}</h1>
      <p v-if="legalService.description" class="text-lg md:text-xl mt-2 md:mt-4">{{ legalService.description }}</p>
    </div>
    <section>
      <div v-if="!isClient">
        <h2 class="mb-2">Schon bei uns registriert?</h2>
        <p class="mb-4">Um eine Rechtsberatung in Auftrag geben zu können, müssen Sie sich zuerst auf Traumanwalt anmelden.</p>
        <div class="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
          <Btn class="w-full md:w-fit" @click="$router.push('/mandant-werden')">Mandant werden</Btn>
          <nuxt-link to="/login">Ich bin bereits Mandant</nuxt-link>
        </div>
      </div>
      <div v-if="isClient">
        <h2 class="mb-2">Jetzt Anwalt beauftragen</h2>
        <p class="mb-6">Unsere Partneranwälte helfen Ihnen gerne und beantworten alle Ihre Fragen zum <b>Bruttofestpreis</b>, ohne Steuern und weitere Überraschungen.</p>
        <form @submit.prevent>
          <fieldset class="mb-4">
            <wysiwyg class="bg-white w-full" placeholder="Bitte schildern Sie hier Ihren Fall..." v-model="orderForm.description" />
          </fieldset>
          <fieldset class="flex items-end justify-end mt-1">
            <Btn :is-disabled="true" class="w-full md:w-fit">Weiter zur Zahlung – {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(legalService.price) }}</Btn>
          </fieldset>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RechtsberatungDetailsPage',
  head() {
    return {
      title: `${this.legalService.name} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect }) {
    const legalService = await app.$axios.$get(`/api/legal-services/${params.slug}`)
    if (!legalService) redirect('/rechtsberatung')
    return {
      legalService,
      orderForm: {
        description: ''
      }
    }
  },
  computed: {
    isClient() {
      if (!this.$store.state.userData) return false
      return this.$store.state.userData.client
    }
  }
}
</script>