<template>
  <div>
    <h1 class="md:text-center mb-2">Neue Stellenanzeige erstellen</h1>
    <p class="md:text-center text-lg lg:text-xl">Sie suchen Kollegen für Ihre Kanzlei? Schalten Sie Ihre Wunschanzeige ganz einfach online.</p>
    <form class="flex flex-col space-y-5 mt-4 md:mt-8 w-full" @submit.prevent>
      <div class="grid grid-cols lg:grid-cols-2 gap-4 w-full">
        <div class="flex flex-col space-y-4">
          <h2>Kontaktdaten</h2>
          <fieldset>
            <label class="font-bold block">Firmenname</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Firmenname" v-model="companyName" required />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Firmenlogo (optional)</label>
            <input ref="clupload" name="company-logo-upload" type="file" accept=".jpg, .jpeg, .png" @change="updatePhoto($event)" />
          </fieldset>
          <div class="grid lg:grid-cols-2 gap-4">
            <fieldset>
              <label class="font-bold block">Adresse</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Straße und Hausnummer" v-model="companyAddressLine" required />
            </fieldset>
            <fieldset>
              <label class="font-bold block">Postleitzahl</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="PLZ" v-model="companyPostalCode" required />
            </fieldset>
          </div>
          <div class="grid lg:grid-cols-2 gap-4">
            <fieldset>
              <label class="font-bold block">Stadt</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Stadt" v-model="companyCity" required />
            </fieldset>
            <fieldset>
              <label class="font-bold block">Land</label>
              <select class="border px-2 py-1 rounded-md w-full" v-model="companyCountry">
                <option v-for="(country, index) in countries" :key="index" :value="index">{{ country }}</option>
              </select>
            </fieldset>
          </div>
          <div class="grid lg:grid-cols-2 gap-4">
            <fieldset>
              <label class="font-bold block">E-Mail</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre E-Mail-Adresse" type="email" v-model="companyEmail" required />
            </fieldset>
            <fieldset>
              <label class="font-bold block">Telefonnummer</label>
              <VuePhoneNumberInput class="w-full" :translations="{ countrySelectorLabel: 'Vorwahl', phoneNumberLabel: 'Ihre Telefonnummer', example: 'Beispiel:' }" default-country-code="DE" valid-color="green" v-model="companyPhoneInput" @update="value => phone = value.formattedNumber" />
            </fieldset>
          </div>
          <div class="grid lg:grid-cols-2 gap-4">
            <fieldset>
              <label class="font-bold block">Webseite (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihre Webseite" type="url" v-model="companyWebsiteUrl" />
            </fieldset>
            <fieldset>
              <label class="font-bold block">LinkedIn (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.linkedin.com/company/kanzlei-mustermann/" type="url" v-model="companyLinkedInUrl" />
            </fieldset>
          </div>
        </div>
        <div class="flex flex-col space-y-4">
          <h2>Stellenanzeige</h2>
          <fieldset>
            <label class="font-bold block">Stellenbezeichnung</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Stellenbezeichnung (z.B. Rechtsanwalt/Rechtsanwältin (m/w/d))" v-model="jobTitle" required />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Stellenbeschreibung</label>
            <wysiwyg class="w-full" placeholder="Stellenbeschreibung" v-model="jobDescription" required />
          </fieldset>
          <div class="grid grid-cols-2 gap-4">
            <fieldset>
              <label class="font-bold block">Jobtyp</label>
              <select class="border px-2 py-1 rounded-md w-full" v-model="jobTypeId">
                <option value="">Bitte auswählen...</option>
                <option></option>
              </select>
            </fieldset>
            <fieldset>
              <label class="font-bold block">Arbeitszeit</label>
              <select class="border px-2 py-1 rounded-md w-full" v-model="jobEmploymentTypeId">
                <option value="">Bitte auswählen...</option>
                <option></option>
              </select>
            </fieldset>
            <fieldset>
              <label class="font-bold block">Rechtsgebiet (optional)</label>
              <select class="border px-2 py-1 rounded-md w-full" v-model="jobLegalFieldId">
                <option value="">Bitte auswählen...</option>
                <option v-for="(legalField, index) in legalFields" :key="index" :value="legalField.id">{{ legalField.name }}</option>
              </select>
            </fieldset>
            <fieldset>
              <label class="font-bold block">Ort (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Ort" v-model="jobLocation" />
            </fieldset>
          </div>
          <fieldset>
            <label class="font-bold block">Laufzeit und Angebotspreis</label>
            <p>Ihre Anzeige ist für <b>60 Tage</b> online und kostet <b>299,00 € zzgl. MwSt.</b></p>
          </fieldset>
        </div>
      </div>
      <fieldset class="flex justify-end">
        <Btn>Jetzt veröffentlichen – 299,00 €</Btn>
      </fieldset>
    </form>
  </div>
</template>

<script>
import countryData from '@/assets/json/countries.json'

export default {
  name: 'JobsInserierenPage',
  head() {
    return {
      title: 'Stellenanzeige erstellen - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app }) {
    const jobTypes = await app.$axios.$get('/api/jobs/types')
    const employmentTypes = await app.$axios.$get('/api/jobs/employment-types')
    const legalFields = await app.$axios.$get('/api/legal-fields')
    return {
      countries: countryData.countries,
      jobTypes,
      employmentTypes,
      legalFields,
      companyName: '',
      companyLogoUrl: '',
      companyAddressLine: '',
      companyPostalCode: '',
      companyCity: '',
      companyCountry: 'DE',
      companyEmail: '',
      companyPhone: '',
      companyPhoneInput: '',
      companyWebsiteUrl: '',
      companyLinkedInUrl: '',
      jobTitle: '',
      jobDescription: '',
      jobTypeId: '',
      jobEmploymentTypeId: '',
      jobLegalFieldId: '',
      jobLocation: ''
    }
  }
}
</script>