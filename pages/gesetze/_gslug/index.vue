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
      <nuxt-link :to="`/gesetze/${lawSections[0].law_slug}`">{{ lawSections[0].law_title_short }}</nuxt-link>
    </div>
    <div class="md:text-center mb-4 md:mb-12">
      <h1>{{ lawTitle }}</h1>
    </div>
    <article class="flex flex-col space-y-2 md:space-y-4">
      <section v-for="(lawSection1, index) in lawSections.filter(ls => !ls.parent_id)" :key="index">
        <h2 class="block pt-2 md:pt-0">{{ lawSection1.title }}</h2>
        <p class="text-xl">{{ lawSection1.description }}</p>
        <div class="ml-4 md:ml-8 my-2" v-for="(lawParagraph, index) in lawParagraphs.filter(lp => lp.section_id === lawSection1.id)" :key="index">
          <nuxt-link :to="`/gesetze/${lawSection1.law_slug}/${lawParagraph.slug}`" class="w-fit pb-2 pt-2">{{ lawParagraph.title_short }} – {{ lawParagraph.title_long }}</nuxt-link>
        </div>
        <section class="ml-4 md:ml-8 mt-2" v-for="(lawSection2, index) in lawSections.filter(ls => ls.parent_id === lawSection1.id)" :key="index">
          <h3 class="block pt-2">{{ lawSection2.title }}</h3>
          <p class="text-lg">{{ lawSection2.description }}</p>
          <div class="ml-4 md:ml-8 my-2" v-for="(lawParagraph, index) in lawParagraphs.filter(lp => lp.section_id === lawSection2.id)" :key="index">
            <nuxt-link :to="`/gesetze/${lawSection2.law_slug}/${lawParagraph.slug}`" class="w-fit pb-2 pt-2">{{ lawParagraph.title_short }} – {{ lawParagraph.title_long }}</nuxt-link>
          </div>
          <section class="ml-4 md:ml-8 mt-2" v-for="(lawSection3, index) in lawSections.filter(ls => ls.parent_id === lawSection2.id)" :key="index">
            <h4 class="block pt-2">{{ lawSection3.title }}</h4>
            <p>{{ lawSection3.description }}</p>
            <div class="ml-4 md:ml-8 my-2" v-for="(lawParagraph, index) in lawParagraphs.filter(lp => lp.section_id === lawSection3.id)" :key="index">
              <nuxt-link :to="`/gesetze/${lawSection3.law_slug}/${lawParagraph.slug}`" class="w-fit pb-2 pt-2">{{ lawParagraph.title_short }} – {{ lawParagraph.title_long }}</nuxt-link>
            </div>
          </section>
        </section>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: 'GesetzeSectionsPage',
  head() {
    return {
      title: `${this.seoTitle} - Traumanwalt`,
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app, params, redirect }) {
    const lawSections = await app.$axios.$get(`/api/laws/${params.gslug}`)
    const lawParagraphs = await app.$axios.$get(`/api/laws/${params.gslug}/paragraphs`)
    if (!lawSections.length) redirect('/gesetze')
    return {
      lawSections,
      lawParagraphs
    }
  },
  computed: {
    lawTitle() {
      return `${this.lawSections[0].law_title_short} – ${this.lawSections[0].law_title_long}`
    },
    seoTitle() {
      return `${this.lawSections[0].law_title_long} (${this.lawSections[0].law_title_short})`
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>