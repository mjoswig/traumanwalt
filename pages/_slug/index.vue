<template>
  <div class="-mt-4">
    <div class="relative bg-cover p-4 md:p-8 flex flex-col items-center justify-center space-y-3 md:space-y-6 rounded-md mb-8 md:mb-12" :style="`background-image: url(${require('@/assets/images/traumanwalt-profile-cover.jpeg')});`">
      <div class="absolute top-0 left-0 h-full w-full opacity-40 bg-black rounded-md"></div>
      <img class="z-10 bg-cover border border-white h-36 w-36 md:h-48 md:w-48 rounded-full" :style="`background-image: url(${photoUrl});`" />
      <div class="z-10 text-center text-white">
        <span class="block uppercase text-lg xl:text-xl my-1">{{ jobTitle }}</span>
        <h1>{{ firstName }} {{ lastName }}</h1>
        <span v-if="lawFirm.name" class="block text-base xl:text-lg mt-2">{{ lawFirm.name }}</span>
      </div>
    </div>
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
      <article class="flex flex-col space-y-6 md:space-y-8 w-full lg:w-2/3">
        <section class="flex flex-col space-y-4 md:space-y-6" v-if="phoneNumber || profile.contact_email || profile.website_url">
          <h2>Kontakt</h2>
          <div class="flex flex-col space-y-2">
            <div v-if="profile.address_line" class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-door" style="margin-top: 3px;" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                </svg>
              </div>
              <span>{{ fullAddress }}</span>
            </div>
            <div v-if="phoneNumber" class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone" style="margin-top: 3px;" viewBox="0 0 16 16">
                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                </svg>
              </div>
              <span>
                <a v-show="showPhoneNumber" :href="phoneNumberUri">{{ nationalPhoneNumber }}</a>
                <a v-show="!showPhoneNumber" class="cursor-pointer" @click="showPhoneNumber = true">Telefonnummer anzeigen</a>
              </span>
            </div>
            <div v-if="profile.contact_email" class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" style="margin-top: 3px;" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                </svg>
              </div>
              <a :href="mailToLink">{{ profile.contact_email }}</a>
            </div>
            <div v-if="profile.website_url" class="flex space-x-2">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-globe" style="margin-top: 3px;" viewBox="0 0 16 16">
                  <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
                </svg>
              </div>
              <a :href="profile.website_url" rel="nofollow" target="_blank">{{ profile.website_url }}</a>
            </div>
          </div>
        </section>
        <hr v-if="profile.about" />
        <section v-if="profile.about" class="flex flex-col space-y-4 md:space-y-6">
          <h2>Über mich</h2>
          <p v-if="!profile.about">{{ firstName }} {{ lastName }} hat noch nichts über sich geschrieben.</p>
          <div v-if="profile.about" v-html="profile.about"></div>
        </section>
        <hr v-if="legalFields.length || languages.length || memberships.length" />
        <section v-if="legalFields.length || languages.length || memberships.length" class="flex flex-col space-y-4 md:space-y-6">
          <h2>Kompetenzen</h2>
          <div v-if="legalFields.length">
            <h3 class="mb-4">Rechtsgebiete</h3>
            <p v-if="!legalFields.length">{{ firstName }} {{ lastName }} hat keine Rechtsgebiete angegeben.</p>
            <div v-if="legalFields.length" class="mb-2">
              <span class="inline-block bg-gray-100 px-2 py-1 rounded-md w-fit mr-1 mt-1 md:mr-2 md:mt-2" v-for="(legalField, index) in legalFields" :key="index">
                {{ getLegalFieldName(legalField, profile) }}
              </span>
            </div>
          </div>
          <div v-if="languages.length">
            <h3 class="mb-4">Sprachen</h3>
            <p v-if="!languages.length">{{ firstName }} {{ lastName }} hat keine Sprachen angegeben.</p>
            <div v-if="languages.length" class="mb-2">
              <span class="inline-block bg-gray-100 px-2 py-1 rounded-md w-fit mr-1 mt-1 md:mr-2 md:mt-2" v-for="(language, index) in languages" :key="index">
                {{ language.name }}
              </span>
            </div>
          </div>
          <div v-if="memberships.length">
            <h3 class="mb-4">Mitgliedschaften</h3>
            <p v-if="!memberships.length">{{ firstName }} {{ lastName }} hat keine Mitgliedschaften angegeben.</p>
            <ul class="list-disc flex flex-col space-y-2 ml-5">
              <li v-for="(membership, index) in memberships" :key="index">{{ membership }}</li>
            </ul>
          </div>
        </section>
        <hr v-if="legalGuides.length" />
        <section v-if="legalGuides.length">
          <h2 class="mb-4">Rechtstipps</h2>
          <p>{{ firstName }} {{ lastName }} hat noch keine Rechtstipps veröffentlicht.</p>
        </section>
        <hr />
        <section>
          <h2 class="mb-4">Bewertungen</h2>
          <p>{{ firstName }} {{ lastName }} hat noch keine Bewertungen erhalten.</p>
        </section>
        <hr />
        <section v-if="profile.law_firm">
          <h2 class="mb-4">Über die Kanzlei</h2>
          <p v-if="!profile.law_firm">{{ firstName }} {{ lastName }} hat keine Kollegen angegeben.</p>
          <div class="pt-2 flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0" v-if="profile.law_firm">
            <div>
              <div class="border bg-center bg-no-repeat h-32 w-32 rounded-md" :style="`background-image: url(${profile.law_firm.logo_url}); background-size: 90%;`" />
            </div>
            <div>
              <b class="block md:text-lg">{{ profile.law_firm.name }}</b>
              <span class="block">{{ fullLawFirmAddress }}</span>
              <nuxt-link class="block font-bold" :to="`/kanzleien/${profile.law_firm.slug}`">Zum Kanzleiprofil</nuxt-link>
            </div>
          </div>
          <div v-if="lawFirmColleagues.length" class="pt-6 md:pt-8">
            <h3 class="mb-6">Kollegen</h3>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4" v-if="profile.law_firm">
              <div class="flex items-center space-x-4" v-for="(user, index) in lawFirmColleagues" :key="index">
                <div>
                  <img class="bg-cover h-20 w-20 rounded-full mb-2" :style="`background-image: url(${user.photo_url || require('@/assets/images/photo-default.jpeg')});`" />
                </div>
                <div>
                  <span class="block text-gray-500 text-sm">{{ user.salutation === 'Frau' ? 'Rechtsanwältin' : 'Rechtsanwalt' }}</span>
                  <nuxt-link :to="`/${user.slug}`" class="block font-bold">{{ user.first_name }} {{ user.last_name }}</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </article>
      <div class="hidden lg:block w-full lg:w-1/3">
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
      <nuxt-link :to="`/${profile.slug}/anfragen`" class="mobile-cta lg:hidden fixed bottom-0 left-0 font-bold shadow-md px-4 py-3 flex justify-center focus:outline-none w-full z-20">
        Jetzt {{ salutation === 'Frau' ? 'Anwältin' : 'Anwalt' }} fragen
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import parsePhoneNumber from 'libphonenumber-js'

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
      profile,
      showPhoneNumber: false
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
    lawFirm() {
      return this.profile.law_firm
    },
    fullAddress() {
      const fullAddress = []

      const addressLine = this.profile.address_line
      fullAddress.push(addressLine)

      if (this.profile.postal_code || this.profile.city) {
        const city = []
        city.push(this.profile.postal_code)
        city.push(this.profile.city)
        fullAddress.push(city.join(' '))
      }

      return fullAddress.join(', ')
    },
    fullLawFirmAddress() {
      const fullAddress = []

      const addressLine = this.profile.law_firm.address_line
      fullAddress.push(addressLine)

      if (this.profile.law_firm.postal_code || this.profile.law_firm.city) {
        const city = []
        city.push(this.profile.law_firm.postal_code)
        city.push(this.profile.law_firm.city)
        fullAddress.push(city.join(' '))
      }

      return fullAddress.join(', ')
    },
    phoneNumber() {
      return this.profile.landline_number || this.profile.mobile_number
    },
    phoneNumberUri() {
      return parsePhoneNumber(this.phoneNumber).getURI()
    },
    nationalPhoneNumber() {
      return parsePhoneNumber(this.phoneNumber).formatNational()
    },
    mailToLink() {
      const subject = 'Kontaktanfrage über Traumanwalt'
      const message = `${ this.salutation === 'Frau' ? `Sehr geehrte Frau` : `Sehr geehrter Herr` } ${this.lastName},\n\ngerne würde ich eine Beratung in Ihrer Kanzlei in Anspruch nehmen.\n\nBitte kontaktieren Sie mich bezüglich einer Terminvereinbarung.\n\nMit freundlichen Grüßen\n\n\n\nFreiwillige Angaben\n\nMein Name:\n\nMeine Telefonnummer:\n\nMeine Adresse:\n\nMein Anliegen:`
      return `mailto:${this.profile.contact_email}?subject=${subject}&body=${encodeURIComponent(message)}`
    },
    legalFields() {
      return this.profile.legal_fields
    },
    languages() {
      return this.profile.languages
    },
    memberships() {
      return this.profile.memberships ? this.profile.memberships.split(';') : []
    },
    legalGuides() {
      return []
    },
    lawFirmColleagues() {
      if (!this.lawFirm.users.length) return []
      return this.lawFirm.users.filter(u => u.slug !== this.profile.slug)
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

<style lang="postcss" scoped>
.mobile-cta {
  @apply text-white;
  background: #222222;

  &:hover {
    @apply text-white no-underline;
  }
}
</style>