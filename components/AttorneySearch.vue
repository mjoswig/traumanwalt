<template>
  <div>
    <section class="flex flex-col space-y-8">
      <article class="border flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0 p-4 lg:p-8 rounded-lg" v-for="(attorney, index) in attorneys" :key="index">
        <div>
          <img class="bg-cover border h-28 w-28 sm:h-48 sm:w-48 rounded-full" :style="`background-image: url(${getPhotoUrl(attorney)});`" />
        </div>
        <div>
          <h2 class="mb-2">{{ getFullName(attorney) }}</h2>
          <span class="text-lg">{{ getBusinessAddress(attorney) }}</span>
          <div class="flex flex-wrap mt-4">
            <span class="border border-blue-500 text-blue-500 px-2 py-1 rounded-md text-sm mr-2" v-for="(legalField, index) in attorney.legal_fields" :key="index">
              {{ getLegalFieldName(legalField, attorney) }}
            </span>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AttorneySearch',
  props: ['attorneys'],
  methods: {
    getPhotoUrl(attorney) {
      return attorney.photo_url || require('@/assets/images/photo-default.jpeg')
    },
    getFullName(attorney) {
      let fullName = []
      if (attorney.salutation === 'Frau') {
        fullName.push('Rechtsanwältin')
      } else {
        fullName.push('Rechtsanwalt')
      }
      fullName.push(attorney.first_name)
      fullName.push(attorney.last_name)
      return fullName.join(' ')
    },
    getBusinessAddress(attorney) {
      let businessAddress = []
      businessAddress.push(attorney.address_line)
      businessAddress.push(attorney.postal_code)
      businessAddress.push(attorney.city)
      return businessAddress.join(', ')
    },
    getLegalFieldName(legalField, attorney) {
      if (legalField.specialized) {
        const preposition = attorney.salutation === 'Frau' ? 'Fachanwältin' : 'Fachanwalt'
        return `${preposition} ${legalField.name}`
      }
      return legalField.name
    }
  }
}
</script>
