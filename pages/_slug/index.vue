<template>
  <div class="-mt-4">
    <div class="bg-gray-100 p-8 flex flex-col items-center justify-center space-y-6">
      <img class="bg-cover border h-36 w-36 md:h-48 md:w-48 rounded-full" :style="`background-image: url(${photoUrl});`" />
      <div>
        <span class="block text-gray-500 text-center text-lg xl:text-xl mb-1">{{ jobTitle }}</span>
        <h1>{{ profile.first_name }} {{ profile.last_name }}</h1>
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
    jobTitle() {
      return this.profile.salutation === 'Frau' ? 'Rechtsanwältin' : 'Rechtsanwalt'
    },
    fullName() {
      let fullName = []
      fullName.push(this.jobTitle)
      fullName.push(this.profile.first_name)
      fullName.push(this.profile.last_name)
      return fullName.join(' ')
    },
    photoUrl() {
      return this.profile.photo_url || require('@/assets/images/photo-default.jpeg')
    }
  }
}
</script>
