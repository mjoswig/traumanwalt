<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0 -mt-4 lg:mt-0">
    <section class="w-full lg:w-1/5">
      <div class="bg-white w-full fixed left-0 bottom-0 lg:sticky lg:bottom-0 lg:top-4 border lg:rounded-md">
        <div class="bg-gray-100 flex lg:hidden items-center justify-between px-4 py-3" @click="showMobileFilters = !showMobileFilters">
          <div class="flex items-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <b class="text-gray-500 text-base">Suchfilter</b>
          </div>
          <div>
            <svg v-show="!showMobileFilters" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-list h-6 w-6 md:h-8 md:w-8" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <svg v-show="showMobileFilters" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-lg h-6 w-6 md:h-8 md:w-8" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
            </svg>
          </div>
        </div>
        <form class="flex-col space-y-4 lg:px-4 pb-4" :class="{ 'flex': showMobileFilters, 'hidden lg:flex': !showMobileFilters }" @submit.prevent>
          <a class="lg:hidden" href="https://a.partner-versicherung.de/click.php?partner_id=170236&ad_id=787&deep=rechtsschutzversicherung" target="_blank" @click="trackTarifcheckAdClick(true)"><img src="https://a.partner-versicherung.de/view.php?partner_id=170236&ad_id=787" style="width: 100%; height: auto;"></a>
          <fieldset class="px-4 lg:px-0">
            <label class="block font-bold text-base md:text-lg mb-1">Sortieren nach</label>
            <select class="border rounded-md px-2 py-1 w-full" v-model="filters.sortValue">
              <option value="">Keine Sortierung</option>
              <option value="top-reviews">Bestbewertet</option>
              <option value="new-reviews">Neueste Bewertungen</option>
              <option value="alphabetical">Name A-Z</option>
              <option value="new">Neu bei Traumanwalt</option>
            </select>
          </fieldset>
          <fieldset class="px-4 lg:px-0">
            <label class="block font-bold text-base md:text-lg mb-1">Tätig in Rechtsgebiet</label>
            <select class="border rounded-md px-2 py-1 w-full" v-model="filters.legalFieldSlug">
              <option value="">Bitte auswählen...</option>
              <option v-for="(legalField, index) in legalFields" :key="index" :value="legalField.slug">{{ legalField.name }}</option>
            </select>
          </fieldset>
          <fieldset class="px-4 lg:px-0">
            <label class="block font-bold text-base md:text-lg mb-1">Fachanwalt für</label>
            <select class="border rounded-md px-2 py-1 w-full" v-model="filters.specializedLegalFieldSlug">
              <option value="">Bitte auswählen...</option>
              <option v-for="(legalField, index) in legalFields" :key="index" :value="legalField.slug">{{ legalField.name }}</option>
            </select>
          </fieldset>
          <fieldset class="px-4 lg:px-0" style="margin-bottom: -0.5rem;">
            <label class="block font-bold text-base md:text-lg mb-1">Ø-Bewertung</label>
            <star-rating class="mb-2" :clearable="true" :show-rating="false" :star-size="30" v-model="filters.minAverageRating" />
            <span>ab {{ filters.minAverageRating }} Stern{{ filters.minAverageRating !== 1 ? 'e' : '' }}</span>
          </fieldset>
          <fieldset class="px-4 lg:px-0">
            <label class="block font-bold text-base md:text-lg mb-1">Bewertungsanzahl</label>
            <input class="w-full" type="range" id="min-reviews" name="min-reviews" min="0" max="1000" step="5" v-model="filters.minReviews" />
            <span>ab {{ filters.minReviews }} Bewertungen</span>
          </fieldset>
          <a class="hidden lg:block" href="https://a.partner-versicherung.de/click.php?partner_id=170236&ad_id=783&deep=rechtsschutzversicherung" target="_blank" @click="trackTarifcheckAdClick(false)"><img src="https://a.partner-versicherung.de/view.php?partner_id=170236&ad_id=783" class="rounded-b-md" style="width: 100%; height: auto;"></a>
        </form>
      </div>
    </section>
    <section class="w-full lg:w-4/5 flex flex-col space-y-4">
      <span class="block text-sm lg:text-base">{{ totalProfiles }} {{ totalProfiles == 1 ? 'Anwalt entspricht' : 'Anwälte entsprechen' }} Ihren Suchkriterien</span>
      <nuxt-link class="profile-box" :to="`/${profile.slug}`" v-for="(profile, index) in profiles" :key="index">
        <article class="flex flex-col space-y-2 sm:flex-row sm:space-x-4 lg:space-x-6 sm:space-y-0 p-4 lg:p-6 border rounded-md shadow-md">
          <div class="profile-photo">
            <div class="bg-cover border h-28 w-28 md:h-48 md:w-48 rounded-full" :style="`background-image: url(${getPhotoUrl(profile)});`"></div>
          </div>
          <div class="w-full">
            <h2 class="text-base md:text-2xl md:mb-2">{{ getFullName(profile) }}</h2>
            <div class="flex space-x-1 text-sm md:text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
              </svg>
              <span>{{ getBusinessAddress(profile) }}</span>
            </div>
            <div class="mt-1 md:my-2">
              <div class="flex items-center space-x-2">
                <star-rating :increment="0.1" :read-only="true" :show-rating="false" :star-size="25" v-model="profile.average_rating" />
                <span class="block text-sm md:text-lg pt-1">{{ profile.total_reviews }} Bewertung{{ profile.total_reviews !== '1' ? 'en' : '' }}</span>
              </div>
              <p v-if="profile.latest_top_review_description" class="mt-2 text-gray-500 text-xs md:text-base">„{{ profile.latest_top_review_description }}“ ({{ $moment(profile.latest_top_review_created_at).format('DD.MM.YYYY') }})</p>
            </div>
            <div class="flex flex-wrap text-xs md:text-base mt-2">
              <span class="bg-gray-100 px-2 py-1 rounded-md mr-1 mt-1 md:mr-2 md:mt-2" v-for="(legalField, index) in profile.legal_fields.filter(p => p.id)" :key="index">
                {{ getLegalFieldName(legalField, profile) }}
              </span>
            </div>
          </div>
        </article>
      </nuxt-link>
      <InfiniteScroll :enough="page >= totalPages" @load-more="$emit('loadMore')" />
      <div class="relative flex items-center justify-center bg-cover h-36 md:h-64 border p-4 rounded-md" v-show="profiles.length === 0" :style="`background-image: url(${require('@/assets/images/traumanwalt-clients.jpeg')}); background-position: 50% 0;`">
        <div class="absolute top-0 left-0 h-full w-full opacity-30 bg-black rounded-md"></div>
        <div class="flex flex-col lg:items-center z-10 text-white lg:text-center lg:w-96 lg:px-4 lg:-ml-40">
          <h2 class="text-xl xl:text-2xl mb-3 lg:mb-4">Sie sind Anwalt und möchten hier gelistet werden?</h2>
          <Btn @click="$router.push('/mitgliedschaft?utm_content=profile_search_banner')">Jetzt Traumanwalt werden</Btn>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProfileSearch',
  props: ['profiles', 'legalFields', 'page', 'pageLength'],
  data() {
    return {
      filters: {
        sortValue: '',
        legalFieldSlug: '',
        specializedLegalFieldSlug: '',
        minAverageRating: 0,
        minReviews: 0
      },
      showMobileFilters: false
    }
  },
  computed: {
    totalProfiles() {
      if (!this.profiles.length) return 0
      return this.profiles[0].total_count
    },
    totalPages() {
      return Math.ceil(this.totalProfiles / this.pageLength)
    }
  },
  watch: {
    filters: {
      deep: true,
      handler(newFilters) {
        this.$emit('updateFilters', newFilters)
      }
    }
  },
  methods: {
    getPhotoUrl(profile) {
      return profile.photo_url || require('@/assets/images/photo-default.jpeg')
    },
    getFullName(profile) {
      let fullName = []
      if (profile.salutation === 'Frau') {
        fullName.push(profile.job_title || 'Rechtsanwältin')
      } else {
        fullName.push(profile.job_title || 'Rechtsanwalt')
      }
      fullName.push(profile.academic_title)
      fullName.push(profile.first_name)
      fullName.push(profile.last_name)
      return fullName.join(' ')
    },
    getBusinessAddress(profile) {
      let businessAddress = []
      businessAddress.push(profile.address_line)

      if (profile.postal_code || profile.city) {
        const city = []
        city.push(profile.postal_code)
        city.push(profile.city)
        businessAddress.push(city.join(' '))
      }

      return businessAddress.join(', ')
    },
    getLegalFieldName(legalField, profile) {
      if (legalField.specialized) {
        const preposition = profile.salutation === 'Frau' ? 'Fachanwältin' : 'Fachanwalt'
        return `${preposition} ${legalField.name}`
      }
      return legalField.name
    },
    async trackTarifcheckAdClick(isMobile) {
      const text = `Neuer Klick\n\nPfad: ${this.$route.path}\nKontext: Tarifcheck-Anzeige${ isMobile ? ' (Mobile)' : ' (Desktop)' }`
      await this.$axios.$post(`https://api.telegram.org/bot${process.env.telegramBotApiKey}/sendMessage?chat_id=${process.env.telegramBotChatId}&text=${encodeURIComponent(text)}`)
    }
  }
}
</script>

<style lang="postcss" scoped>
.profile-box {
  &:hover {
    @apply text-current no-underline;
  }
}

.profile-photo img {
  max-width: 215px;
}
.bi-geo-alt {
  height: 20px;
  width: 20px;
  margin-top: 6px;
  margin-right: 2px;
}

@media (max-width: 768px) {
  .profile-photo img {
    max-width: 125px;
  }

  .bi-geo-alt {
    height: 16px;
    width: 16px;
    margin-top: 4px;
  }
}
</style>