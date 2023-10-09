<template>
  <div>
    <h1 class="md:text-center mb-2">Neue Stellenanzeige erstellen</h1>
    <p class="md:text-center text-lg lg:text-xl">Sie suchen Kollegen für Ihre Kanzlei? Schalten Sie Ihre Wunschanzeige ganz einfach online.</p>
    <form class="flex flex-col space-y-5 mt-4 md:mt-8 w-full" @submit.prevent>
      <div class="grid grid-cols lg:grid-cols-2 gap-6 md:gap-8 w-full">
        <div class="flex flex-col space-y-4">
          <h2>Kontaktdaten</h2>
          <fieldset>
            <label class="font-bold block">Firmenname</label>
            <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Firmenname" v-model="companyName" required />
          </fieldset>
          <fieldset>
            <label class="font-bold block">Firmenlogo (optional)</label>
            <input ref="clupload" name="company-logo-upload" type="file" accept=".jpg, .jpeg, .png" @change="updateCompanyLogo($event)" />
            <span v-show="isUploadingCompanyLogo" class="block text-gray-500 mt-2">Logo wird hochgeladen. Bitte warten...</span>
            <div class="mt-2" v-show="companyLogoUrl">
              <div class="border bg-white bg-center bg-no-repeat h-36 w-36 md:h-48 md:w-48 rounded-md" :style="`background-image: url(${companyLogoUrl}); background-size: 90%;`" />
              <a class="flex items-center space-x-2 cursor-pointer mt-4" @click="removeLogo">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" @click="removeLegalField(index)">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                <span>Logo entfernen</span>
              </a>
            </div>
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
              <VuePhoneNumberInput class="w-full" :translations="{ countrySelectorLabel: 'Vorwahl', phoneNumberLabel: 'Ihre Telefonnummer', example: 'Beispiel:' }" default-country-code="DE" valid-color="green" v-model="companyPhoneInput" @update="value => companyPhone = value.formattedNumber" />
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
                <option :value="null">Bitte auswählen...</option>
                <option v-for="(jobType, index) in jobTypes" :key="index" :value="jobType.id">{{ jobType.name }}</option>
              </select>
            </fieldset>
            <fieldset>
              <label class="font-bold block">Arbeitszeit</label>
              <select class="border px-2 py-1 rounded-md w-full" v-model="jobEmploymentTypeId">
                <option :value="null">Bitte auswählen...</option>
                <option v-for="(employmentType, index) in employmentTypes" :key="index" :value="employmentType.id">{{ employmentType.name }}</option>
              </select>
            </fieldset>
            <fieldset>
              <label class="font-bold block">Rechtsgebiet (optional)</label>
              <select class="border px-2 py-1 rounded-md w-full" v-model="jobLegalFieldId">
                <option :value="null">Bitte auswählen...</option>
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
        <Btn :is-disabled="!canPublish" :is-loading="isPublishing" @click="publishJob">Jetzt veröffentlichen – 299,00 €</Btn>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import countryData from '@/assets/json/countries.json'
import imageCompression from 'browser-image-compression'

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
      isUploadingCompanyLogo: false,
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
      jobTypeId: null,
      jobEmploymentTypeId: null,
      jobLegalFieldId: null,
      jobLocation: '',
      isPublishing: false
    }
  },
  computed: {
    canPublish() {
      return (
        this.companyName !== ''
        && !this.isUploadingCompanyLogo
        && this.companyAddressLine !== ''
        && this.companyPostalCode !== ''
        && this.companyCity !== ''
        && this.companyCountry !== ''
        && this.companyEmail !== ''
        && this.companyEmail.indexOf('@') !== -1
        && this.companyPhone !== ''
        && this.jobTitle !== ''
        && this.jobDescription !== ''
        && this.jobTypeId
        && this.jobEmploymentTypeId
      )
    }
  },
  methods: {
    async updateCompanyLogo(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.isUploadingCompanyLogo = true

      // compress image to less than 500kb
      const compressedFile = await imageCompression(files[0], {
        maxSizeMB: 0.5,
        useWebWorker: true
      })

      // delete previous image from firebase storage
      if (this.companyLogoUrl && this.companyLogoUrl.indexOf('google') !== -1) {
        await this.$firebaseStorage.remove(this.companyLogoUrl)
      }

      this.companyLogoUrl = await this.$firebaseStorage.write(`/jobs/logos/${uuidv4()}`, compressedFile)

      this.isUploadingCompanyLogo = false
      this.$toast.success('Firmenlogo aktualisiert')
    },
    async removeLogo() {
      // delete previous image from firebase storage
      if (this.companyLogoUrl && this.companyLogoUrl.indexOf('google') !== -1) {
        await this.$firebaseStorage.remove(this.companyLogoUrl)
      }

      this.companyLogoUrl = null

      this.$toast.success('Firmenlogo entfernt')
    },
    async publishJob() {
      this.isPublishing = true

      const job = await this.$axios.$post('/api/jobs/create', {
        company_name: this.companyName,
        company_logo_url: this.companyLogoUrl,
        company_address_line: this.companyAddressLine,
        company_postal_code: this.companyPostalCode,
        company_city: this.companyCity,
        company_country: this.companyCountry,
        company_email: this.companyEmail,
        company_phone: this.companyPhone,
        company_website_url: this.companyWebsiteUrl,
        company_linkedin_url: this.companyLinkedInUrl,
        title: this.jobTitle,
        description: this.jobDescription,
        type_id: this.jobTypeId,
        employment_type_id: this.jobEmploymentTypeId,
        legal_field_id: this.jobLegalFieldId,
        location: this.jobLocation
      })

      /*const response = await this.$axios.$post(`/api/stripe/job/pay`, {
        job_id: job.id
      })*/

      this.isPublishing = false
      window.location.href = response.url
    }
  }
}
</script>