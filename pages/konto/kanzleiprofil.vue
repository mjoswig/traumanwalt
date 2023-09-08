<template>
  <div>
    <h1 class="mb-6">Kanzleiprofil</h1>
    <AccountSection v-if="!lawFirm" heading="Neues Kanzleiprofil" class="mb-4">
      <fieldset>
        <input class="border px-2 py-1 rounded-md w-full" placeholder="Kanzleiname eingeben" />
      </fieldset>
    </AccountSection>
    <div v-if="lawFirm">
      <AccountSection heading="Über die Kanzlei">
        <form @submit.prevent>
          <div class="flex flex-col space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0">
            <div>
              <div class="relative h-28 w-28 sm:h-44 sm:w-44">
                <div v-show="aboutForm.isUploadingLogo" class="border-4 border-white absolute top-0 left-0 h-full w-full bg-gray-700 opacity-50 rounded-full"></div>
                <img v-show="aboutForm.isUploadingLogo" class="absolute" style="top: calc(50% - 10px); left: calc(50% - 10px);" src="@/assets/images/icons/spinner-white.svg" />
                <img class="bg-cover border h-28 w-28 sm:h-44 sm:w-44 rounded-full" :style="`background-image: url(${aboutForm.logo_url || require('@/assets/images/logo-default.jpeg')});`" />
                <div class="absolute bg-blue-300 hover:bg-blue-400 p-2 rounded-full" style="bottom: 0; right: 0;">
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
    </div>
  </div>
</template>

<script>
import imageCompression from 'browser-image-compression'

export default {
  name: 'KontoKanzleiprofilPage',
  async asyncData({ app, store }) {
    const lawFirm = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/law-firm`)
    return {
      lawFirm,
      createForm: {
      },
      aboutForm: {
        logo_url: lawFirm.logo_url,
        name: lawFirm.name,
        about: lawFirm.about,
        isUploadingLogo: false,
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
      this.$toast.success('Ihr Daten wurden erfolgreich gespeichert!')
      this.aboutForm.isLoading = false
    }
  }
}
</script>
