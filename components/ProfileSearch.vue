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
      <article class="flex flex-col space-y-2 sm:flex-row sm:space-x-4 lg:space-x-4 sm:space-y-0 p-4 border rounded-md shadow-md" v-for="(profile, index) in profiles" :key="index">
        <div class="profile-photo">
          <img class="bg-cover border h-28 w-28 md:h-48 md:w-48 rounded-full" :style="`background-image: url(${getPhotoUrl(profile)});`" />
        </div>
        <div class="w-full">
          <h2 class="text-base md:text-2xl md:mb-2">{{ getFullName(profile) }}</h2>
          <span class="text-sm md:text-lg">{{ getBusinessAddress(profile) }}</span>
          <div class="flex flex-wrap mt-2">
            <span class="tag border px-2 py-1 rounded-md text-xs md:text-sm mr-1 lg:mr-2 mt-1 lg:mt-2" v-for="(legalField, index) in profile.legal_fields.filter(lf => lf.id)" :key="index">
              {{ getLegalFieldName(legalField, profile) }}
            </span>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ProfileSearch',
  props: ['profiles'],
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
.profile-photo img {
  max-width: 215px;
}

@media (max-width: 768px) {
  .profile-photo img {
    max-width: 125px;
  }
}
</style>