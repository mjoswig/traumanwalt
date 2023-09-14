<template>
  <div class="-mt-4">
    <section class="bg-gray-100 flex flex-col-reverse md:flex-row items-center rounded-md shadow-sm mb-12">
      <div class="px-4 py-6 md:p-8 w-full">
        <h1 class="mb-2">Finden Sie Ihren Traumanwalt</h1>
        <p class="text-xl mb-4 md:mb-8">Unser Ziel ist es, Ihnen mit nur wenigen Klicks den perfekten Rechtsanwalt für Ihre individuellen Bedürfnisse zu präsentieren.</p>
        <form @submit.prevent>
          <fieldset class="search-widget flex flex-col sm:flex-row mb-4 md:mb-6">
            <select class="border rounded-t-md sm:rounded-none sm:rounded-l-md p-2 w-full">
              <option value="">Rechtsgebiet auswählen</option>
              <option v-for="(legalField, index) in legalFields" :key="index" :value="legalField.slug">{{ legalField.name }}</option>
            </select>
            <autocomplete base-class="city-search" placeholder="Ort eingeben" :search="searchCities" @submit="result => searchedCityName = result"></autocomplete>
          </fieldset>
          <div class="flex justify-end">
            <Btn class="w-full sm:w-fit">Anwälte suchen</Btn>
          </div>
        </form>
      </div>
      <div class="bg-cover h-56 sm:h-72 md:h-96 rounded-t-md md:rounded-none xl:rounded-r-md w-full" :style="`background-image: url(${require('@/assets/images/traumanwalt-home-1.jpeg')}); background-position: center 0; min-width: 40vw;`">
      </div>
    </section>
    <section class="grid grid-cols lg:grid-cols-2 gap-8 mb-12">
      <div>
        <h2 class="mb-6">Fragen Sie einen Anwalt</h2>
        <div class="grid grid-cols gap-4">
          <div>
            <h3 class="text-xl mb-1">1. Kostenloses Konto erstellen</h3>
            <p>Sie müssen sich <nuxt-link to="/mandant-werden">als Mandant registrieren</nuxt-link>, um Fragen einstellen zu dürfen.</p>
          </div>
          <div>
            <h3 class="text-xl mb-1">2. Frage stellen</h3>
            <p>Loggen Sie sich <nuxt-link to="/login">hier</nuxt-link> ein. Nutzen Sie dann das Formular, um Ihre Frage zu formulieren. Versuchen Sie keine Details auszulassen, um eine bessere Antwort zu erhalten.</p>
          </div>
          <div>
            <h3 class="text-xl mb-1">3. Bezahlung</h3>
            <p>Für Rechtsfragen rufen wir einen Pauschalpreis von 149,00 € inkl. MwSt. ab. Darin inbegriffen ist eine Rückfrage. Sie können mittels Visa, Mastercard, Apple Pay, Google Pay, PayPal, giropay, Sofort oder Klarna bezahlen.</p>
          </div>
          <div>
            <h3 class="text-xl mb-1">4. Hilfe bekommen</h3>
            <p>In der Regel erhalten Sie innerhalb von 24 Stunden eine Antwort. Sollte Ihre Frage 7 Tage lang unbeantwortet bleiben, bekommen Sie Ihr Geld erstattet.</p>
          </div>
        </div>
      </div>
      <form class="bg-gray-100 p-4 rounded-md grid gap-4" @submit.prevent>
        <fieldset>
          <label class="font-bold block">Titel Ihrer Frage</label>
          <input class="border px-2 py-1 rounded-md w-full" placeholder="Aussagekräftiger Titel" v-model="questionForm.title" />
        </fieldset>
        <fieldset>
          <label class="font-bold block">Rechtsgebiet (optional)</label>
          <select class="border rounded-t-md sm:rounded-none sm:rounded-l-md px-2 py-1 w-full" v-model="questionForm.legalField">
            <option value="">Rechtsgebiet auswählen</option>
            <option v-for="(legalField, index) in legalFields" :key="index" :value="legalField.slug">{{ legalField.name }}</option>
          </select>
        </fieldset>
        <fieldset>
          <label class="font-bold block">Beschreibung</label>
          <wysiwyg class="bg-white w-full" placeholder="Bitte schildern Sie hier Ihren Fall..." />
        </fieldset>
        <fieldset class="flex items-end justify-end mt-1">
          <div class="flex flex-col md:items-end w-full">
            <Btn :is-disabled="!isClient" class="w-full md:w-fit">Weiter zur Zahlung – 149,00 €</Btn>
            <p v-if="!isClient" class="mt-2 text-sm">Sie müssen als Mandant angemeldet sein. Noch kein Konto? <nuxt-link to="/mandant-werden">Jetzt registrieren</nuxt-link>.</p>
          </div>
        </fieldset>
      </form>
    </section>
    <section class="mb-12">
      <h2 class="mb-6">Anwälte nach Rechtsgebiet</h2>
      <ul class="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li class="border-b pb-2 break-words" v-for="(legalField, index) in legalFields" :key="index">
          <nuxt-link :to="`/anwaelte/${legalField.slug}`">Anwalt {{ legalField.name }}</nuxt-link>
        </li>
      </ul>
    </section>
    <section class="mb-12">
      <h2 class="mb-6">Anwälte nach Ort</h2>
      <ul class="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <li class="border-b pb-2 break-words" v-for="(city, index) in popularCities" :key="index">
          <nuxt-link :to="`/anwaelte/${city.slug}`">Anwalt {{ city.name }}</nuxt-link>
        </li>
      </ul>
    </section>
    <section class="grid md:grid-cols-2 gap-8 xl:items-center">
      <div>
        <img class="rounded-md shadow-sm" src="@/assets/images/traumanwalt-home-2.jpeg" />
      </div>
      <div>
        <h2 class="mb-4">Spezialisierte Anwälte lösen Ihr rechtliches Problem</h2>
        <p class="mb-4">Traumanwalt erleichtert ihnen die Suche nach einem passenden Anwalt. Hier finden Sie schnell und bequem spezialisierte & geprüfte Rechtexperten für Ihr individuelles Rechtsproblem.</p>
        <p>Traumanwalt arbeitet ausschließlich mit erfahrenen Anwälten zusammen, um Ihr rechtliches Anliegen schnellstmöglich und kompetent zu lösen.</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  async asyncData({ app }) {
    const legalFields = await app.$axios.$get('/api/legal-fields')
    const cities = await app.$axios.$get('/api/cities')
    return {
      legalFields,
      cities,
      popularCities: cities.filter(city => city.popular),
      questionForm: {
        title: '',
        legalField: '',
        description: ''
      }
    }
  },
  data() {
    return {
      searchedCityName: null
    }
  },
  computed: {
    isClient() {
      if (!this.$store.state.userData) return false
      return this.$store.state.userData.client
    },
    searchedCity() {
      if (!this.searchedCityName) return null
      return this.cities.find(city => city.name === this.searchedCityName)
    }
  },
  methods: {
    searchCities(input) {
      const cityNames = this.cities.map(city => city.name)
      if (input.length < 1) { return [] }
      return cityNames.filter(cityName => {
        return cityName.toLowerCase().startsWith(input.toLowerCase())
      })
    }
  }
}
</script>

<style lang="postcss">
.search-widget div {
  @apply w-full;
}

.city-search-input {
  @apply border rounded-b-md border-t-0 sm:border-t sm:border-l-0 sm:rounded-none sm:rounded-r-md p-2 w-full;
}

.city-search-result-list li {
  @apply bg-white p-2;
}
</style>