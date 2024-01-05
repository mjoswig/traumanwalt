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
      <nuxt-link :to="`/rechtsberatung/${service.slug}`">{{ service.name }}</nuxt-link>
    </div>
    <article class="flex flex-col space-y-6 lg:flex-row lg:space-x-8 lg:space-y-0 w-full">
      <section class="w-full lg:w-2/3">
        <h1>{{ service.name }}</h1>
        <p v-if="service.excerpt" class="text-lg md:text-xl mt-2 md:mt-4">{{ service.excerpt }}</p>
        <div v-if="service.thumbnail_url" class="bg-cover bg-center border rounded-lg h-48 sm:h-64 md:h-72 xl:h-96 w-full mt-4 md:mt-7" :style="`background-image: url(${service.thumbnail_url});`"></div>
        <div class="border border-gray-300 p-4 rounded-md mt-6 lg:hidden">
          <h2 class="text-xl xl:text-2xl mb-2">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(service.price) }}</h2>
          <p class="mb-2">Rechtsprobleme sind eine enorme Belastung im Alltag. Lassen Sie sich die Last abnehmen.</p>
          <p class="font-bold text-gray-500 text-lg mb-2">Schneller Recht bekommen</p>
          <ul class="flex flex-col space-y-1 mb-5">
            <li class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-lg mt-1" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
              </div>
              <span>Online-Rechtsberatung zum Festpreis</span>
            </li>
            <li class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-lg mt-1" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
              </div>
              <span>Transparente Kommunikation mit Fachanwälten auf Augenhöhe</span>
            </li>
            <li class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-lg mt-1" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
              </div>
              <span>Sichere Übermittlung von vertraulichen Daten und Dokumenten</span>
            </li>
          </ul>
          <Btn class="w-full" :is-disabled="true">Jetzt Beratung buchen</Btn>
        </div>
        <h2 class="mt-4 md:mt-8 mb-2 md:mb-4">So funktioniert die Traumanwalt-Beratung</h2>
        <div class="grid grid-cols gap-2 md:gap-4">
          <div>
            <h3 class="mb-2">1. Kontaktaufnahme</h3>
            <p class="md:text-lg">Sie schildern uns Ihr Problem und senden uns alle relevanten Daten für die Beratung.</p>
          </div>
          <div>
            <h3 class="mb-2">2. Bezahlung</h3>
            <p class="md:text-lg">Sie bezahlen das Beratungshonorar in Höhe von {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(service.price) }} in Vorkasse. Sie können mittels Visa, Mastercard, Apple Pay, Google Pay, PayPal, giropay, Sofort oder Klarna bezahlen.</p>
          </div>
          <div>
            <h3 class="mb-2">3. Vermittlung an einen Traumanwalt</h3>
            <p class="md:text-lg">Wir finden einen Anwalt, der Sie optimal beraten kann. Sie bekommen binnen 48 Stunden eine Rückmeldung von einem unserer Partneranwälte. Sollten wir nach 48 Stunden keinen Anwalt für Sie gefunden haben, bekommen Sie Ihr Geld vollständig erstattet.</p>
          </div>
          <div>
            <h3 class="mb-2">4. Rechtsberatung</h3>
            <p class="md:text-lg">Ihr Anwalt wird ein persönliches Gespräch mit Ihnen vereinbaren und Ihnen bei Ihrem Rechtsproblem helfen.</p>
          </div>
        </div>
        <h2 class="mt-4 md:mt-8 mb-3 md:mb-6">Ähnliche Beratungsleistungen</h2>
        <div class="grid grid-cols sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
          <div class="border flex flex-col justify-between rounded-md space-y-1" v-for="(relatedService, index) in relatedServices" :key="index">
            <div>
              <div class="h-40 bg-cover bg-center bg-no-repeat rounded-t-md mb-3" :style="`background-image: url(${relatedService.thumbnail_url});`"></div>
              <h3 class="text-lg lg:text-xl px-4 hyphens-auto">{{ relatedService.name }}</h3>
            </div>
            <div class="px-4 pb-4">
              <span class="block lg:text-lg mb-3">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(relatedService.price) }}</span>
              <Btn class="w-full" @click="$router.push(`/rechtsberatung/${relatedService.slug}`)">Mehr erfahren</Btn>
            </div>
          </div>
        </div>
      </section>
      <section class="hidden lg:block w-full lg:w-1/3">
        <div class="sticky top-4 border border-gray-300 p-4 rounded-md">
          <h2 class="text-xl xl:text-2xl mb-2">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(service.price) }}</h2>
          <p class="mb-2">Rechtsprobleme sind eine enorme Belastung im Alltag. Lassen Sie sich die Last abnehmen.</p>
          <p class="font-bold text-gray-500 text-lg mb-2">Schneller Recht bekommen</p>
          <ul class="flex flex-col space-y-1 mb-5">
            <li class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-lg mt-1" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
              </div>
              <span>Online-Rechtsberatung zum Festpreis</span>
            </li>
            <li class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-lg mt-1" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
              </div>
              <span>Transparente Kommunikation mit Fachanwälten auf Augenhöhe</span>
            </li>
            <li class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-lg mt-1" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
              </div>
              <span>Sichere Übermittlung von vertraulichen Daten und Dokumenten</span>
            </li>
          </ul>
          <Btn class="w-full" :is-disabled="true">Jetzt Beratung buchen</Btn>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: 'RechtsberatungDetailsPage',
  head() {
    return {
      title: `${this.service.name} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect }) {
    const legalService = await app.$axios.$get(`/api/legal-services/${params.slug}`)
    if (!legalService) redirect('/rechtsberatung')
    return {
      service: legalService.service,
      relatedServices: legalService.related_services
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