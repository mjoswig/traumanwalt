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
      <nuxt-link to="/gesetze">Gesetze</nuxt-link>
    </div>
    <div class="md:text-center mb-4 md:mb-12">
      <h1 class="mb-2">Gesetze im Überblick</h1>
      <p class="text-xl">Traumanwalt hat die wichtigsten Gesetzestexte für Sie auf dieser Seite zusammengefasst.</p>
    </div>
    <section class="flex flex-col space-y-2 md:space-y-4">
      <h2 class="block pb-2 pt-2 md:pt-0">Meistgesuchte Gesetze</h2>
      <nuxt-link :to="`/gesetze/${law.slug}`" class="flex space-x-2 w-fit md:pb-2" v-for="(law, index) in laws.filter(l => l.popular)" :key="index">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" style="margin-top: 5px;" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
        </div>
        <span><b>{{ law.title_short }}</b> – {{ law.title_long }}</span>
      </nuxt-link>
      <h2 class="pt-5 md:pt-8">Alphabetische Gesetzesübersicht</h2>
      <div class="flex flex-col space-y-2 md:space-y-4" v-for="(letter, index) in letters" :key="index">
        <h3 class="block md:pb-2 pt-4">{{ letter }}</h3>
        <nuxt-link :to="`/gesetze/${law.slug}`" class="flex space-x-2 w-fit md:pb-2" v-for="(law, index) in laws.filter(law => law.title_short.startsWith(letter))" :key="index">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" style="margin-top: 5px;" viewBox="0 0 16 16">
              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
          </div>
          <span><b>{{ law.title_short }}</b> – {{ law.title_long }}</span>
        </nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'GesetzeIndexPage',
  head() {
    return {
      title: 'Gesetze im Überblick - Traumanwalt',
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app }) {
    const laws = await app.$axios.$get(`/api/laws`)
    return {
      letters: [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Z'
      ],
      laws
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>