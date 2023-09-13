<template>
  <div>
    <h1>Willkommen, {{ fullName }}!</h1>
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
