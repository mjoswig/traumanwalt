<template>
  <div>
    <h1 class="mb-6">Mein Kanzleiprofil</h1>
    <AccountSection v-if="!lawFirm" heading="Neues Kanzleiprofil" class="mb-4">
      <p class="mb-4">Bitte prüfen Sie vor der Erstellung eines neuen Kanzleiprofils, ob bereits ein bestehendes Profil Ihrer Kanzlei existiert.</p>
      <form @submit.prevent>
        <fieldset class="flex flex-col lg:flex-row lg:space-x-4 mb-4">
          <div>
            <input type="radio" :value="true" v-model="createForm.joinLawFirm" />
            <label @click="createForm.joinLawFirm = true">Kanzleiprofil beitreten</label>
          </div>
          <div>
            <input type="radio" :value="false" v-model="createForm.joinLawFirm" />
            <label @click="createForm.joinLawFirm = false">Kanzleiprofil erstellen</label>
          </div>
        </fieldset>
        <fieldset v-show="createForm.joinLawFirm" class="mb-7">
          <label class="font-bold">Kanzleiname</label>
          <select class="border px-2 py-1 rounded-md w-full" v-model="createForm.lawFirmId">
            <option :value="null">Bitte auswählen...</option>
            <option v-for="(lawFirm, index) in lawFirms" :key="index" :value="lawFirm.id">{{ lawFirm.name }}</option>
          </select>
        </fieldset>
        <fieldset v-show="!createForm.joinLawFirm" class="mb-7">
          <label class="font-bold">Kanzleiname</label>
          <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Kanzleiname" v-model="createForm.lawFirmName" />
        </fieldset>
        <div class="flex justify-end">
          <Btn v-show="createForm.joinLawFirm" :is-disabled="!createForm.lawFirmId" :is-loading="createForm.isLoading" @click="joinLawFirm">Kanzleiprofil beitreten</Btn>
          <Btn v-show="!createForm.joinLawFirm" :is-disabled="!createForm.lawFirmName.length" :is-loading="createForm.isLoading" @click="createLawFirm">Kanzleiprofil erstellen</Btn>
        </div>
      </form>
    </AccountSection>
    <div v-if="lawFirm">
      <AccountSection v-if="isLawFirmAdmin" heading="Über die Kanzlei" class="mb-4">
        <form @submit.prevent>
          <div class="flex flex-col space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0">
            <div>
              <div class="relative h-28 w-28 sm:h-44 sm:w-44">
                <div v-show="aboutForm.isUploadingLogo" class="border-4 border-white absolute top-0 left-0 h-full w-full bg-gray-700 opacity-50 rounded-full"></div>
                <img v-show="aboutForm.isUploadingLogo" class="absolute" style="top: calc(50% - 10px); left: calc(50% - 10px);" src="@/assets/images/icons/spinner-white.svg" />
                <img class="bg-cover border h-28 w-28 sm:h-44 sm:w-44 rounded-full" :style="`background-image: url(${aboutForm.logo_url || require('@/assets/images/logo-default.jpeg')});`" />
                <div class="absolute bg-gray-300 hover:bg-gray-400 p-2 rounded-full" style="bottom: 0; right: 0;">
                  <input ref="lgupload" name="logo-upload" type="file" accept=".jpg, .jpeg, .png" style="opacity: 0; position: absolute; left: 0; top: 0; width: 100%;" @change="updateLogo($event)" />
                  <label for="logo-upload">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-fill" viewBox="0 0 16 16">
                      <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/>
                    </svg>
                  </label>
                </div>
              </div>
              <a v-show="aboutForm.logo_url" class="flex items-center space-x-2 cursor-pointer mt-4" @click="removeLogo">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" @click="removeLegalField(index)">
                  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                </svg>
                <span>Logo entfernen</span>
              </a>
            </div>
            <div class="w-full">
              <fieldset class="mb-4">
                <label class="font-bold">Kanzleiname</label>
                <input class="border px-2 py-1 rounded-md w-full" placeholder="Ihr Kanzleiname" v-model="aboutForm.name" />
              </fieldset>
              <fieldset class="mb-5">
                <label class="font-bold">Kanzleibeschreibung</label>
                <wysiwyg class="w-full" placeholder="Stellen Sie Ihre Kanzlei vor und präsentieren Sie Ihre Leistungen..." v-model="aboutForm.about" />
              </fieldset>
              <div class="flex justify-end">
                <Btn :is-loading="aboutForm.isLoading" @click="saveAbout">Speichern</Btn>
              </div>
            </div>
          </div>
        </form>
      </AccountSection>
      <AccountSection v-if="isLawFirmAdmin" heading="Kontaktdaten der Kanzlei">
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
                <option :value="null">Bitte auswählen...</option>
                <option v-for="(country, index) in countries" :key="index" :value="index">{{ country }}</option>
              </select>
            </fieldset>
            <fieldset>
              <label class="font-bold">Festnetznummer (optional)</label>
              <VuePhoneNumberInput class="w-full" :translations="{ countrySelectorLabel: 'Vorwahl', phoneNumberLabel: 'Festnetznummer der Kanzlei', example: 'Beispiel:' }" default-country-code="DE" valid-color="green" v-model="contactDetailsForm.landlineNumberInput" @update="value => contactDetailsForm.landline_number = value.formattedNumber" />
            </fieldset>
            <fieldset>
              <label class="font-bold">Mobilnummer (optional)</label>
              <VuePhoneNumberInput class="w-full" :translations="{ countrySelectorLabel: 'Vorwahl', phoneNumberLabel: 'Mobilnummer der Kanzlei', example: 'Beispiel:' }" default-country-code="DE" valid-color="green" v-model="contactDetailsForm.mobileNumberInput" @update="value => contactDetailsForm.mobile_number = value.formattedNumber" />
            </fieldset>
            <fieldset>
              <label class="font-bold">E-Mail (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="E-Mail der Kanzlei" type="email" v-model="contactDetailsForm.contact_email" />
            </fieldset>
            <fieldset>
              <label class="font-bold">Webseite (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="Webseite der Kanzlei" type="url" v-model="contactDetailsForm.website_url" />
            </fieldset>
            <fieldset>
              <label class="font-bold">LinkedIn (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.linkedin.com/company/kanzlei-mustermann/" type="url" v-model="contactDetailsForm.linkedin_url" />
            </fieldset>
            <fieldset>
              <label class="font-bold">XING (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.xing.com/pages/Kanzlei_Mustermann/" type="url" v-model="contactDetailsForm.xing_url" />
            </fieldset>
            <fieldset>
              <label class="font-bold">Facebook (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.facebook.com/kanzlei.mustermann/" type="url" v-model="contactDetailsForm.facebook_url" />
            </fieldset>
            <fieldset>
              <label class="font-bold">Twitter (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="https://twitter.com/kanzlei_mustermann" type="url" v-model="contactDetailsForm.twitter_url" />
            </fieldset>
            <fieldset>
              <label class="font-bold">Instagram (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.instagram.com/kanzlei_mustermann/" type="url" v-model="contactDetailsForm.instagram_url" />
            </fieldset>
            <fieldset>
              <label class="font-bold">YouTube (optional)</label>
              <input class="border px-2 py-1 rounded-md w-full" placeholder="https://www.youtube.com/@Kanzlei_Mustermann" type="url" v-model="contactDetailsForm.youtube_url" />
            </fieldset>
          </div>
          <div class="flex justify-end mt-5">
            <Btn :is-loading="contactDetailsForm.isLoading" @click="saveContactDetails">Speichern</Btn>
          </div>
        </form>
      </AccountSection>
      <AccountSection v-if="isLawFirmAdmin" heading="Kanzleikollegen" class="mt-4">
        <p>Hier können Sie alle Mitglieder sehen, die dem Kanzleiprofil beigetreten sind. Als Administrator können Sie unbefugte Mitglieder entfernen.</p>
        <div class="flex flex-wrap">
          <div class="flex flex-col items-center justify-between mr-4 mt-4" v-for="(user, index) in lawFirmUsers" :key="index">
            <div class="flex flex-col items-center">
              <img class="h-20 w-20 rounded-full mb-2" :src="user.photo_url || require('@/assets/images/photo-default.jpeg')" />
              <nuxt-link :to="`/${user.slug}`" class="block font-bold">{{ user.first_name }} {{ user.last_name }}</nuxt-link>
              <span class="block text-gray-500">{{ user.id === lawFirm.admin_id ? 'Administrator' : 'Kanzleimitglied' }}</span>
            </div>
            <a v-if="isLawFirmAdmin && user.id !== lawFirm.admin_id" class="cursor-pointer text-sm" @click="removeUser(user.id)">Entfernen</a>
          </div>
        </div>
      </AccountSection>
      <AccountSection v-if="!isLawFirmAdmin" :heading="lawFirm.name">
        <div class="flex flex-col space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0">
          <div>
            <img class="bg-cover border h-28 w-28 sm:h-44 sm:w-44 rounded-full" :style="`background-image: url(${aboutForm.logo_url || require('@/assets/images/logo-default.jpeg')});`" />
          </div>
          <div class="flex flex-col space-y-4">
            <div v-html="lawFirm.about">
            </div>
            <div>
              <h3 class="text-gray-500">Kanzleikollegen</h3>
              <div class="flex flex-wrap">
                <div class="flex flex-col items-center justify-between mr-4 mt-4" v-for="(user, index) in lawFirmUsers" :key="index">
                  <div class="flex flex-col items-center">
                    <img class="h-20 w-20 rounded-full mb-2" :style="`background-image: url(${user.photo_url || require('@/assets/images/photo-default.jpeg')});`" />
                    <nuxt-link :to="`/${user.slug}`" class="block font-bold">{{ user.first_name }} {{ user.last_name }}</nuxt-link>
                    <span class="block text-gray-500">{{ user.id === lawFirm.admin_id ? 'Administrator' : 'Kanzleimitglied' }}</span>
                  </div>
                  <a v-if="isLawFirmAdmin && user.id !== lawFirm.admin_id" class="cursor-pointer text-sm" @click="removeUser(user.id)">Entfernen</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccountSection>
      <div class="flex justify-end mt-5">
        <Btn v-if="!isLawFirmAdmin" type="danger" @click="leaveLawFirm">Kanzlei verlassen</Btn>
        <Btn v-if="isLawFirmAdmin" type="danger" @click="deleteLawFirm">Kanzlei löschen</Btn>
      </div>
    </div>
  </div>
</template>

<script>
import countryData from '@/assets/json/countries.json'
import imageCompression from 'browser-image-compression'

export default {
  name: 'KontoKanzleiprofilPage',
  head() {
    return {
      title: 'Mein Kanzleiprofil - Traumanwalt'
    }
  },
  async asyncData({ app, store }) {
    const lawFirm = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/law-firm`)
    const lawFirms = await app.$axios.$get('/api/law-firms')
    const lawFirmUsers = await app.$axios.$get(`/api/law-firms/${lawFirm.slug}/users`)
    return {
      lawFirm,
      lawFirms,
      lawFirmUsers,
      countries: countryData.countries,
      createForm: {
        lawFirmId: null,
        lawFirmName: '',
        joinLawFirm: true,
        isLoading: false
      },
      aboutForm: {
        logo_url: lawFirm.logo_url,
        name: lawFirm.name,
        about: lawFirm.about,
        isUploadingLogo: false,
        isLoading: false
      },
      contactDetailsForm: {
        address_line: lawFirm.address_line,
        postal_code: lawFirm.postal_code,
        city: lawFirm.city,
        country: lawFirm.country,
        landline_number: lawFirm.landline_number,
        mobile_number: lawFirm.mobile_number,
        landlineNumberInput: lawFirm.landline_number,
        mobileNumberInput: lawFirm.mobile_number,
        contact_email: lawFirm.contact_email,
        website_url: lawFirm.website_url,
        linkedin_url: lawFirm.linkedin_url,
        xing_url: lawFirm.xing_url,
        facebook_url: lawFirm.facebook_url,
        twitter_url: lawFirm.twitter_url,
        instagram_url: lawFirm.instagram_url,
        youtube_url: lawFirm.youtube_url,
        isLoading: false
      },
      usersForm: {
        users: lawFirm.users,
        isLoading: false
      }
    }
  },
  computed: {
    isLawFirmAdmin() {
      if (!this.lawFirm) return false
      return this.lawFirm.admin_id === this.$store.state.userData.id
    }
  },
  methods: {
    async updateLogo(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.aboutForm.isUploadingLogo = true

      // compress image to less than 500kb
      const compressedFile = await imageCompression(files[0], {
        maxSizeMB: 0.5,
        useWebWorker: true
      })

      // delete previous image from firebase storage
      if (this.aboutForm.logo_url && this.aboutForm.logo_url.indexOf('google') !== -1) {
        await this.$firebaseStorage.remove(this.aboutForm.logo_url)
      }

      this.aboutForm.logo_url = await this.$firebaseStorage.write(`/users/${this.$store.state.authUser.uid}/logo`, compressedFile)

      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/law-firm/update`, {
        ...this.lawFirm,
        logo_url: this.aboutForm.logo_url
      })

      this.aboutForm.isUploadingLogo = false
      this.$toast.success('Logo aktualisiert')
    },
    async removeLogo() {
      // delete previous image from firebase storage
      if (this.aboutForm.logo_url && this.aboutForm.logo_url.indexOf('google') !== -1) {
        await this.$firebaseStorage.remove(this.aboutForm.logo_url)
      }

      this.aboutForm.logo_url = null

      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/law-firm/update`, {
        ...this.lawFirm,
        logo_url: this.aboutForm.logo_url
      })

      this.$toast.success('Profilbild entfernt')
    },
    async saveAbout() {
      this.aboutForm.isLoading = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/law-firm/update`, {
        ...this.lawFirm,
        ...this.aboutForm
      })
      this.$toast.success('Ihre Daten wurden erfolgreich gespeichert!')
      this.aboutForm.isLoading = false
    },
    async saveContactDetails() {
      this.contactDetailsForm.isLoading = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/law-firm/update`, {
        ...this.lawFirm,
        ...this.contactDetailsForm
      })
      this.$toast.success('Ihre Kontaktdaten wurden erfolgreich gespeichert!')
      this.contactDetailsForm.isLoading = false
    },
    async removeUser(userId) {
      if (window.confirm('Möchten Sie das Mitglied wirklich von Ihrem Kanzleiprofil entfernen?')) {
        await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/law-firm/users/remove`, {
          user_id: userId
        })
        this.lawFirmUsers = await this.$axios.$get(`/api/law-firms/${this.lawFirm.slug}/users`)
        this.$toast.success('Das Kanzleimitglied wurde erfolgreich entfernt!')
      }
    },
    async deleteLawFirm() {
      if (window.confirm('Möchten Sie Ihr Kanzleiprofil wirklich löschen? Ihr Profil kann nicht wiederhergestellt werden.')) {
        await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/law-firm/delete`)
        this.$toast.success('Ihr Kanzleiprofil wurde erfolgreich gelöscht!')
        window.location.href = '/konto/anwalt/kanzleiprofil'
      }
    },
    async leaveLawFirm() {
      if (window.confirm('Möchten Sie die Kanzlei wirklich verlassen?')) {
        await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/law-firm/leave`, {
          user_id: this.$store.state.userData.id
        })
        window.location.href = '/konto/anwalt/kanzleiprofil'
      }
    },
    async joinLawFirm() {
      this.createForm.isLoading = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/law-firm/join`, {
        law_firm_id: this.createForm.lawFirmId
      })
      this.createForm.isLoading = false
      this.$toast.success('Sie sind dem ausgewählten Kanzleiprofil erfolgreich beigetreten!')
      window.location.href = '/konto/anwalt/kanzleiprofil'
    },
    async createLawFirm() {
      this.createForm.isLoading = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/law-firm/create`, {
        name: this.createForm.lawFirmName
      })
      this.createForm.isLoading = false
      this.$toast.success('Ihr Kanzleiprofil wurde erfolgreich erstellt!')
      window.location.href = '/konto/anwalt/kanzleiprofil'
    }
  }
}
</script>