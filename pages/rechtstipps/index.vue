<template>
  <div>
    <section class="md:text-center mb-4 md:mb-12">
      <h1 class="mb-2">Rechtstipps von Traumanwälten</h1>
      <p class="text-xl">Hier finden Sie gut verständliche Rechtstipps zu allen wichtigen Rechtsgebieten.</p>
    </section>
    <section class="flex flex-col space-y-4 md:space-y-8">
      <nuxt-link class="legal-guide" :to="`/rechtstipps/${legalGuide.slug}`" v-for="(legalGuide, index) in legalGuides" :key="index">
        <div class="border p-4 lg:p-6 rounded-md shadow-md flex flex-col space-y-4 lg:flex-row lg:space-y-0">
          <div class="lg:w-96 lg:mr-6">
            <img class="bg-cover bg-center border h-48 w-full sm:h-64 lg:h-48 lg:w-96 rounded-lg" :style="`background-image: url(${legalGuide.thumbnail_url || legalGuide.user_photo_url});`" />
          </div>
          <div class="w-full">
            <h2 class="mb-2">{{ legalGuide.title }}</h2>
            <span class="text-gray-500">{{ $moment(legalGuide.created_at).format('DD.MM.YYYY, HH:mm')  }} von {{ getFullName(legalGuide) }}</span>
            <p class="mt-2 lg:mt-4" v-html="getExcerpt(legalGuide.content)"></p>
          </div>
        </div>
      </nuxt-link>
      <a class="cursor-pointer flex items-center space-x-2" v-show="legalGuides.length > 0 && legalGuides.length < legalGuides[0].total_count" @click="loadMore">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
        </svg>
        <span>Ältere Rechtstipps laden</span>
      </a>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RechtstippsIndexPage',
  head() {
    return {
      title: 'Rechtstipps - Traumanwalt'
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
  methods: {
    getFullName(legalGuide) {
      let fullName = []
      if (legalGuide.user_salutation === 'Frau') {
        fullName.push('Rechtsanwältin')
      } else {
        fullName.push('Rechtsanwalt')
      }
      fullName.push(legalGuide.user_first_name)
      fullName.push(legalGuide.user_last_name)
      return fullName.join(' ')
    },
    getExcerpt(content) {
      return content.split(' ').slice(0, 55).join(' ') + '...'
    },
    async loadMore() {
      this.page++
      const legalGuides = await this.$axios.$get(`/api/legal-guides?page=${this.page}&page_length=${this.pageLength}`)
      this.legalGuides.push(...legalGuides)
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