<template>
  <div>
    <div class="md:text-center mb-4 md:mb-12">
      <h1>{{ paragraphTitle }}</h1>
    </div>
    <article v-html="lawParagraph.content">
    </article>
  </div>
</template>

<script>
export default {
  name: 'GesetzeParagraphsPage',
  head() {
    return {
      title: `${this.seoTitle} - Traumanwalt`,
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app, params, redirect }) {
    const lawParagraph = await app.$axios.$get(`/api/laws/paragraphs/${params.pslug}`)
    if (!lawParagraph) redirect('/gesetze')
    return {
      lawParagraph
    }
  },
  computed: {
    paragraphTitle() {
      return `${this.lawParagraph.title_short} – ${this.lawParagraph.title_long}`
    },
    seoTitle() {
      return `${this.lawParagraph.title_short} ${this.lawParagraph.title_long}`
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>