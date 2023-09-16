<template>
  <div>
    <h1 class="md:text-center mb-4 md:mb-12">Finden Sie die besten Anwälte Deutschlands</h1>
    <ProfileSearch :profiles="profiles" />
  </div>
</template>

<script>
export default {
  name: 'AnwaelteIndexPage',
  head() {
    return {
      title: 'Anwaltsverzeichnis - Traumanwalt'
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
