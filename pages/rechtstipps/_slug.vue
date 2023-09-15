<template>
  <div>
    <h1 class="mb-6 xl:mb-8">{{ legalGuide.title }}</h1>
    <div v-if="legalGuide.thumbnail_url" class="w-full mb-6">
      <img class="bg-cover bg-center border rounded-lg h-48 sm:h-64 md:h-72 xl:h-96 w-full" :style="`background-image: url(${legalGuide.thumbnail_url});`" />
    </div>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
      <article class="w-full lg:w-2/3">
        <div class="border border-gray-300 flex items-center space-x-2 sm:space-x-4 p-2 rounded-lg text-sm sm:text-base mb-5">
          <div>
            <img class="bg-cover bg-center border h-12 w-12 sm:h-16 sm:w-16 rounded-full" :style="`background-image: url(${legalGuide.user_photo_url  || require('@/assets/images/photo-default.jpeg')});`" />
          </div>
          <div>
            <nuxt-link :to="`/anwalt/${legalGuide.user_slug}`"><b>{{ getFullName }}</b></nuxt-link>
            <span class="block text-gray-500">vom {{ $moment(legalGuide.created_at).format('DD.MM.YYYY, HH:mm')  }}</span>
          </div>
        </div>
        <div v-html="legalGuide.content">
        </div>
      </article>
      <div class="w-full lg:w-1/3">
        <div class="sticky top-4 border border-brand p-4 rounded-md">
          <h2 class="text-brand text-xl xl:text-2xl mb-2">Sie haben eine Rechtsfrage?</h2>
          <p class="text-lg mb-3">So einfach geht's auf Traumanwalt:</p>
          <ol class="flex flex-col space-y-2 list-decimal ml-5 mb-5">
            <li>Kostenloses Konto erstellen</li>
            <li>Frage stellen</li>
            <li>Fixpreis bezahlen</li>
            <li>Hilfe bekommen</li>
          </ol>
          <Btn @click="$router.push('/rechtsberatung')">Jetzt beraten werden</Btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RechtstippsDetailsPage',
  head() {
    return {
      title: 'Rechtstipps - Traumanwalt'
    }
  },
  async asyncData({ app, params, redirect }) {
    const legalGuide = await app.$axios.$get(`/api/legal-guides/${params.slug}`)
    if (!legalGuide) redirect('/rechtstipps')
    return {
      legalGuide
    }
  },
  computed: {
    getFullName() {
      let fullName = []
      if (this.legalGuide.user_salutation === 'Frau') {
        fullName.push('Rechtsanwältin')
      } else {
        fullName.push('Rechtsanwalt')
      }
      fullName.push(this.legalGuide.user_first_name)
      fullName.push(this.legalGuide.user_last_name)
      return fullName.join(' ')
    }
  }
}
</script>