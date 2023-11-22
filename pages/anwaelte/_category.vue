<template>
  <div>
    <div class="md:text-center mb-4 md:mb-12">
      <h1 v-if="categories.length === 2">Die besten Anwälte für {{ categories[0].name }} in {{ categories[1].name }}</h1>
      <h1 v-if="categories.length === 1 && categories[0].type === 'legal_field'">Die besten Anwälte für {{ categories[0].name }}</h1>
      <h1 v-if="categories.length === 1 && categories[0].type === 'city'">Die besten Anwälte in {{ categories[0].name }}</h1>
    </div>
    <ProfileSearch :profiles="profiles" :legal-fields="legalFields" :page="page" :page-length="pageLength" @loadMore="updateProfiles(true)" @updateFilters="updateFilters" />
  </div>
</template>

<script>
export default {
  name: 'AnwaelteCategoryPage',
  head() {
    return {
      title: `${this.seoTitle} - Traumanwalt`,
      description: `Finden Sie die besten ${this.seoTitle} in unserem Anwaltsverzeichnis. Jetzt kontaktieren und beraten lassen!`,
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app, params, redirect }) {
    const page = 1
    const pageLength = 10
    const profiles = await app.$axios.$get(`/api/profiles/category/${params.category}`)
    const legalFields = await app.$axios.$get('/api/legal-fields')

    if (!profiles.categories) redirect('/anwaelte')

    return {
      page,
      pageLength,
      profiles: profiles.profiles,
      categories: profiles.categories,
      slug: params.category,
      legalFields,
      filters: {
        sortValue: '',
        legalFieldSlug: '',
        specializedLegalFieldSlug: '',
        minAverageRating: 0,
        minReviews: 0
      }
    }
  },
  computed: {
    seoTitle() {
      const totalCount = this.profiles.length ? parseInt(this.profiles[0].total_count) : 0
      if (this.categories.length === 1 && this.categories[0].type === 'legal_field') return `${totalCount !== 0 ? `${totalCount} ` : ''}${totalCount !== 1 ? 'Anwälte' : 'Anwalt'} für ${this.categories[0].name}`
      if (this.categories.length === 1 && this.categories[0].type === 'city') return `${totalCount !== 0 ? `${totalCount} ` : ''}${totalCount !== 1 ? 'Anwälte' : 'Anwalt'} in ${this.categories[0].name}`
      return `Anwälte für ${this.categories[0].name} in ${this.categories[1].name}`
    }
  },
  methods: {
    async updateFilters(filters) {
      this.filters = filters
      await this.updateProfiles()
    },
    async updateProfiles(loadMore = false) {
      if (!loadMore) {
        this.page = 1
      } else {
        ++this.page
      }

      let requestUrl = `/api/profiles/category/${this.slug}/?page=${this.page}&page_length=${this.pageLength}`

      if (this.filters.sortValue) {
        requestUrl += `&sort=${this.filters.sortValue}`
      }

      if (this.filters.legalFieldSlug) {
        requestUrl += `&legal_field=${this.filters.legalFieldSlug}`
      }

      if (this.filters.specializedLegalFieldSlug) {
        requestUrl += `&specialized_legal_field=${this.filters.specializedLegalFieldSlug}`
      }

      if (this.filters.minAverageRating) {
        requestUrl += `&min_average_rating=${this.filters.minAverageRating}`
      }

      if (this.filters.minReviews) {
        requestUrl += `&min_reviews=${this.filters.minReviews}`
      }

      const profiles = await this.$axios.$get(requestUrl)

      if (!loadMore) {
        this.profiles = profiles.profiles
      } else {
        this.profiles.push(...profiles.profiles)

        // filter out duplicates
        this.profiles = this.profiles.filter((v, i, a) => a.findIndex(v2 => (v2.slug === v.slug)) === i)
      }
    }
  }
}
</script>
