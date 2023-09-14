<template>
  <div>
    <h1 class="md:text-center mb-6 md:mb-8">Anwaltssuche</h1>
    <ProfileSearch :profiles="profiles" />
  </div>
</template>

<script>
export default {
  name: 'AnwaelteIndexPage',
  head() {
    return {
      title: 'Anwaltssuche - Traumanwalt'
    }
  },
  async asyncData({ app }) {
    const profiles = await app.$axios.$get('/api/profiles')
    return {
      profiles
    }
  }
}
</script>
