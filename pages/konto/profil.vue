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
    <AccountSection heading="Kontaktdaten">
      <form @submit.prevent>
        <div class="grid grid-cols md:grid-cols-2 xl:grid-cols-4 gap-4">
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
        </div>
        <div class="flex justify-end mt-5">
          <Btn :is-loading="contactDetailsForm.isLoading" @click="saveContactDetails">Speichern</Btn>
        </div>
      </form>
    </AccountSection>
  </div>
</template>

<script>
import countryData from '@/assets/json/countries.json'

export default {
  name: 'KontoProfilPage',
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
    }
  }
}
</script>
