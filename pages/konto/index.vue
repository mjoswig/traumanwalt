<template>
  <div>
    <h1 class="mb-6">Willkommen, {{ fullName }}!</h1>
    <div class="grid xl:grid-cols-2 gap-4 mb-4">
      <AccountSection heading="Ihr Traumanwalt-Konto">
        <div class="grid grid-cols-2 gap-4">
          <div class="border p-4 rounded-md text-center">
            <b class="block text-2xl">0</b>
            <span class="text-gray-500">Klicks auf Anwaltsprofil</span>
          </div>
          <div class="border p-4 rounded-md text-center">
            <b class="block text-2xl">0</b>
            <span class="text-gray-500">Bewertungen erhalten</span>
          </div>
          <div class="border p-4 rounded-md text-center">
            <b class="block text-2xl">0</b>
            <span class="text-gray-500">Nachrichten erhalten</span>
          </div>
          <div class="border p-4 rounded-md text-center">
            <b class="block text-2xl">0</b>
            <span class="text-gray-500">Klicks auf Rechtstipps</span>
          </div>
        </div>
      </AccountSection>
      <AccountSection heading="Neuigkeiten von Traumanwalt">
        <div class="border-l-4 pl-2">
          <p class="mb-2">„Vielen Dank für Ihr Interesse an Traumanwalt. Wir möchten Ihnen mit unserer Plattform helfen online neue Mandate zu generieren.</p>
          <p class="mb-2">Zukünftig werden Sie auch eigene Rechtsprodukte anbieten und honorierte Rechtsfragen beantworten können.</p>
          <p>Wir freuen uns auf Ihr Feedback!“</p>
        </div>
        <div>
          Manuel Joswig<br />
          <span class="text-xs">Geschäftsführer Joswig Solutions UG</span>
        </div>
      </AccountSection>
    </div>
    <div class="grid grid-cols gap-4">
      <AccountSection heading="Klickzahlen Anwaltsprofil">
        <client-only>
          <bar-chart :chart-data="chartData" :chart-options="chartOptions" :height="300"></bar-chart>
        </client-only>
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

    let chartLabels = []
    for (let i = 0; i <= 12; i++) {
      chartLabels.push(app.$moment(profileViews[0].created_at).add(i, 'months').format('MMMM YYYY'))
    }

    const profileViewsData = []
    for (const label of chartLabels) {
      const count = profileViews.find(pv => app.$moment(pv.created_at).format('MMMM YYYY') === label)?.count || 0
      profileViewsData.push(count)
    }

    return {
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
