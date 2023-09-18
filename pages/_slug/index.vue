<template>
  <div class="-mt-4">
    <div class="relative bg-cover p-4 md:p-8 flex flex-col items-center justify-center space-y-3 md:space-y-6 rounded-md mb-8 md:mb-12" :style="`background-image: url(${require('@/assets/images/traumanwalt-profile-cover.jpeg')});`">
      <div class="absolute top-0 left-0 h-full w-full opacity-40 bg-black rounded-md"></div>
      <img class="z-10 bg-cover border border-white h-36 w-36 md:h-48 md:w-48 rounded-full" :style="`background-image: url(${photoUrl});`" />
      <div class="z-10 text-center text-white">
        <span class="block text-lg xl:text-xl mb-1">{{ jobTitle }}</span>
        <h1>{{ firstName }} {{ lastName }}</h1>
      </div>
    </div>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
      <article class="flex flex-col space-y-6 md:space-y-8 w-full lg:w-2/3">
        <section>
          <h2 class="mb-4">Über mich</h2>
          <p v-if="!profile.about">{{ firstName }} {{ lastName }} hat noch nichts über sich geschrieben.</p>
          <div v-html="profile.about"></div>
        </section>
        <hr />
        <section class="flex flex-col space-y-4 md:space-y-6">
          <h2>Kompetenzen</h2>
          <div>
            <h3 class="mb-4">Fachanwaltschaft und Rechtsgebiete</h3>
            <p v-if="!legalFields.length">{{ firstName }} {{ lastName }} hat keine Rechtsgebiete angegeben.</p>
            <div v-if="legalFields.length" class="flex flex-wrap text-sm md:text-base">
              <span class="bg-gray-100 px-2 py-1 rounded-md mr-1 mt-1 md:mr-2 md:mt-2" v-for="(legalField, index) in legalFields" :key="index">
                {{ getLegalFieldName(legalField, profile) }}
              </span>
            </div>
          </div>
          <div>
            <h3 class="mb-4">Sprachen</h3>
            <p v-if="!languages.length">{{ firstName }} {{ lastName }} hat keine Sprachen angegeben.</p>
            <div v-if="languages.length" class="flex flex-wrap text-sm md:text-base">
              <span class="bg-gray-100 px-2 py-1 rounded-md mr-1 mt-1 md:mr-2 md:mt-2" v-for="(language, index) in languages" :key="index">
                {{ language.name }}
              </span>
            </div>
          </div>
          <div>
            <h3 class="mb-4">Mitgliedschaften</h3>
            <p v-if="!memberships.length">{{ firstName }} {{ lastName }} hat keine Mitgliedschaften angegeben.</p>
            <ul class="list-disc flex flex-col space-y-2 ml-5">
              <li v-for="(membership, index) in memberships" :key="index">{{ membership }}</li>
            </ul>
          </div>
        </section>
        <hr />
        <section>
          <h2 class="mb-4">Rechtstipps</h2>
          <p>{{ firstName }} {{ lastName }} hat noch keine Rechtstipps veröffentlicht.</p>
        </section>
        <hr />
        <section>
          <h2 class="mb-4">Bewertungen</h2>
          <p>{{ firstName }} {{ lastName }} hat noch keine Bewertungen erhalten.</p>
        </section>
        <hr />
        <section>
          <h2 class="mb-4">Kontakt</h2>
          <p>{{ firstName }} {{ lastName }} hat keine Kontaktinformationen angegeben.</p>
        </section>
      </article>
      <div class="w-full lg:w-1/3">
        <div class="sticky top-4 border border-gray-300 p-4 rounded-md">
          <h2 class="text-xl xl:text-2xl mb-2">Nachricht an {{ salutation }}{{ salutation === 'Herr' ? 'n' : '' }} {{ lastName }}</h2>
          <form class="flex flex-col space-y-4" @submit.prevent>
            <fieldset>
              <label>Ihre Nachricht</label>
              <textarea class="border px-2 py-1 rounded-md w-full" rows="5" placeholder="Bitte beschreiben Sie hier Ihre Situation bzw. Ihren rechtlichen Beratungsbedarf möglichst genau..." />
            </fieldset>
            <Btn>Nachricht senden</Btn>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  head() {
    return {
      title: `${this.fullName} - Traumanwalt`
    }
  },
  async asyncData({ app, params, redirect }) {
    const profile = await app.$axios.$get(`/api/profiles/${params.slug}`)
    if (!profile) redirect('/anwaelte')
    return {
      profile
    }
  },
  computed: {
    salutation() {
      return this.profile.salutation
    },
    jobTitle() {
      return this.profile.salutation === 'Frau' ? 'Rechtsanwältin' : 'Rechtsanwalt'
    },
    firstName() {
      return this.profile.first_name
    },
    lastName() {
      return this.profile.last_name
    },
    fullName() {
      return `${this.jobTitle} ${this.firstName} ${this.lastName}`
    },
    photoUrl() {
      return this.profile.photo_url || require('@/assets/images/photo-default.jpeg')
    },
    legalFields() {
      return this.profile.legal_fields
    },
    languages() {
      return this.profile.languages
    },
    memberships() {
      return this.profile.memberships ? this.profile.memberships.split(';') : []
    }
  },
  methods: {
    getLegalFieldName(legalField, profile) {
      if (legalField.specialized) {
        const preposition = profile.salutation === 'Frau' ? 'Fachanwältin' : 'Fachanwalt'
        return `${preposition} ${legalField.name}`
      }
      return legalField.name
    }
  }
}
</script>
