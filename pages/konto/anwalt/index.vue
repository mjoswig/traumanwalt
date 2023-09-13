<template>
  <div>
    <h1 class="mb-6">Willkommen, {{ fullName }}!</h1>
    <div class="grid xl:grid-cols-2 gap-4 mb-4">
      <AccountSection heading="Ihr Traumanwalt-Konto">
        <div class="grid grid-cols-2 gap-4">
          <div class="border p-4 rounded-md text-center">
            <b class="block text-2xl">{{ stats.profile_views }}</b>
            <span class="text-gray-500">Klick{{ stats.profile_views !== 1 ? 's' : '' }} auf Anwaltsprofil</span>
          </div>
          <div class="border p-4 rounded-md text-center">
            <b class="block text-2xl">{{ stats.reviews }}</b>
            <span class="text-gray-500">Bewertung{{ stats.reviews !== 1 ? 'en' : '' }} erhalten</span>
          </div>
          <div class="border p-4 rounded-md text-center">
            <b class="block text-2xl">{{ stats.conversations }}</b>
            <span class="text-gray-500">Anfrage{{ stats.conversations !== 1 ? 'n' : '' }} erhalten</span>
          </div>
          <div class="border p-4 rounded-md text-center">
            <b class="block text-2xl">{{ stats.legal_guide_views }}</b>
            <span class="text-gray-500">Klick{{ stats.legal_guide_views !== 1 ? 's' : '' }} auf Rechtstipps</span>
          </div>
        </div>
      </AccountSection>
      <AccountSection heading="Wie gefällt Ihnen Traumanwalt?">
        <div class="border-l-4 pl-2">
          <p class="mb-2">„Vielen Dank für Ihr Interesse an Traumanwalt. Wir möchten Ihnen mit unserer Plattform helfen, Ihre Kanzlei zu vermarkten und neue Mandate online zu generieren.</p>
          <p>Haben Sie Fragen oder Anmerkungen? Schreiben Sie uns, wir freuen uns über Ihr Feedback: <b>support@traumanwalt.com</b>“</p>
        </div>
        <div>
          <b class="text-gray-500">Manuel Joswig</b><br />
          <span class="text-xs">Geschäftsführer Joswig Solutions UG</span>
        </div>
      </AccountSection>
    </div>
    <section class="border border-transparent rounded-md shadow-md p-4">
      <h2 class="text-gray-500 mb-4">Klickzahlen Anwaltsprofil</h2>
      <client-only>
        <bar-chart :chart-data="chartData" :chart-options="chartOptions" :height="300"></bar-chart>
      </client-only>
    </section>
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
    const stats = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/stats`)

    const profileViews = await app.$axios.$get(`/api/users/${store.state.userData.firebase_uid}/profile-views`)
    const fromDate = profileViews[0] ? profileViews[0].created_at : new Date()

    let chartLabels = []
    for (let i = 0; i <= 12; i++) {
      chartLabels.push(app.$moment(fromDate).add(i, 'months').format('MMMM YYYY'))
    }

    const profileViewsData = []
    for (const label of chartLabels) {
      const count = profileViews.find(pv => app.$moment(pv.created_at).format('MMMM YYYY') === label)?.count || 0
      profileViewsData.push(count)
    }

    return {
      stats,
      profileViews,
      chartData: {
        labels: chartLabels,
        datasets: [{
          label: 'Klicks',
          data: profileViewsData,
          backgroundColor: '#00aff0'
        }]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: { min: 0 }
          }]
        }
      }
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
