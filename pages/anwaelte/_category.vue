<template>
  <div>
    <div class="md:text-center">
      <h1 v-if="category.type === 'legal_fields'">Die besten Anwälte für {{ category.value.name }}</h1>
      <h1 v-if="category.type === 'cities'">Die besten Anwälte in {{ category.value.name }}</h1>
      <div v-if="!category.profiles.length" class="text-lg mt-4">
        <p class="mb-2">Wir haben keine Anwälte in dieser Kategorie gefunden.</p>
        <p class="mb-6"><nuxt-link to="/anwaelte">Zurück zum Anwaltsverzeichnis</nuxt-link></p>
        <div class="hidden md:flex md:justify-center mb-6">
          <img class="h-24 w-auto" src="@/assets/images/icons/traumanwalt-icon-alt.png" />
        </div>
        <h2 class="text-xl xl:text-2xl mb-2">Sie sind Anwalt und möchten auf dieser Seite gelistet werden?</h2>
        <p>Stärken Sie Ihre Sichtbarkeit bei Google und <nuxt-link to="/mitgliedschaft">werden Sie Traumanwalt</nuxt-link>.</p>
      </div>
    </div>
    <ProfileSearch v-if="category.profiles.length" :profiles="category.profiles" class="mt-4 md:mt-12" />
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
        const profiles = await app.$axios.$get(`/api/cities/${params.category}/profiles`)
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
