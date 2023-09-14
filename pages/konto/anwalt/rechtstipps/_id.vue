<template>
  <div>
    <h1 class="mb-6">Rechtstipp bearbeiten</h1>
    <AccountSection>
      <p class="mb-4">Bitte beachten Sie, dass wir nur Beiträge mit mindestens <span class="border-b border-gray-600">1.000 Wörtern</span> veröffentlichen, um die Sichtbarkeit Ihrer Beiträge in Suchmaschinen gewährleisten zu können.</p>
      <form @submit.prevent>
        <fieldset class="mb-4">
          <label class="font-bold">Titel</label>
          <input class="border px-2 py-1 rounded-md w-full" placeholder="Kurze Überschrift für Ihren Tipp" v-model="title" />
        </fieldset>
        <fieldset class="mb-4">
          <label class="block font-bold mb-1">Titelbild (optional)</label>
          <div>
            <input ref="thupload" name="thumbnail-upload" type="file" accept=".jpg, .jpeg, .png" @change="updateThumbnail($event)" />
            <img v-show="thumbnailUrl" class="h-28 w-auto mt-4" :src="thumbnailUrl" />
            <a v-show="thumbnailUrl" class="flex items-center space-x-2 cursor-pointer mt-4" @click="removeThumbnail">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16" @click="removeLegalField(index)">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
              <span>Titelbild entfernen</span>
            </a>
          </div>
        </fieldset>
        <fieldset class="mb-4">
          <label class="font-bold">Inhalt</label>
          <wysiwyg class="mb-1 w-full" placeholder="Schreiben Sie über einen interessanten Fall oder ein Rechtsthema, welches potentielle Mandanten interessieren könnte..." v-model="content" />
          <span class="text-gray-500 text-sm"><b>Wortanzahl:</b> {{ wordCount }}</span>
        </fieldset>
        <fieldset>
          <label class="font-bold">Status</label>
          <select class="border px-2 py-1 rounded-md w-full" v-model="published">
            <option :value="false">Entwurf</option>
            <option :value="true">Veröffentlicht</option>
          </select>
        </fieldset>
        <div class="flex justify-end mt-5">
          <Btn :is-disabled="!canSubmit" :is-loading="isLoading" @click="submitGuide">{{ published ? 'Veröffentlichen' : 'Speichern' }}</Btn>
        </div>
      </form>
    </AccountSection>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import imageCompression from 'browser-image-compression'

export default {
  name: 'KontoRechtstippsBearbeitenPage',
  head() {
    return {
      title: 'Rechtstipp bearbeiten - Traumanwalt'
    }
  },
  async asyncData({ app, params, redirect, store }) {
    const legalGuide = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/legal-guides/${params.id}`)
    if (!legalGuide) redirect('/konto/anwalt/rechtstipps')
    return {
      legalGuide,
      id: legalGuide.id,
      title: legalGuide.title,
      slug: legalGuide.slug,
      thumbnailUrl: legalGuide.thumbnail_url,
      content: legalGuide.content,
      published: legalGuide.published,
      isUploading: false,
      isLoading: false
    }
  },
  computed: {
    wordCount() {
      if (!this.content) return 0
      return this.content.length ? this.content.split(' ').length : 0
    },
    canSubmit() {
      return (!this.published || this.wordCount > 1000) && !this.isUploading
    }
  },
  methods: {
    async updateThumbnail(e) {
      const files = e.target.files || e.dataTransfer.files
      if (!files.length) return

      this.isUploading = true

      // compress image to less than 500kb
      const compressedFile = await imageCompression(files[0], {
        maxSizeMB: 0.5,
        useWebWorker: true
      })

      // delete previous image from firebase storage
      if (this.thumbnailUrl && this.thumbnailUrl.indexOf('google') !== -1) {
        await this.$firebaseStorage.remove(this.thumbnailUrl)
      }

      this.thumbnailUrl = await this.$firebaseStorage.write(`/users/${this.$store.state.authUser.uid}/${uuidv4()}`, compressedFile)

      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/legal-guides/update`, {
        ...this.legalGuide,
        thumbnail_url: this.thumbnailUrl
      })

      this.isUploading = false
      this.$toast.success('Titelbild aktualisiert')
    },
    async removeThumbnail() {
      // delete previous image from firebase storage
      if (this.thumbnailUrl && this.thumbnailUrl.indexOf('google') !== -1) {
        await this.$firebaseStorage.remove(this.thumbnailUrl)
      }

      this.thumbnailUrl = null

      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/legal-guides/update`, {
        ...this.legalGuide,
        thumbnail_url: this.thumbnailUrl
      })

      this.$toast.success('Titelbild entfernt')
    },
    async submitGuide() {
      this.isLoading = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/legal-guides/update`, {
        id: this.id,
        title: this.title,
        slug: this.slug,
        thumbnail_url: this.thumbnailUrl,
        content: this.content,
        published: this.published
      })
      this.$toast.success(`Ihr Rechtstipp wurde erfolgreich ${this.published ? 'veröffentlicht' : 'gespeichert'}!`)
      this.isLoading = false
    }
  }
}
</script>
