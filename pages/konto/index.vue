<template>
  <div>
    <h1 class="mb-6">Willkommen, {{ fullName }}!</h1>
    <div class="grid lg:grid-cols-2 gap-4">
      <AccountSection heading="Klickzahlen Anwaltsprofil">
        <p v-if="!profileViews.length">Es sind noch keine Besucherzahlen zu Ihrem Profil verfügbar.</p>
        <ul class="flex flex-col space-y-4" v-if="profileViews.length">
          <li class="border-l-4 pl-2 flex justify-between text-gray-500" v-for="(month, index) in getNextMonthsFromDate(profileViews[0].created_at)" :key="index">
            <b>{{ month }}</b>
            <span>{{ profileViews.find(pv => $moment(pv.created_at).format('MMMM YYYY') === month)?.count || 0 }}</span>
          </li>
        </ul>
      </AccountSection>
      <AccountSection heading="Klickzahlen Kanzleiprofil">
        <p v-if="!profileViewsLawFirm.length">Es sind noch keine Besucherzahlen zu Ihrem Kanzleiprofil verfügbar.</p>
        <ul class="flex flex-col space-y-4" v-if="profileViewsLawFirm.length">
          <li class="border-l-4 pl-2 flex justify-between text-gray-500" v-for="(month, index) in getNextMonthsFromDate(profileViewsLawFirm[0].created_at)" :key="index">
            <b>{{ month }}</b>
            <span>{{ profileViewsLawFirm.find(pv => $moment(pv.created_at).format('MMMM YYYY') === month)?.count || 0 }}</span>
          </li>
        </ul>
      </AccountSection>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KontoIndexPage',
  head() {
    return {
      title: 'Startseite - Traumanwalt'
    }
  },
  async asyncData({ app, store }) {
    const profileViews = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/profile-views`)
    const profileViewsLawFirm = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/profile-views/law-firm`)
    return {
      profileViews,
      profileViewsLawFirm
    }
  },
  computed: {
    fullName() {
      if (!this.$store.state.userData) return
      const salutation = this.$store.state.userData.salutation
      const lastName = this.$store.state.userData.last_name
      return `${salutation} ${lastName}`
    },
    maxCount() {
      const counts = this.profileViews.map(pv => pv.count)
      return Math.max(counts)
    },
    maxLawFirmCount() {
      const counts = this.profileViewsLawFirm.map(pv => pv.count)
      return Math.max(counts)
    }
  },
  methods: {
    getNextMonthsFromDate(date) {
      let months = []
      for (let i = 0; i <= 12; i++) {
        months.push(this.$moment(date).add(i, 'months').format('MMMM YYYY'))
      }
      return months
    }
  }
}
</script>
