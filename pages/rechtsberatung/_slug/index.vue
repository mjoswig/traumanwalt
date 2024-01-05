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
          <p class="mb-3">Rechtsprobleme sind eine enorme Belastung im Alltag. Lassen Sie sich die Last abnehmen.</p>
          <p class="font-bold text-gray-500 text-lg mb-2">{{ service.name }}</p>
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
              <span>Transparente Kommunikation mit einem erfahrenen Anwalt auf Augenhöhe</span>
            </li>
            <li class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-lg mt-1" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
              </div>
              <span>100% Geld-zurück-Garantie</span>
            </li>
          </ul>
          <Btn class="w-full" :is-disabled="true">Jetzt Beratung buchen</Btn>
        </div>
        <h2 class="mt-8 md:mt-10 mb-4 md:mb-6">So funktioniert die Traumanwalt-Beratung</h2>
        <div class="grid grid-cols gap-4">
          <div>
            <h3 class="mb-2">1. Kontaktaufnahme</h3>
            <p class="md:text-lg">Sie schildern uns Ihr Problem und senden uns alle relevanten Daten für die Beratung.</p>
          </div>
          <div>
            <h3 class="mb-2">2. Online-Bezahlung</h3>
            <p class="md:text-lg">Sie bezahlen das Beratungshonorar in Höhe von <b>{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(service.price) }}</b> in Vorkasse. Sie können mittels Visa, Mastercard, Apple Pay, Google Pay, PayPal, giropay, Sofort oder Klarna bezahlen.</p>
          </div>
          <div>
            <h3 class="mb-2">3. Vermittlung an einen Anwalt</h3>
            <p class="md:text-lg">Wir finden einen Anwalt, der Sie optimal beraten kann. Sie bekommen binnen <b>48 Stunden</b> eine Rückmeldung von einem unserer Partneranwälte. Sollten wir nach 48 Stunden keinen Anwalt für Sie gefunden haben, bekommen Sie Ihr Geld <b>vollständig erstattet</b>.</p>
          </div>
          <div>
            <h3 class="mb-2">4. Individuelle Rechtsberatung</h3>
            <p class="md:text-lg">Ihr Anwalt wird ein persönliches Gespräch mit Ihnen vereinbaren und Ihnen bei Ihrem Rechtsproblem helfen.</p>
          </div>
          <div>
            <h3 class="mb-2">5. Geld-zurück-Garantie</h3>
            <p class="md:text-lg">Falls Sie mit unserer Beratung nicht zufrieden sein sollten, zahlen wir Ihr Geld innerhalb von 30 Tagen zurück. E-Mail genügt – ohne wenn und aber.</p>
          </div>
        </div>
        <h2 class="mt-6 md:mt-8 mb-4 md:mb-6">Haben Sie Fragen vor der Buchung?</h2>
        <div class="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
          <div>
            <div class="h-28 w-28 md:h-36 md:w-36 bg-cover rounded-full" :style="`background-image: url(${require('@/assets/images/manuel-joswig.jpg')}); background-position: center 20%;`"></div>
          </div>
          <div>
            <b class="block md:text-xl">Manuel Joswig</b>
            <span class="block md:text-lg mb-2">Traumanwalt Gründer</span>
            <ul class="flex flex-col space-y-1">
              <li class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
                <span>support@traumanwalt.com</span>
              </li>
              <li class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                <span>+49 172 763 6181</span>
              </li>
            </ul>
          </div>
        </div>
        <h2 class="mt-8 md:mt-10 mb-4 md:mb-6">Ähnliche Beratungsleistungen</h2>
        <div class="grid grid-cols sm:grid-cols-3 gap-4">
          <div class="border flex flex-col justify-between rounded-md space-y-1" v-for="(relatedService, index) in relatedServices" :key="index">
            <div>
              <div class="h-40 bg-cover bg-center bg-no-repeat rounded-t-md mb-3" :style="`background-image: url(${relatedService.thumbnail_url});`"></div>
              <h3 class="text-lg lg:text-xl px-4 hyphens-auto">{{ relatedService.name }}</h3>
            </div>
            <div class="px-4 pb-4">
              <span class="block lg:text-lg mb-3">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(relatedService.price) }}</span>
              <Btn class="w-full" @click="$router.push(`/rechtsberatung/${relatedService.slug}`)">Zur Beratung</Btn>
            </div>
          </div>
        </div>
      </section>
      <section class="hidden lg:block w-full lg:w-1/3">
        <div class="sticky top-4 border border-gray-300 p-4 rounded-md">
          <h2 class="text-xl xl:text-2xl mb-2">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(service.price) }}</h2>
          <p class="mb-4">Rechtsprobleme sind eine enorme Belastung im Alltag. Lassen Sie sich die Last abnehmen.</p>
          <p class="font-bold text-gray-500 text-lg mb-2">{{ service.name }}</p>
          <ul class="flex flex-col space-y-1 mb-6">
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
              <span>Transparente Kommunikation mit einem erfahrenen Anwalt auf Augenhöhe</span>
            </li>
            <li class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-lg mt-1" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
              </div>
              <span>100% Geld-zurück-Garantie</span>
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