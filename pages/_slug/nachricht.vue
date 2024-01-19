<template>
  <div>
    <h1 class="mb-6 md:mb-8">Ihre Nachricht an {{ fullName }}</h1>
    <div class="flex flex-col-reverse lg:flex-row lg:space-x-8 lg:space-y-0">
      <div class="w-full lg:w-2/3">
        <form v-show="!messageSent" class="flex flex-col space-y-4 w-full" @submit.prevent>
          <div v-if="!isClient" class="grid lg:grid-cols-3 gap-4">
            <fieldset>
              <label class="font-bold block">Anrede</label>
              <select class="border px-2 py-1 rounded-md w-full" v-model="form.salutation">
                <option value="Herr">Herr</option>
                <option value="Frau">Frau</option>
              </select>
            </fieldset>
            <fieldset>
              <label class="font-bold block">Vorname</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Vorname" v-model="form.first_name" required />
            </fieldset>
            <fieldset>
              <label class="font-bold block">Nachname</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Nachname" v-model="form.last_name" required />
            </fieldset>
          </div>
          <div v-if="!isClient" class="grid lg:grid-cols-2 gap-4">
            <fieldset>
              <label class="font-bold block">E-Mail</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre E-Mail-Adresse" type="email" v-model="form.email" required />
            </fieldset>
            <fieldset>
              <label class="font-bold block">Telefonnummer</label>
              <VuePhoneNumberInput class="w-full" :translations="{ countrySelectorLabel: 'Vorwahl', phoneNumberLabel: 'Ihre Telefonnummer', example: 'Beispiel:' }" default-country-code="DE" valid-color="green" v-model="phoneInput" @update="value => form.phone = value.formattedNumber" />
            </fieldset>
          </div>
          <fieldset>
            <label class="font-bold block">Nachricht</label>
            <textarea class="border px-2 py-1 rounded-md w-full" rows="5" placeholder="Bitte beschreiben Sie hier Ihre Situation bzw. Ihren rechtlichen Beratungsbedarf möglichst genau..." v-model="form.message" />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Sicherheitsfrage: Was ist {{ securityQuestionA }} plus {{ securityQuestionB }}?</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre Antwort" v-model="form.security_question_answer" required />
          </fieldset>
          <fieldset class="flex justify-end">
            <Btn :is-disabled="!canSend" :is-loading="isLoading" @click="sendMessage">Nachricht senden</Btn>
          </fieldset>
        </form>
        <div v-show="messageSent" class="flex flex-col items-center justify-center text-center h-full w-full">
          <img class="h-auto w-24 mb-6 mt-2 lg:mt-0" src="@/assets/images/message-sent.png" />
          <h2 class="text-xl mb-2">Vielen Dank für Ihre Anfrage!</h2>
          <p class="mb-2">Ihre Nachricht wurde erfolgreich an {{ fullName }} weitergeleitet.</p>
          <p class="mb-2">Sie werden so bald wie möglich eine Rückmeldung erhalten.</p>
          <nuxt-link class="font-bold" :to="`/${profile.slug}`">Zurück zum Anwaltsprofil</nuxt-link>
        </div>
      </div>
      <div class="border p-4 rounded-md flex flex-col items-center space-y-4 mb-6 lg:mb-0 w-full lg:w-1/3" style="background-color: #f8f8f8;">
        <div class="bg-cover border border-white h-36 w-36 md:h-48 md:w-48 rounded-full" :style="`background-image: url(${profile.photo_url || require('@/assets/images/photo-default.jpeg')});`"></div>
        <div class="text-center">
          <span class="block uppercase text-sm">{{ jobTitle }}</span>
          <span class="block font-bold text-xl">{{ fullName }}</span>
          <div class="text-sm mt-2" v-if="legalFields.length">
            {{ legalFields.map(lf => lf.name).join(', ') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileNachrichtPage',
  head() {
    return {
      title: `Nachricht an ${this.fullName} - Traumanwalt`,
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app, params, redirect, route, store }) {
    const profile = await app.$axios.$get(`/api/profiles/${params.slug}`)
    if (!profile) redirect('/anwaelte')
    return {
      profile,
      phoneInput: '',
      securityQuestionA: Math.floor(Math.random() * (9 - 1)) + 1,
      securityQuestionB: Math.floor(Math.random() * (9 - 1)) + 1,
      messageSent: false,
      isLoading: false,
      form: {
        salutation: store.state.userData && store.state.userData.client ? store.state.userData.salutation : 'Herr',
        first_name: store.state.userData && store.state.userData.client ? store.state.userData.first_name : '',
        last_name: store.state.userData && store.state.userData.client ? store.state.userData.last_name : '',
        email: store.state.userData && store.state.userData.client ? store.state.userData.email : '',
        phone: store.state.userData && store.state.userData.client ? (store.state.userData.mobile_number || store.state.userData.landline_number) : '',
        message: route.query.message,
        security_question_answer: ''
      }
    }
  },
  computed: {
    isClient() {
      if (!this.$store.state.userData) return false
      return this.$store.state.userData.client
    },
    securityQuestionResult() {
      return this.securityQuestionA + this.securityQuestionB
    },
    jobTitle() {
      return this.profile.job_title
    },
    fullName() {
      return `${this.profile.first_name} ${this.profile.last_name}`
    },
    legalFields() {
      return this.profile.legal_fields
    },
    canSend() {
      return (
        this.form.salutation !== ''
        && this.form.first_name !== ''
        && this.form.last_name !== ''
        && this.form.email !== ''
        && this.form.email.indexOf('@') !== -1
        && this.form.phone !== ''
        && this.form.message !== ''
        && parseInt(this.form.security_question_answer) === this.securityQuestionResult
      )
    }
  },
  methods: {
    async sendMessage() {
      this.isLoading = true

      const text = `Neue Anfrage\n\nPfad: ${this.$route.path}\nName: ${this.form.first_name} ${this.form.last_name}\nE-Mail: ${this.form.email}\nTelefonnummer: ${this.form.phone}\nNachricht: ${this.form.message}`
      //await this.$axios.$post(`https://api.telegram.org/bot${process.env.telegramBotApiKey}/sendMessage?chat_id=${process.env.telegramBotChatId}&text=${encodeURIComponent(text)}`)

      await this.$axios.$post(`/api/profiles/${this.profile.slug}/contact`, {
        salutation: this.form.salutation,
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        phone: this.form.phone,
        message: this.form.message,
        from_id: this.$store.state.userData && this.$store.state.userData.client ? this.$store.state.userData.id : null,
        sqa: this.securityQuestionA,
        sqb: this.securityQuestionB,
        sqn: parseInt(this.form.security_question_answer)
      })

      this.isLoading = false
      this.messageSent = true
    }
  }
}
</script>
