<template>
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
    <article class="w-full lg:w-2/3">
      <h1 class="mb-2">{{ legalGuide.title }}</h1>
      <span class="block text-gray-500 mb-6 md:mb-8">{{ $moment(legalGuide.created_at).format('DD.MM.YYYY, HH:mm')  }} von {{ getFullName }}</span>
      <div v-html="legalGuide.content">
      </div>
    </article>
    <div class="w-full lg:w-1/3">
      <div class="sticky top-4 border p-4 rounded-md">
        <h2 class="text-xl xl:text-2xl mb-2">Sie haben eine Rechtsfrage?</h2>
        <p class="text-lg mb-3">So einfach geht's auf Traumanwalt:</p>
        <ol class="flex flex-col space-y-2 list-decimal ml-5 mb-5">
          <li>Kostenloses Konto erstellen</li>
          <li>Frage stellen</li>
          <li>Bezahlung</li>
          <li>Hilfe bekommen</li>
        </ol>
        <Btn @click="$router.push('/rechtsberatung')">Jetzt beraten werden</Btn>
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