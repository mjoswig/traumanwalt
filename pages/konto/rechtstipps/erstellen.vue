<template>
  <div>
    <h1 class="mb-6">Rechtstipp erstellen</h1>
    <AccountSection>
      <p class="mb-4">Wir empfehlen, den Tipp zuerst in Microsoft Word zu verfassen. Dann brauchen Sie ihn nur noch zu kopieren und einzufügen. Bitte beachten Sie, dass wir nur Rechtstipps mit mindestens <span class="border-b border-gray-600">1.000 Wörtern</span> veröffentlichen können, um die Sichtbarkeit in Suchmaschinen zu verbessern.</p>
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
  name: 'KontoRechtstippsErstellenPage',
  head() {
    return {
      title: 'Rechtstipp erstellen - Traumanwalt'
    }
  },
  data() {
    return {
      title: '',
      content: '',
      published: false,
      isLoading: false
    }
  },
  computed: {
    wordCount() {
      return this.content.length ? this.content.split(' ').length : 0
    },
    canSubmit() {
      return !this.published || this.wordCount > 1000
    }
  },
  methods: {
    async submitGuide() {
      this.isLoading = true
      this.$toast.success(`Ihr Rechtstipp wurde erfolgreich ${this.published ? 'veröffentlicht' : 'gespeichert'}!`)
      this.isLoading = false
    }
  }
}
</script>
