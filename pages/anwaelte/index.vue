<template>
  <div>
    <h1 class="mb-8">Anwaltssuche</h1>
    <AttorneySearch :attorneys="attorneys" />
  </div>
</template>

<script>
export default {
  name: 'AnwaelteIndexPage',
  async asyncData({ app }) {
    const attorneys = await app.$axios.$get('/api/attorneys')
    return {
      attorneys
    }
  }
}
</script>
