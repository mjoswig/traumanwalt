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
      <nuxt-link class="mr-2" to="/gesetze">Gesetze</nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mr-2" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link class="mr-2" :to="`/gesetze/${lawParagraph.law_slug}`">{{ lawParagraph.law_title_short }}</nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mr-2" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link :to="`/gesetze/${lawParagraph.law_slug}/${lawParagraph.slug}`">{{ lawParagraph.title_short }}</nuxt-link>
    </div>
    <div class="flex justify-between text-sm md:text-base mb-4 md:mb-8">
      <div>
        <nuxt-link v-if="lawParagraphBefore" class="flex items-center space-x-2" :to="`/gesetze/${lawParagraph.law_slug}/${lawParagraphBefore.slug}`">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
          </svg>
          <span>{{ lawParagraphBefore.title_short }}</span>
        </nuxt-link>
      </div>
      <div>
        <nuxt-link v-if="lawParagraphAfter" class="flex items-center space-x-2" :to="`/gesetze/${lawParagraph.law_slug}/${lawParagraphAfter.slug}`">
          <span>{{ lawParagraphAfter.title_short }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
        </nuxt-link>
      </div>
    </div>
    <div class="mb-4 md:mb-8">
      <h1>{{ paragraphTitle }}</h1>
    </div>
    <article class="law-content mb-6 md:mb-10" v-html="lawParagraph.content">
    </article>
    <div class="relative flex items-center justify-center bg-cover sm:h-48 lg:h-72 border p-4 rounded-md" :style="`background-image: url(${require('@/assets/images/traumanwalt-clients.jpeg')}); background-position: 50% 0;`">
      <div class="absolute top-0 left-0 h-full w-full opacity-30 bg-black rounded-md"></div>
      <div class="flex flex-col lg:items-center z-10 text-white lg:text-center lg:w-96 lg:px-0 lg:-ml-40">
        <h2 class="text-xl xl:text-2xl mb-3 lg:mb-4">Gewinnen Sie neue Mandanten und steigern Sie Ihre Reputation mit einem Traumanwalt-Profil</h2>
        <Btn @click="$router.push('/mitgliedschaft?utm_content=law_paragraph_banner')">Jetzt Traumanwalt werden</Btn>
      </div>
    </div>
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
      lawParagraphBefore: lawParagraph.result_before,
      lawParagraphAfter: lawParagraph.result_after,
      lawParagraph: lawParagraph.result
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

<style lang="postcss">
.law-content a {
  @apply font-bold;
}
</style>