<template>
  <div>
    <h1 class="mb-6 md:mb-8">Bewerten Sie {{ fullName }}</h1>
    <div class="flex flex-col-reverse lg:flex-row lg:space-x-8 lg:space-y-0">
      <div class="w-full lg:w-2/3">
        <form v-show="!reviewSent" class="flex flex-col space-y-4 w-full" @submit.prevent>
          <fieldset>
            <label class="font-bold block">Wie bewerten Sie den Anwalt?</label>
            <star-rating :show-rating="false" :star-size="30" v-model="form.rating" />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Überschrift Ihrer Bewertung (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre Bewertung mit wenigen Worten" v-model="form.title" />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Beschreiben Sie Ihre Erfahrung</label>
            <textarea class="border px-2 py-1 rounded-md w-full" rows="5" placeholder="Bitte beschreiben Sie hier Ihre Erfahrung mit dem Anwalt..." v-model="form.description" />
          </fieldset>
          <fieldset v-if="!isClient">
            <label class="font-bold block">Name (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Vor- und Nachname" v-model="form.author" />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Sicherheitsfrage: Was ist {{ securityQuestionA }} plus {{ securityQuestionB }}?</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre Antwort" v-model="form.security_question_answer" required />
          </fieldset>
          <fieldset class="flex justify-end">
            <Btn :is-disabled="!canSend" :is-loading="isLoading" @click="sendReview">Bewertung absenden</Btn>
          </fieldset>
        </form>
        <div v-show="reviewSent" class="flex flex-col items-center justify-center text-center h-full w-full">
          <img class="h-auto w-24 mb-6 mt-2 lg:mt-0" src="@/assets/images/message-sent.png" />
          <h2 class="text-xl mb-2">Vielen Dank für Ihre Bewertung!</h2>
          <p class="mb-2">Ihre Bewertung für {{ fullName }} wurde erfolgreich eingereicht.</p>
          <nuxt-link class="font-bold" :to="`/${profile.slug}`">Zurück zum Anwaltsprofil</nuxt-link>
        </div>
      </div>
      <div class="bg-gray-100 border p-4 rounded-md flex flex-col items-center space-y-4 mb-6 lg:mb-0 w-full lg:w-1/3">
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
  name: 'ProfileBewertenPage',
  head() {
    return {
      title: `Bewertung von ${this.fullName} - Traumanwalt`,
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app, params, redirect, store }) {
    const profile = await app.$axios.$get(`/api/profiles/${params.slug}`)
    if (!profile) redirect('/anwaelte')
    return {
      profile,
      securityQuestionA: Math.floor(Math.random() * (9 - 1)) + 1,
      securityQuestionB: Math.floor(Math.random() * (9 - 1)) + 1,
      reviewSent: false,
      isLoading: false,
      form: {
        rating: 0,
        title: '',
        description: '',
        author: store.state.userData && store.state.userData.client ? `${store.state.userData.first_name} ${store.state.userData.last_name}` : '',
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
        this.form.rating !== 0
        && this.form.description !== ''
        && parseInt(this.form.security_question_answer) === this.securityQuestionResult
      )
    }
  },
  methods: {
    async sendReview() {
      this.isLoading = true

      await this.$axios.$post(`/api/profiles/${this.profile.slug}/review`, {
        rating: this.form.rating,
        title: this.form.title,
        description: this.form.description,
        author: this.form.author,
        sqa: this.securityQuestionA,
        sqb: this.securityQuestionB,
        sqn: parseInt(this.form.security_question_answer)
      })

      this.isLoading = false
      this.reviewSent = true
    }
  }
}
</script>
