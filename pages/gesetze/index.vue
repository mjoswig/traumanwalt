<template>
  <div>
    <div class="md:text-center mb-4 md:mb-12">
      <h1 class="mb-2">Gesetze im Überblick</h1>
      <p class="text-xl">Traumanwalt hat die wichtigsten Gesetzestexte für Sie auf dieser Seite zusammengefasst.</p>
    </div>
    <section class="flex flex-col space-y-2 md:space-y-4">
      <h2 class="block pb-2 pt-2 md:pt-0">Meistgesuchte Gesetze</h2>
      <div class="md:pb-2" v-for="(law, index) in laws.filter(l => l.popular)" :key="index">
        &rightarrow; <b>{{ law.title_short }}</b> – {{ law.title_long }}
      </div>
      <h2 class="pt-5 md:pt-8">Alphabetische Gesetzesübersicht</h2>
      <div  class="flex flex-col space-y-2 md:space-y-4" v-for="(letter, index) in letters" :key="index">
        <h3 class="block md:pb-2 pt-4">{{ letter }}</h3>
        <div class="md:pb-2" v-for="(law, index) in laws.filter(law => law.title_short.startsWith(letter))" :key="index">
          &rightarrow; <b>{{ law.title_short }}</b> – {{ law.title_long }}
        </div>
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