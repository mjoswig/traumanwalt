<template>
  <div>
    <h1 v-if="category.type === 'legal_fields'">Anwälte für {{ category.value.name }}</h1>
    <h1 v-if="category.type === 'cities'">Anwälte in {{ category.value.name }}</h1>
    <div>
      <p v-if="!category.profiles.length" class="mt-4">Wir haben keine Anwälte in dieser Kategorie gefunden. Sie sind Anwalt und möchten mehr Mandanten gewinnen? <nuxt-link to="/mitgliedschaft">Werden Sie jetzt Traumanwalt</nuxt-link>.</p>
      <ProfileSearch v-if="category.profiles.length" :profiles="category.profiles" class="mt-6 md:mt-8" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnwaelteCategoryPage',
  head() {
    return {
      title: `Anwälte ${this.category.value.name} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect }) {
    let category = null
    const legalFields = await app.$axios.$get(`/api/legal-fields/${params.category}`)

    if (legalFields.length) {
      const profiles = await app.$axios.$get(`/api/legal-fields/${params.category}/profiles`)
      category = {
        value: legalFields[0],
        type: 'legal_fields',
        profiles
      }
    }

    if (!legalFields.length) {
      const cities = await app.$axios.$get(`/api/cities/${params.category}`)
      if (cities.length) {
        const profiles = []
        category = {
          value: cities[0],
          type: 'cities',
          profiles
        }
      }
    }

    if (!category) redirect('/anwaelte')

    return {
      category
    }
  }
}
</script>
