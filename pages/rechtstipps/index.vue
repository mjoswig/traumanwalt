<template>
  <div>
    <section class="md:text-center mb-4 md:mb-12">
      <h1 class="mb-2">Rechtstipps von Traumanwälten</h1>
      <p class="text-xl">Hier finden Sie gut verständliche Rechtstipps zu allen wichtigen Rechtsgebieten.</p>
    </section>
    <section class="flex flex-col space-y-4 md:space-y-8">
      <nuxt-link class="legal-guide" :to="`/rechtstipps/${legalGuide.slug}`" v-for="(legalGuide, index) in legalGuides" :key="index">
        <div class="border rounded-md shadow-md flex flex-col space-y-4 lg:flex-row lg:space-y-0" style="min-height: 250px;">
          <div class="lg:w-96">
            <div class="bg-cover bg-center h-48 w-full sm:h-64 lg:h-full lg:w-96 rounded-t-lg lg:rounded-none lg:rounded-l-lg" :style="`background-image: url(${legalGuide.thumbnail_url || legalGuide.user_photo_url});`"></div>
          </div>
          <div class="px-4 pb-4 lg:p-6 w-full">
            <h2 class="mb-2">{{ legalGuide.title }}</h2>
            <span class="text-gray-500">{{ $moment(legalGuide.created_at).format('DD.MM.YYYY, HH:mm')  }} von {{ getFullName(legalGuide) }}</span>
            <p class="mt-2 lg:mt-4" v-html="getExcerpt(legalGuide.content)"></p>
          </div>
        </div>
      </nuxt-link>
      <InfiniteScroll :enough="page >= totalPages" @load-more="loadMore" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'RechtstippsIndexPage',
  head() {
    return {
      title: 'Rechtstipps - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app }) {
    const page = 1
    const pageLength = 10
    const legalGuides = await app.$axios.$get(`/api/legal-guides?page=${page}&page_length=${pageLength}`)
    return {
      page,
      pageLength,
      legalGuides
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.legalGuides[0].total_count / this.pageLength)
    }
  },
  methods: {
    getFullName(legalGuide) {
      let fullName = []
      if (legalGuide.user_salutation === 'Frau') {
        fullName.push(legalGuide.user_job_title || 'Rechtsanwältin')
      } else {
        fullName.push(legalGuide.user_job_title || 'Rechtsanwalt')
      }
      fullName.push(legalGuide.user_first_name)
      fullName.push(legalGuide.user_last_name)
      return fullName.join(' ')
    },
    getExcerpt(content) {
      const words = content.split(' ')
      if (words.length <= 55) return content
      return words.slice(0, 55).join(' ') + '...'
    },
    async loadMore() {
      this.page++
      const legalGuides = await this.$axios.$get(`/api/legal-guides?page=${this.page}&page_length=${this.pageLength}`)
      this.legalGuides.push(...legalGuides)

      // filter out duplicates
      this.legalGuides = this.legalGuides.filter((v, i, a) => a.findIndex(v2 => (v2.slug === v.slug)) === i)
    }
  }
}
</script>

<style lang="postcss" scoped>
.legal-guide {
  @apply text-current;

  &:hover {
    @apply no-underline;
  }

  & h2 {
    &:hover {
      @apply underline;
    }
  }
}
</style>