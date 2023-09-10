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
          <span class="text-gray-500 text-sm"><b>Wortanzahl:</b> {{ content.length ? content.split(' ').length : 0 }}</span>
        </fieldset>
        <fieldset>
          <label class="font-bold">Status</label>
          <select class="border px-2 py-1 rounded-md w-full" v-model="published">
            <option :value="false">Entwurf</option>
            <option :value="true">Veröffentlicht</option>
          </select>
        </fieldset>
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
  async asyncData({ app, store }) {
    return {
      title: '',
      content: '',
      published: false
    }
  }
}
</script>
