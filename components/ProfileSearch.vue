<template>
  <div class="flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
    <section class="w-full lg:w-1/5">
      <div class="sticky top-4 border p-4 rounded-md">
        <form @submit.prevent>
          <label class="block font-bold text-base md:text-xl mb-1">Sortieren nach</label>
          <select class="border rounded-md px-2 py-1 w-full">
            <option value="">Keine Sortierung</option>
          </select>
        </form>
      </div>
    </section>
    <section class="w-full lg:w-4/5 flex flex-col space-y-4">
      <nuxt-link class="profile-box" :to="`/${profile.slug}`" v-for="(profile, index) in profiles" :key="index">
        <article class="flex flex-col space-y-2 sm:flex-row sm:space-x-4 lg:space-x-6 sm:space-y-0 p-4 lg:p-6 border rounded-md shadow-md">
          <div class="profile-photo">
            <img class="bg-cover border h-28 w-28 md:h-48 md:w-48 rounded-full" :style="`background-image: url(${getPhotoUrl(profile)});`" />
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
            <div class="flex flex-wrap text-xs md:text-base mt-2">
              <span class="bg-gray-100 px-2 py-1 rounded-md mr-1 mt-1 md:mr-2 md:mt-2" v-for="(legalField, index) in profile.legal_fields" :key="index">
                {{ getLegalFieldName(legalField, profile) }}
              </span>
            </div>
          </div>
        </article>
      </nuxt-link>
      <InfiniteScroll :enough="page >= totalPages" @load-more="$emit('loadMore')" />
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProfileSearch',
  props: ['profiles', 'page', 'pageLength'],
  computed: {
    totalPages() {
      return Math.ceil(this.profiles[0].total_count / this.pageLength)
    }
  },
  methods: {
    getPhotoUrl(profile) {
      return profile.photo_url || require('@/assets/images/photo-default.jpeg')
    },
    getFullName(profile) {
      let fullName = []
      if (profile.salutation === 'Frau') {
        fullName.push('Rechtsanwältin')
      } else {
        fullName.push('Rechtsanwalt')
      }
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