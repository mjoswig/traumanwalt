<template>
  <div>
    <h1 class="mb-6 md:mb-8">Ihre Nachricht an {{ fullName }}</h1>
    <div class="flex flex-col-reverse lg:flex-row lg:space-x-8 lg:space-y-0">
      <form class="flex flex-col space-y-4 w-full lg:w-2/3" @submit.prevent>
        <div class="grid lg:grid-cols-3 gap-4">
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
        <div class="grid lg:grid-cols-2 gap-4">
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
        <fieldset class="flex justify-end">
          <Btn>Nachricht senden</Btn>
        </fieldset>
      </form>
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
  name: 'ProfileNachrichtPage',
  head() {
    return {
      title: `Nachricht an ${this.fullName} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect, route }) {
    const profile = await app.$axios.$get(`/api/profiles/${params.slug}`)
    if (!profile) redirect('/anwaelte')
    return {
      profile,
      phoneInput: '',
      form: {
        salutation: 'Herr',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: route.query.message
      }
    }
  },
  computed: {
    jobTitle() {
      return this.profile.job_title
    },
    fullName() {
      return `${this.profile.first_name} ${this.profile.last_name}`
    },
    lawFirm() {
      return this.profile.law_firm
    },
    legalFields() {
      return this.profile.legal_fields
    }
  },
  methods: {
    getLegalFieldName(legalField, profile) {
      if (legalField.specialized) {
        const preposition = profile.salutation === 'Frau' ? 'Fachanwältin' : 'Fachanwalt'
        return `${preposition} ${legalField.name}`
      }
      return legalField.name
    }
  }
}
</script>
