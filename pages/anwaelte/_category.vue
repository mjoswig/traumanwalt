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
    <ProfileSearch v-if="category.profiles.length" :profiles="category.profiles" :page="page" :page-length="pageLength" @loadMore="loadMore" class="mt-4 md:mt-12" />
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

    const page = 1
    const pageLength = 10
    const legalFields = await app.$axios.$get(`/api/legal-fields/${params.category}`)

    if (legalFields.length) {
      const profiles = await app.$axios.$get(`/api/legal-fields/${params.category}/profiles?page=${page}&page_length=${pageLength}`)
      category = {
        slug: params.category,
        value: legalFields[0],
        type: 'legal_fields',
        profiles
      }
    }

    if (!legalFields.length) {
      const cities = await app.$axios.$get(`/api/cities/${params.category}`)
      if (cities.length) {
        const profiles = await app.$axios.$get(`/api/cities/${params.category}/profiles?page=${page}&page_length=${pageLength}`)
        category = {
          slug: params.category,
          value: cities[0],
          type: 'cities',
          profiles
        }
      }
    }

    if (!category) redirect('/anwaelte')

    return {
      page,
      pageLength,
      category
    }
  },
  methods: {
    async loadMore() {
      let profiles = []

      if (this.category.type === 'legal_fields') {
        profiles = await this.$axios.$get(`/api/legal-fields/${this.category.slug}/profiles?page=${++this.page}&page_length=${this.pageLength}`)
      } else if (this.category.type === 'cities') {
        profiles = await this.$axios.$get(`/api/cities/${this.category.slug}/profiles?page=${++this.page}&page_length=${this.pageLength}`)
      }

      this.category.profiles.push(...profiles)

      // filter out duplicates
      this.category.profiles = this.category.profiles.filter((v, i, a) => a.findIndex(v2 => (v2.slug === v.slug)) === i)
    }
  }
}
</script>
