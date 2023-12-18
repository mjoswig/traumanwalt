<template>
  <div>
    <div class="md:text-center mb-4 md:mb-12">
      <h1>{{ lawTitle }}</h1>
    </div>
    <article class="flex flex-col space-y-2 md:space-y-4">
      <section v-for="(lawSection1, index) in lawSections.filter(ls => !ls.parent_id)" :key="index">
        <h2 class="block pt-2 md:pt-0">{{ lawSection1.title }}</h2>
        <p class="text-xl">{{ lawSection1.description }}</p>
        <div class="ml-4 md:ml-8 my-2" v-for="(lawParagraph, index) in lawParagraphs.filter(lp => lp.section_id === lawSection1.id)" :key="index">
          <nuxt-link :to="`/${lawSection1.law_slug}/${lawParagraph.slug}`" class="w-fit pb-2 pt-2">{{ lawParagraph.title_short }} – {{ lawParagraph.title_long }}</nuxt-link>
        </div>
        <section class="ml-4 md:ml-8 mt-2" v-for="(lawSection2, index) in lawSections.filter(ls => ls.parent_id === lawSection1.id)" :key="index">
          <h3 class="block pt-2">{{ lawSection2.title }}</h3>
          <p class="text-lg">{{ lawSection2.description }}</p>
          <div class="ml-4 md:ml-8 my-2" v-for="(lawParagraph, index) in lawParagraphs.filter(lp => lp.section_id === lawSection2.id)" :key="index">
            <nuxt-link :to="`/${lawSection2.law_slug}/${lawParagraph.slug}`" class="w-fit pb-2 pt-2">{{ lawParagraph.title_short }} – {{ lawParagraph.title_long }}</nuxt-link>
          </div>
          <section class="ml-4 md:ml-8 mt-2" v-for="(lawSection3, index) in lawSections.filter(ls => ls.parent_id === lawSection2.id)" :key="index">
            <h4 class="block pt-2">{{ lawSection3.title }}</h4>
            <p>{{ lawSection3.description }}</p>
            <div class="ml-4 md:ml-8 my-2" v-for="(lawParagraph, index) in lawParagraphs.filter(lp => lp.section_id === lawSection3.id)" :key="index">
              <nuxt-link :to="`/${lawSection3.law_slug}/${lawParagraph.slug}`" class="w-fit pb-2 pt-2">{{ lawParagraph.title_short }} – {{ lawParagraph.title_long }}</nuxt-link>
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
      title: `${this.lawTitle} - Traumanwalt`,
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app, params, redirect }) {
    const lawSections = await app.$axios.$get(`/api/laws/${params.slug}`)
    const lawParagraphs = await app.$axios.$get(`/api/laws/${params.slug}/paragraphs`)
    if (!lawSections.length) redirect('/gesetze')
    return {
      lawSections,
      lawParagraphs
    }
  },
  computed: {
    lawTitle() {
      return `${this.lawSections[0].law_title_short} – ${this.lawSections[0].law_title_long}`
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>