<template>
  <div>
    <section class="md:text-center mb-8 md:mb-12">
      <h1 class="mb-2">Rechtsberatung von Traumanwälten</h1>
      <p class="text-xl">Lassen Sie sich online zu festen Preisen von einem Rechtsanwalt beraten.</p>
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
            <h3 class="text-xl mb-1">3. Fixpreis bezahlen</h3>
            <p>Für Rechtsfragen rufen wir einen Fixpreis von 149,00 € inkl. MwSt. ab. Darin inbegriffen ist eine Rückfrage. Sie können mittels Visa, Mastercard, Apple Pay, Google Pay, PayPal, giropay, Sofort oder Klarna bezahlen.</p>
          </div>
          <div>
            <h3 class="text-xl mb-1">4. Hilfe bekommen</h3>
            <p>In der Regel erhalten Sie innerhalb von 24 Stunden eine Antwort. Sollte Ihre Frage 7 Tage lang unbeantwortet bleiben, bekommen Sie Ihr Geld erstattet.</p>
          </div>
        </div>
      </div>
      <form class="grid gap-4" @submit.prevent>
        <h2>Was ist Ihre Frage?</h2>
        <fieldset>
          <label class="font-bold block">Betreff</label>
          <input class="border px-2 py-1 rounded-md w-full" placeholder="Betreff Ihrer Frage" v-model="questionForm.subject" />
        </fieldset>
        <fieldset>
          <label class="font-bold block">Rechtsgebiet (optional)</label>
          <select class="border rounded-t-md sm:rounded-none sm:rounded-l-md px-2 py-1 w-full" v-model="questionForm.legalField">
            <option value="">Rechtsgebiet auswählen</option>
            <option v-for="(legalField, index) in legalFields" :key="index" :value="legalField.slug">{{ legalField.name }}</option>
          </select>
        </fieldset>
        <fieldset>
          <label class="font-bold block">Ihr Anliegen</label>
          <wysiwyg class="bg-white w-full" placeholder="Bitte schildern Sie hier Ihren Fall..." v-model="questionForm.description" />
        </fieldset>
        <fieldset class="flex items-end justify-end mt-1">
          <div class="flex flex-col md:items-end w-full">
            <Btn :is-disabled="!isClient" class="w-full md:w-fit">Weiter zur Zahlung – 149,00 €</Btn>
            <p v-if="!isClient" class="mt-3 text-sm">Sie müssen als Mandant angemeldet sein. Noch kein Konto? <nuxt-link to="/mandant-werden">Jetzt registrieren</nuxt-link>.</p>
          </div>
        </fieldset>
      </form>
    </section>
    <section>
      <h2 class="mb-6">Weitere Beratungsleistungen</h2>
      <div class="grid grid-cols sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        <div class="border flex flex-col justify-between p-4 rounded-md space-y-1" v-for="(legalService, index) in legalServices" :key="index">
          <div>
            <img v-if="legalService.thumbnail_url" class="h-20 w-auto mb-3" :src="legalService.thumbnail_url" />
            <h3 class="text-lg lg:text-xl">{{ legalService.name }}</h3>
          </div>
          <div>
            <span class="block text-gray-500 lg:text-lg mb-3">{{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(legalService.price) }} inkl. MwSt.</span>
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
      legalServices,
      questionForm: {
        subject: '',
        legalField: '',
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
