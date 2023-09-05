<template>
  <div>
    <section class="flex flex-col space-y-8">
      <article class="border flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0 p-4 lg:p-8 rounded-lg" v-for="(attorney, index) in attorneys" :key="index">
        <div>
          <img class="bg-cover border-4 border-white h-28 w-28 sm:h-48 sm:w-48 rounded-full" :style="`background-image: url(${getAvatarUrl(attorney)});`" />
        </div>
        <div>
          <h2 class="mb-2">{{ getFullName(attorney) }}</h2>
          <span class="text-lg">{{ getBusinessAddress(attorney) }}</span>
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
    getAvatarUrl(attorney) {
      return attorney.avatar_url || require('@/assets/images/avatar-default.jpeg')
    },
    getFullName(attorney) {
      let fullName = []
      if (attorney.salutation === 'Herr') {
        fullName.push('Rechtsanwalt')
      } else {
        fullName.push('Rechtsanwältin')
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
    }
  }
}
</script>
