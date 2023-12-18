<template>
  <div>
    <div class="border-b pb-2 md:pb-4 flex flex-wrap items-center space-x-2 text-sm md:text-base mb-4 md:mb-12">
      <nuxt-link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
        </svg>
      </nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link to="/gesetze">Gesetze</nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link :to="`/gesetze/${lawParagraph.law_slug}`">{{ lawParagraph.law_title_short }}</nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link :to="`/gesetze/${lawParagraph.law_slug}/${lawParagraph.slug}`">{{ lawParagraph.title_short }}</nuxt-link>
    </div>
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