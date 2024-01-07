<template>
  <div>
    <h1 class="mb-6">Meine Mandate</h1>
    <AccountSection>
      {{ !isClient ? 'Sie haben noch keine Mandate angenommen.' : 'Sie haben noch keine Mandate in Auftrag gegeben.' }}
    </AccountSection>
  </div>
</template>

<script>
export default {
  name: 'KontoMandantMandatePage',
  head() {
    return {
      title: 'Meine Mandate - Traumanwalt'
    }
  },
  computed: {
    isClient() {
      if (!this.$store.state.userData) return false
      return this.$store.state.userData.client
    }
  }
}
</script>
