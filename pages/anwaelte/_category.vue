<template>
  <div>
    <div class="md:text-center">
      <h1 v-if="categories.length === 2">Die besten Anwälte für {{ categories[0].name }} in {{ categories[1].name }}</h1>
      <h1 v-if="categories.length === 1 && categories[0].type === 'legal_field'">Die besten Anwälte für {{ categories[0].name }}</h1>
      <h1 v-if="categories.length === 1 && categories[0].type === 'city'">Die besten Anwälte in {{ categories[0].name }}</h1>
      <div v-if="!profiles.length" class="text-lg mt-4">
        <p class="mb-2">Wir haben keine Anwälte in dieser Kategorie gefunden.</p>
        <p class="mb-6"><nuxt-link class="font-bold" to="/anwaelte">Zurück zum Anwaltsverzeichnis</nuxt-link></p>
        <div class="hidden md:flex md:justify-center mb-6">
          <img class="h-24 w-auto" src="@/assets/images/icons/traumanwalt-icon-alt.png" />
        </div>
        <h2 class="text-xl xl:text-2xl mb-2">Sie sind Anwalt und möchten auf dieser Seite gelistet werden?</h2>
        <p>Stärken Sie Ihre Sichtbarkeit bei Google und <nuxt-link class="font-bold" to="/mitgliedschaft">werden Sie Traumanwalt</nuxt-link>.</p>
      </div>
    </div>
    <ProfileSearch v-if="profiles.length" :profiles="profiles" :page="page" :page-length="pageLength" @loadMore="loadMore" class="mt-4 md:mt-12" />
  </div>
</template>

<script>
export default {
  name: 'AnwaelteCategoryPage',
  head() {
    return {
      title: `${this.seoTitle} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect }) {
    const page = 1
    const pageLength = 10
    const profiles = await app.$axios.$get(`/api/profiles/category/${params.category}`)

    if (!profiles.categories) redirect('/anwaelte')

    return {
      page,
      pageLength,
      profiles: profiles.profiles,
      categories: profiles.categories,
      slug: params.category
    }
  },
  computed: {
    seoTitle() {
      if (this.categories.length === 1 && this.categories[0].type === 'legal_field') return `Anwälte für ${this.categories[0].name}`
      if (this.categories.length === 1 && this.categories[0].type === 'city') return `Anwälte in ${this.categories[0].name}`
      return `Anwälte für ${this.categories[0].name} in ${this.categories[1].name}`
    }
  },
  methods: {
    async loadMore() {
      const profiles = await this.$axios.$get(`/api/profiles/category/${this.slug}/?page=${++this.page}&page_length=${this.pageLength}`)
      this.profiles.push(...profiles.profiles)

      // filter out duplicates
      this.profiles = this.profiles.filter((v, i, a) => a.findIndex(v2 => (v2.slug === v.slug)) === i)
    }
  }
}
</script>
