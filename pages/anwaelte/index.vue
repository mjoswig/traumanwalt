<template>
  <div>
    <h1 class="mb-6">Anwaltssuche</h1>
    <ProfileSearch :profiles="profiles" />
  </div>
</template>

<script>
export default {
  name: 'AnwaelteIndexPage',
  async asyncData({ app }) {
    const profiles = await app.$axios.$get('/api/profiles')
    return {
      profiles
    }
  }
}
</script>
