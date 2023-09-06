<template>
  <div>
    <h1 class="mb-6">Einstellungen</h1>
    <AccountSection heading="Mitgliedschaft">
      <form v-if="!hasSubscribed" class="flex flex-col" @submit.prevent>
        <fieldset class="flex flex-col sm:flex-row sm:space-x-3 mb-3">
          <div>
            <input type="radio" name="interval" value="year" v-model="subscriptionInterval" />
            <label for="year" @click="subscriptionInterval = 'year'">499,00 € jährlich (<span class="font-semibold text-blue-500">17% sparen</span>)</label>
          </div>
          <div>
            <input type="radio" name="interval" value="month" v-model="subscriptionInterval" />
            <label for="month" @click="subscriptionInterval = 'month'">49,99 € monatlich</label>
          </div>
        </fieldset>
        <Btn class="w-fit mb-3" :is-loading="isLoadingCheckout" @click="payMembershipFee">Jetzt abonnieren</Btn>
        <span class="text-gray-500 text-sm">Alle Preise verstehen sich zzgl. MwSt. Keine festen Verträge, jederzeit kündbar.</span>
      </form>
      <Btn v-if="hasSubscribed" class="w-fit" type="light" @click="manageBilling">Abonnement verwalten</Btn>
    </AccountSection>
  </div>
</template>

<script>
export default {
  name: 'KontoEinstellungenPage',
  data() {
    return {
      subscriptionInterval: 'year',
      isLoadingCheckout: false
    }
  },
  computed: {
    hasSubscribed() {
      if (!this.$store.state.userData) return false
      return this.$store.state.userData.subscribed
    }
  },
  methods: {
    async payMembershipFee() {
      this.isLoadingCheckout = true
      const response = await this.$axios.$post(`/api/stripe/membership/subscribe`, {
        uid: this.$store.state.userData.id,
        email: this.$store.state.userData.email,
        subscription_interval: this.subscriptionInterval
      })
      this.isLoadingCheckout = false
      window.location.href = response.url
    },
    manageBilling() {
      window.location.href = 'https://billing.stripe.com/p/login/3csbMs730gP66L6288'
    }
  }
}
</script>
