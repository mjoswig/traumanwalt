<template>
  <div>
    <h1>{{ legalService.name }}</h1>
  </div>
</template>

<script>
export default {
  name: 'RechtsdienstleistungenDetailsPage',
  head() {
    return {
      title: `${this.legalService.name} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect }) {
    const legalService = await app.$axios.$get(`/api/legal-services/${params.slug}`)
    if (!legalService) redirect('/rechtsberatung')
    return {
      legalService
    }
  }
}
</script>