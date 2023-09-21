<template>
  <div>
    <div class="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-6">
      <h1>Meine Rechtstipps</h1>
      <div class="flex justify-end mb-4 lg:mb-0">
        <Btn @click="$router.push('/konto/anwalt/rechtstipps/erstellen')">Neuer Rechtstipp</Btn>
      </div>
    </div>
    <AccountSection v-if="!legalGuides.length">
      Sie haben noch keine Rechtstipps verfasst.
    </AccountSection>
    <div v-if="legalGuides.length" class="flex flex-col space-y-4">
      <AccountSection v-for="(legalGuide, index) in legalGuides" :key="index">
        <div class="flex justify-end">
          <div class="flex space-x-4 mb-4">
            <nuxt-link v-if="legalGuide.published" :to="`/rechtstipps/${legalGuide.slug}`" class="cursor-pointer" v-tooltip="'Tipp ansehen'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
              </svg>
            </nuxt-link>
            <nuxt-link :to="`/konto/anwalt/rechtstipps/${legalGuide.id}`" class="cursor-pointer" v-tooltip="'Tipp bearbeiten'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg>
            </nuxt-link>
            <a class="cursor-pointer" @click="deleteGuide(legalGuide)" v-tooltip="'Tipp löschen'">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
              </svg>
            </a>
          </div>
        </div>
        <div class="flex flex-col space-y-6 lg:flex-row lg:space-y-0">
          <div class="lg:w-96 lg:mr-8">
            <div class="bg-cover bg-center border h-48 w-full sm:h-64 lg:h-48 lg:w-96 rounded-lg" :style="`background-image: url(${legalGuide.thumbnail_url || $store.state.userData.photo_url});`"></div>
          </div>
          <div class="w-full">
            <h2><span class="text-gray-400" v-if="!legalGuide.published">Entwurf: </span>{{ legalGuide.title }}</h2>
            <span v-if="legalGuide.published" class="block mt-2 text-gray-500">Veröffentlicht: {{ $moment(legalGuide.created_at).format('DD.MM.YYYY, HH:mm')  }} &bullet; Aufrufe: {{ legalGuide.views }}</span>
            <p class="mt-4" v-html="getExcerpt(legalGuide.content)"></p>
          </div>
        </div>
      </AccountSection>
      <a class="cursor-pointer flex items-center space-x-2" v-show="legalGuides.length > 0 && legalGuides.length < legalGuides[0].total_count" @click="loadMore">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
        <span>Ältere Rechtstipps laden</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KontoRechtstippsPage',
  head() {
    return {
      title: 'Meine Rechtstipps - Traumanwalt'
    }
  },
  async asyncData({ app, store }) {
    const page = 1
    const pageLength = 10
    const legalGuides = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/legal-guides?page=${page}&page_length=${pageLength}`)
    return {
      page,
      pageLength,
      legalGuides
    }
  },
  computed: {
    fullName() {
      let fullName = []
      if (this.$store.state.userData.salutation === 'Frau') {
        fullName.push('Rechtsanwältin')
      } else {
        fullName.push('Rechtsanwalt')
      }
      fullName.push(this.$store.state.userData.first_name)
      fullName.push(this.$store.state.userData.last_name)
      return fullName.join(' ')
    }
  },
  methods: {
    getExcerpt(content) {
      const words = content.split(' ')
      if (words.length <= 55) return content
      return words.slice(0, 55).join(' ') + '...'
    },
    async deleteGuide(guide) {
      if (window.confirm('Möchten Sie diesen Rechtstipp wirklich löschen? Der Tipp kann nicht wiederhergestellt werden.')) {
        if (guide.thumbnail_url && guide.thumbnail_url.indexOf('google') !== -1) {
        await this.$firebaseStorage.remove(guide.thumbnail_url)
      }
        await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/legal-guides/${guide.id}/delete`)
        this.$toast.success('Ihr Rechtstipp wurde erfolgreich gelöscht!')
        window.location.href = '/konto/anwalt/rechtstipps'
      }
    },
    async loadMore() {
      this.page++
      const legalGuides = await this.$axios.$get(`/api/users/${this.$store.state.userData.firebase_uid}/legal-guides?page=${this.page}&page_length=${this.pageLength}`)
      this.legalGuides.push(...legalGuides)
    }
  }
}
</script>
