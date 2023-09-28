<template>
  <div>
    <h1 class="md:text-center mb-4 md:mb-12">Finden Sie die besten Anwälte Deutschlands</h1>
    <ProfileSearch :profiles="profiles" :legal-fields="legalFields" :page="page" :page-length="pageLength" @loadMore="updateProfiles(true)" @updateFilters="updateFilters" />
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
    const page = 1
    const pageLength = 10
    const profiles = await app.$axios.$get(`/api/profiles?page=${page}&page_length=${pageLength}`)
    const legalFields = await app.$axios.$get('/api/legal-fields')
    return {
      page,
      pageLength,
      profiles,
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

      let requestUrl = `/api/profiles?page=${this.page}&page_length=${this.pageLength}`

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
        this.profiles = profiles
      } else {
        this.profiles.push(...profiles)

        // filter out duplicates
        this.profiles = this.profiles.filter((v, i, a) => a.findIndex(v2 => (v2.slug === v.slug)) === i)
      }
    }
  }
}
</script>
