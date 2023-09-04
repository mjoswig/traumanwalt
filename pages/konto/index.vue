<template>
  <div>
    <h1>Willkommen, {{ fullName }}!</h1>
  </div>
</template>

<script>
export default {
  name: 'KontoIndexPage',
  computed: {
    fullName() {
      if (!this.$store.state.userData) return
      const salutation = this.$store.state.userData.salutation
      const firstName = this.$store.state.userData.first_name
      const lastName = this.$store.state.userData.last_name
      return `${salutation} ${firstName} ${lastName}`
    }
  }
}
</script>
