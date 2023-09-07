<template>
  <div>
    <h1 class="mb-6">Mein Profil</h1>
    <AccountSection heading="Persönliche Daten" class="mb-4">
      <form @submit.prevent>
        <div class="grid grid-cols md:grid-cols-2 xl:grid-cols-3 gap-4">
          <fieldset>
            <label class="font-bold">Anrede</label>
            <select class="border px-2 py-1 rounded-md w-full" v-model="personalDetailsForm.salutation">
              <option value="Herr">Herr</option>
              <option value="Frau">Frau</option>
            </select>
          </fieldset>
          <fieldset>
            <label class="font-bold">Berufstitel (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="z.B. Rechtsanwalt" v-model="personalDetailsForm.job_title" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Titel (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="z.B. Dr." v-model="personalDetailsForm.academic_title" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Vorname</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Vorname" v-model="personalDetailsForm.first_name" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Nachname</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Nachname" v-model="personalDetailsForm.last_name" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Suffix (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="z.B. LL. M." v-model="personalDetailsForm.suffix_title" />
          </fieldset>
        </div>
        <div class="flex justify-end mt-5">
          <Btn :is-loading="personalDetailsForm.isLoading" @click="savePersonalDetails">Speichern</Btn>
        </div>
      </form>
    </AccountSection>
    <AccountSection heading="Kontaktdaten" class="mb-4">
      <form @submit.prevent>
        <div class="grid grid-cols md:grid-cols-2 gap-4">
          <fieldset>
            <label class="font-bold">Adresse</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Straße und Hausnummer" v-model="contactDetailsForm.address_line" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Postleitzahl</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="PLZ" v-model="contactDetailsForm.postal_code" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Stadt</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Stadt" v-model="contactDetailsForm.city" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Land</label>
            <select class="border px-2 py-1 rounded-md w-full" v-model="contactDetailsForm.country">
              <option v-for="(country, index) in countries" :key="index" :value="index">{{ country }}</option>
            </select>
          </fieldset>
          <fieldset>
            <label class="font-bold">Festnetznummer (optional)</label>
            <VuePhoneNumberInput class="w-full" :translations="{ countrySelectorLabel: 'Vorwahl', phoneNumberLabel: 'Ihre Festnetznummer', example: 'Beispiel:' }" v-model="contactDetailsForm.landline_number" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Mobilnummer (optional)</label>
            <VuePhoneNumberInput class="w-full" :translations="{ countrySelectorLabel: 'Vorwahl', phoneNumberLabel: 'Ihre Mobilnummer', example: 'Beispiel:' }" v-model="contactDetailsForm.mobile_number" />
          </fieldset>
          <fieldset>
            <label class="font-bold">E-Mail (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre E-Mail" type="email" v-model="contactDetailsForm.contact_email" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Webseite (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre Webseite" type="url" v-model="contactDetailsForm.website_url" />
          </fieldset>
          <fieldset>
            <label class="font-bold">LinkedIn (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.linkedin.com/in/max-mustermann-123456789/" type="url" v-model="contactDetailsForm.linkedin_url" />
          </fieldset>
          <fieldset>
            <label class="font-bold">XING (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.xing.com/profile/Max_Mustermann/" type="url" v-model="contactDetailsForm.xing_url" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Facebook (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.facebook.com/max.mustermann/" type="url" v-model="contactDetailsForm.facebook_url" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Twitter (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="https://twitter.com/max_mustermann" type="url" v-model="contactDetailsForm.twitter_url" />
          </fieldset>
          <fieldset>
            <label class="font-bold">Instagram (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.instagram.com/max_mustermann/" type="url" v-model="contactDetailsForm.instagram_url" />
          </fieldset>
          <fieldset>
            <label class="font-bold">YouTube (optional)</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.youtube.com/@Max_Mustermann" type="url" v-model="contactDetailsForm.youtube_url" />
          </fieldset>
        </div>
        <div class="flex justify-end mt-5">
          <Btn :is-loading="contactDetailsForm.isLoading" @click="saveContactDetails">Speichern</Btn>
        </div>
      </form>
    </AccountSection>
    <AccountSection heading="Über mich" class="mb-4">
      <form @submit.prevent>
        <wysiwyg class="w-full" placeholder="Schreiben Sie ein paar Worte über sich selbst und Ihrer Tätigkeit als Anwalt..." v-model="aboutForm.about" />
        <div class="flex justify-end mt-5">
          <Btn :is-loading="aboutForm.isLoading" @click="saveAbout">Speichern</Btn>
        </div>
      </form>
    </AccountSection>
    <AccountSection :heading="`Rechtsgebiete (${legalFieldsForm.userLegalFields.length}/10)`" class="mb-4">
      <form class="flex flex-col space-y-4" @submit.prevent>
        <div v-for="(userLegalField, index) in legalFieldsForm.userLegalFields" :key="index">
          <div class="flex lg:items-center space-x-4">
            <div class="mt-1 lg:mt-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-trash-fill hover:text-red-500 cursor-pointer h-5 w-5" viewBox="0 0 16 16" @click="removeLegalField(index)">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </div>
            <div class="flex flex-col space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0">
              <div>
                <select class="border px-2 py-1 rounded-md w-full" v-model="userLegalField.id">
                  <option :value="null">Bitte auswählen...</option>
                  <option v-for="(lf, index) in allLegalFields" :key="index" :value="lf.id">{{ lf.name }}</option>
                </select>
              </div>
              <div class="flex items-center space-x-2 mt-2">
                <input class="h-4 w-4" type="checkbox" v-model="userLegalField.specialized" />
                <label>Fachanwaltschaft</label>
              </div>
            </div>
          </div>
        </div>
        <a v-show="legalFieldsForm.userLegalFields.length < 10" class="cursor-pointer flex items-center space-x-2" @click="addLegalField">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
          </svg>
          <span>Rechtsgebiet hinzufügen</span>
        </a>
        <div class="flex justify-end">
          <Btn :is-loading="legalFieldsForm.isLoading" @click="saveLegalFields">Speichern</Btn>
        </div>
      </form>
    </AccountSection>
    <AccountSection heading="Sprachen" class="mb-4">
      <form @submit.prevent>
        <fieldset class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div class="flex items-start space-x-2" v-for="(language, index) in allLanguages" :key="index">
            <div>
              <input class="mt-1 h-4 w-4" type="checkbox" v-model="languagesForm.userLanguages['lang-' + language.id].checked" />
            </div>
            <label>{{ language.name }}</label>
          </div>
        </fieldset>
        <div class="flex justify-end mt-5">
          <Btn :is-loading="languagesForm.isLoading" @click="saveLanguages">Speichern</Btn>
        </div>
      </form>
    </AccountSection>
    <AccountSection heading="Mitgliedschaften">
      <no-ssr>
        <vue-tags-input class="w-full" placeholder="Mitgliedschaft eingeben und mit Enter bestätigen" v-model="membershipsForm.membership" :tags="membershipsForm.userMemberships" @tags-changed="newUserMemberships => membershipsForm.userMemberships = newUserMemberships" />
      </no-ssr>
      <div class="flex justify-end mt-5">
        <Btn :is-loading="membershipsForm.isLoading" @click="saveMemberships">Speichern</Btn>
      </div>
    </AccountSection>
  </div>
</template>

<script>
import countryData from '@/assets/json/countries.json'

export default {
  name: 'KontoProfilPage',
  async asyncData({ app, store }) {
    const allLanguages = await app.$axios.$get('/api/languages')
    const allLegalFields = await app.$axios.$get('/api/legal-fields')
    const userLanguages = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/languages`)
    const userLegalFields = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/legal-fields`)
    return {
      allLanguages,
      allLegalFields,
      userLanguages,
      countries: countryData.countries,
      personalDetailsForm: {
        salutation: store.state.userData.salutation,
        job_title: store.state.userData.job_title,
        academic_title: store.state.userData.academic_title,
        first_name: store.state.userData.first_name,
        last_name: store.state.userData.last_name,
        suffix_title: store.state.userData.suffix_title,
        isLoading: false
      },
      contactDetailsForm: {
        address_line: store.state.userData.address_line,
        postal_code: store.state.userData.postal_code,
        city: store.state.userData.city,
        country: store.state.userData.country,
        landline_number: store.state.userData.landline_number,
        mobile_number: store.state.userData.mobile_number,
        contact_email: store.state.userData.contact_email,
        website_url: store.state.userData.website_url,
        linkedin_url: store.state.userData.linkedin_url,
        xing_url: store.state.userData.xing_url,
        facebook_url: store.state.userData.facebook_url,
        twitter_url: store.state.userData.twitter_url,
        instagram_url: store.state.userData.instagram_url,
        youtube_url: store.state.userData.youtube_url,
        isLoading: false
      },
      aboutForm: {
        about: store.state.userData.about,
        isLoading: false
      },
      legalFieldsForm: {
        userLegalFields,
        isLoading: false
      },
      languagesForm: {
        userLanguages: {},
        isLoading: false
      },
      membershipsForm: {
        membership: '',
        userMemberships: store.state.userData.memberships ? store.state.userData.memberships.split(';') : [],
        isLoading: false
      }
    }
  },
  methods: {
    async savePersonalDetails() {
      this.personalDetailsForm.isLoading = true
      await this.$axios.$post('/api/users/update', {
        ...this.$store.state.userData,
        ...this.personalDetailsForm
      })
      this.$toast.success('Ihr persönlichen Daten wurden erfolgreich gespeichert!')
      this.personalDetailsForm.isLoading = false
    },
    async saveContactDetails() {
      this.contactDetailsForm.isLoading = true
      await this.$axios.$post('/api/users/update', {
        ...this.$store.state.userData,
        ...this.contactDetailsForm
      })
      this.$toast.success('Ihr Kontaktdaten wurden erfolgreich gespeichert!')
      this.contactDetailsForm.isLoading = false
    },
    async saveAbout() {
      this.aboutForm.isLoading = true
      await this.$axios.$post('/api/users/update', {
        ...this.$store.state.userData,
        ...this.aboutForm
      })
      this.$toast.success('Ihr Daten wurden erfolgreich gespeichert!')
      this.aboutForm.isLoading = false
    },
    async saveLegalFields() {
      this.legalFieldsForm.isLoading = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/legal-fields/update`, {
        legal_fields: this.legalFieldsForm.userLegalFields
      })
      this.$toast.success('Ihre Rechtsgebiete wurden erfolgreich gespeichert!')
      this.legalFieldsForm.isLoading = false
    },
    addLegalField() {
      this.legalFieldsForm.userLegalFields.push({
        id: null,
        specialized: false
      })
    },
    removeLegalField(index) {
      this.legalFieldsForm.userLegalFields = this.legalFieldsForm.userLegalFields.filter((ulf, ulfIndex) => ulfIndex !== index)
    },
    async saveLanguages() {
      this.languagesForm.isLoading = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/languages/update`, {
        languages: this.languagesForm.userLanguages
      })
      this.$toast.success('Ihre Sprachen wurden erfolgreich gespeichert!')
      this.languagesForm.isLoading = false
    },
    generateUserLanguages() {
      const userLanguages = {}
      this.allLanguages.forEach(lang => {
        const userLanguage = this.userLanguages.find(ul => ul.id === lang.id)
        userLanguages['lang-' + lang.id] = {
          id: lang.id,
          name: lang.name,
          checked: userLanguage ? true : false
        }
      })
      this.languagesForm.userLanguages = userLanguages
      this.languagesForm.userLanguages = JSON.parse(JSON.stringify(this.languagesForm.userLanguages))
    },
    async saveMemberships() {
      this.membershipsForm.isLoading = true
      const memberships = this.membershipsForm.userMemberships.map(m => m.text)
      await this.$axios.$post('/api/users/update', {
        ...this.$store.state.userData,
        memberships: memberships.join(';')
      })
      this.$toast.success('Ihre Mitgliedschaften wurden erfolgreich gespeichert!')
      this.membershipsForm.isLoading = false
    }
  },
  created() {
    this.generateUserLanguages()
  }
}
</script>
