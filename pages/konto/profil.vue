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
        <wysiwyg class="w-full" placeholder="Schreiben Sie ein paar Worte über sich selbst..." v-model="aboutForm.about" />
        <div class="flex justify-end mt-5">
          <Btn :is-loading="aboutForm.isLoading" @click="saveAbout">Speichern</Btn>
        </div>
      </form>
    </AccountSection>
    <AccountSection heading="Rechtsgebiete" class="mb-4">
      <form class="flex flex-col space-y-4" @submit.prevent>
        <div v-for="(userLegalField, index) in legalFieldsForm.userLegalFields" :key="index">
          <div class="flex lg:items-center space-x-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash-fill cursor-pointer mt-1 lg:mt-0" viewBox="0 0 16 16" @click="removeLegalField(userLegalField.legal_field_id)">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
            <div class="flex flex-col space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0">
              <div>
                <select class="border px-2 py-1 rounded-md w-full" v-model="userLegalField.legal_field_id">
                  <option :value="null">Bitte auswählen...</option>
                  <option v-for="(lf, index) in allLegalFields" :key="index" :value="lf.id">{{ lf.name }}</option>
                </select>
              </div>
              <div class="flex items-center space-x-2 mt-2">
                <input class="h-5 w-5" type="checkbox" v-model="userLegalField.specialized" />
                <label>Fachanwaltschaft</label>
              </div>
            </div>
          </div>
        </div>
        <a class="block cursor-pointer" @click="addLegalField">Rechtsgebiet hinzufügen</a>
        <div class="flex justify-end">
          <Btn :is-loading="legalFieldsForm.isLoading" @click="saveLegalFields">Speichern</Btn>
        </div>
      </form>
    </AccountSection>
    <AccountSection heading="Sprachen" class="mb-4">
    </AccountSection>
    <AccountSection heading="Mitgliedschaften">
    </AccountSection>
  </div>
</template>

<script>
import countryData from '@/assets/json/countries.json'

export default {
  name: 'KontoProfilPage',
  async asyncData({ app }) {
    const allLegalFields = await app.$axios.$get('/api/legal-fields')
    return {
      allLegalFields
    }
  },
  data() {
    return {
      countries: countryData.countries,
      personalDetailsForm: {
        salutation: this.$store.state.userData.salutation,
        job_title: this.$store.state.userData.job_title,
        academic_title: this.$store.state.userData.academic_title,
        first_name: this.$store.state.userData.first_name,
        last_name: this.$store.state.userData.last_name,
        suffix_title: this.$store.state.userData.suffix_title,
        isLoading: false
      },
      contactDetailsForm: {
        address_line: this.$store.state.userData.address_line,
        postal_code: this.$store.state.userData.postal_code,
        city: this.$store.state.userData.city,
        country: this.$store.state.userData.country,
        landline_number: this.$store.state.userData.landline_number,
        mobile_number: this.$store.state.userData.mobile_number,
        contact_email: this.$store.state.userData.contact_email,
        website_url: this.$store.state.userData.website_url,
        linkedin_url: this.$store.state.userData.linkedin_url,
        xing_url: this.$store.state.userData.xing_url,
        facebook_url: this.$store.state.userData.facebook_url,
        twitter_url: this.$store.state.userData.twitter_url,
        instagram_url: this.$store.state.userData.instagram_url,
        youtube_url: this.$store.state.userData.youtube_url,
        isLoading: false
      },
      aboutForm: {
        about: this.$store.state.userData.about,
        isLoading: false
      },
      legalFieldsForm: {
        userLegalFields: [],
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
      this.$toast.success('Ihre Rechtsgebiete wurden erfolgreich gespeichert!')
      this.legalFieldsForm.isLoading = false
    },
    addLegalField() {
      this.legalFieldsForm.userLegalFields.push({
        legal_field_id: null,
        specialized: false
      })
    },
    removeLegalField(id) {
      this.legalFieldsForm.userLegalFields = this.legalFieldsForm.userLegalFields.filter(ulf => ulf.legal_field_id !== id)
    }
  }
}
</script>
