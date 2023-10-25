<template>
  <div class="md:text-center">
    <h1 class="mb-4">Inserierung erfolgreich</h1>
    <p class="mb-4">Vielen Dank für Ihre Stellenanzeige. Sie wird in kurzer Zeit in unserer Jobbörse veröffentlicht.</p>
    <nuxt-link class="font-bold" to="/jobs">Zurück zur Jobbörse</nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'InserierungErfolgreichPage',
  head() {
    return {
      title: 'Inserierung erfolgreich - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  }
}
</script>
