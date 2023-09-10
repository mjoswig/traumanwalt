<template>
  <div>
    <h1 class="mb-6">Rechtstipp bearbeiten</h1>
    <AccountSection>
      <p class="mb-4">Bitte beachten Sie, dass wir nur Rechtstipps mit mindestens <span class="border-b border-gray-600">1.000 Wörtern</span> veröffentlichen können, um die Sichtbarkeit in Suchmaschinen zu verbessern.</p>
      <form @submit.prevent>
        <fieldset class="mb-4">
          <label class="font-bold">Titel</label>
          <input class="border px-2 py-1 rounded-md w-full" placeholder="Kurze Überschrift für Ihren Tipp" v-model="title" />
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
export default {
  name: 'KontoRechtstippsBearbeitenPage',
  head() {
    return {
      title: 'Rechtstipp bearbeiten - Traumanwalt'
    }
  },
  async asyncData({ app, params, redirect, store }) {
    const legalGuide = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/legal-guides/${params.id}`)
    if (!legalGuide) redirect('/konto/rechtstipps')
    return {
      id: legalGuide.id,
      title: legalGuide.title,
      content: legalGuide.content,
      published: legalGuide.published,
      isLoading: false
    }
  },
  computed: {
    wordCount() {
      if (!this.content) return 0
      return this.content.length ? this.content.split(' ').length : 0
    },
    canSubmit() {
      return !this.published || this.wordCount > 1000
    }
  },
  methods: {
    async submitGuide() {
      this.isLoading = true
      await this.$axios.$post(`/api/users/${this.$store.state.userData.firebase_uid}/legal-guides/update`, {
        id: this.id,
        title: this.title,
        content: this.content,
        published: this.published
      })
      this.$toast.success(`Ihr Rechtstipp wurde erfolgreich ${this.published ? 'veröffentlicht' : 'gespeichert'}!`)
      this.isLoading = false
    }
  }
}
</script>
