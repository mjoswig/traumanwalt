<template>
  <div>
    <h1 class="mb-6">Willkommen, {{ fullName }}!</h1>
    <div class="grid gap-4">
      <AccountSection heading="Besucher Ihres Profils">
        <p>Es sind derzeit keine Daten verfügbar.</p>
      </AccountSection>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KontoIndexPage',
  computed: {
    fullName() {
      if (!this.$store.state.userData) return
      const salutation = this.$store.state.userData.salutation
      const lastName = this.$store.state.userData.last_name
      return `${salutation} ${lastName}`
    }
  }
}
</script>
