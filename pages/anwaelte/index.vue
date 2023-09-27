<template>
  <div>
    <h1 class="md:text-center mb-4 md:mb-12">Finden Sie die besten Anwälte Deutschlands</h1>
    <ProfileSearch :profiles="profiles" :legal-fields="legalFields" :page="page" :page-length="pageLength" @loadMore="loadMore" />
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
      legalFields
    }
  },
  methods: {
    async loadMore() {
      const profiles = await this.$axios.$get(`/api/profiles?page=${++this.page}&page_length=${this.pageLength}`)
      this.profiles.push(...profiles)

      // filter out duplicates
      this.profiles = this.profiles.filter((v, i, a) => a.findIndex(v2 => (v2.slug === v.slug)) === i)
    }
  }
}
</script>
