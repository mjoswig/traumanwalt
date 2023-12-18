<template>
  <div>
    <div class="breadcrumb-nav flex flex-wrap items-center text-sm md:text-base mb-6 md:mb-12">
      <nuxt-link class="mr-2" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>
      </nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mr-2" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link to="/rechtstipps">Rechtstipps</nuxt-link>
    </div>
    <div class="md:text-center mb-4 md:mb-12">
      <h1 class="mb-2">Rechtstipps von Traumanwälten</h1>
      <p class="text-xl">Hier finden Sie gut verständliche Rechtstipps zu allen wichtigen Rechtsgebieten.</p>
    </div>
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