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
      <nuxt-link class="mr-2" to="/rechtstipps">Rechtstipps</nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mr-2" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link class="mr-2" :to="`/${legalGuide.user_slug}/rechtstipps`">{{ fullNameWithoutJobTitle }}</nuxt-link>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-right-fill mr-2" viewBox="0 0 16 16">
        <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
      </svg>
      <nuxt-link :to="`/rechtstipps/${legalGuide.slug}`">{{ legalGuide.title }}</nuxt-link>
    </div>
    <h1 class="mb-6 xl:mb-7">{{ legalGuide.title }}</h1>
    <div v-if="legalGuide.thumbnail_url" class="w-full mb-6">
      <div class="bg-cover bg-center border rounded-lg h-48 sm:h-64 md:h-72 xl:h-96 w-full" :style="`background-image: url(${legalGuide.thumbnail_url});`"></div>
    </div>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
      <article class="w-full lg:w-2/3">
        <div class="border border-gray-300 flex items-center space-x-2 sm:space-x-4 p-2 rounded-lg text-sm sm:text-base mb-5">
          <div>
            <div class="bg-cover bg-center border h-12 w-12 sm:h-16 sm:w-16 rounded-full" :style="`background-image: url(${legalGuide.user_photo_url  || require('@/assets/images/photo-default.jpeg')});`"></div>
          </div>
          <div>
            <nuxt-link :to="`/${legalGuide.user_slug}`"><b>{{ fullName }}</b></nuxt-link>
            <span class="block text-gray-500 text-sm">Veröffentlicht: {{ $moment(legalGuide.created_at).format('DD.MM.YYYY, HH:mm')  }}</span>
          </div>
        </div>
        <div v-html="legalGuide.content">
        </div>
      </article>
      <div class="hidden lg:block w-full lg:w-1/3">
        <div class="sticky top-4 border border-gray-300 p-4 rounded-md">
          <h2 class="text-xl xl:text-2xl mb-2">Nachricht an {{ salutation }}{{ salutation === 'Herr' ? 'n' : '' }} {{ lastName }}</h2>
          <form class="flex flex-col space-y-4" @submit.prevent>
            <fieldset>
              <label>Ihre Nachricht</label>
              <textarea class="border px-2 py-1 rounded-md w-full" rows="5" placeholder="Bitte beschreiben Sie hier Ihre Situation bzw. Ihren rechtlichen Beratungsbedarf möglichst genau..." v-model="message" />
            </fieldset>
            <Btn @click="processMessage">Nachricht senden</Btn>
          </form>
        </div>
      </div>
      <nuxt-link :to="`/${userSlug}/nachricht`" class="mobile-cta lg:hidden fixed bottom-0 left-0 font-bold shadow-md px-4 py-3 flex justify-center focus:outline-none w-full z-20">
        Nachricht an {{ salutation }}{{ salutation === 'Herr' ? 'n' : '' }} {{ lastName }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RechtstippsDetailsPage',
  head() {
    return {
      title: `${this.legalGuide.title} - Traumanwalt`,
      link: [
        { rel: 'canonical', href: `https://traumanwalt.com${this.$route.path}` }
      ]
    }
  },
  async asyncData({ app, params, redirect }) {
    const legalGuide = await app.$axios.$get(`/api/legal-guides/${params.slug}`)
    if (!legalGuide) redirect('/rechtstipps')

    // count clicks on guide
    await app.$axios.$post(`/api/legal-guides/${params.slug}/views/update`)

    return {
      legalGuide,
      message: ''
    }
  },
  computed: {
    userSlug() {
      return this.legalGuide.user_slug
    },
    salutation() {
      return this.legalGuide.user_salutation
    },
    lastName() {
      return this.legalGuide.user_last_name
    },
    fullName() {
      let fullName = []
      if (this.legalGuide.user_salutation === 'Frau') {
        fullName.push(this.legalGuide.user_job_title || 'Rechtsanwältin')
      } else {
        fullName.push(this.legalGuide.user_job_title || 'Rechtsanwalt')
      }
      fullName.push(this.legalGuide.user_first_name)
      fullName.push(this.legalGuide.user_last_name)
      return fullName.join(' ')
    },
    fullNameWithoutJobTitle() {
      let fullName = []
      fullName.push(this.legalGuide.user_first_name)
      fullName.push(this.legalGuide.user_last_name)
      return fullName.join(' ')
    }
  },
  methods: {
    processMessage() {
      this.$router.push(`/${this.legalGuide.user_slug}/nachricht?message=${this.message}`)
    }
  }
}
</script>

<style lang="postcss" scoped>
.mobile-cta {
  @apply text-white;
  background: #222222;

  &:hover {
    @apply text-white no-underline;
  }
}
</style>