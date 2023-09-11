<template>
  <div>
    <h1 class="mb-6">Nachrichtenverlauf</h1>
  </div>
</template>

<script>
export default {
  name: 'KontoNachrichtenverlaufPage',
  head() {
    return {
      title: 'Nachrichtenverlauf - Traumanwalt'
    }
  },
  async asyncData({ app, params, redirect, store }) {
    const conversation = null
    //if (!conversation) redirect('/konto/nachrichten')
    const messages = []
    return {
      conversation,
      messages
    }
  }
}
</script>
