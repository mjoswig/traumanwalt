<template>
  <div>
    <h1 class="mb-6">Willkommen, {{ fullName }}!</h1>
    <AccountSection>
      <div class="border-l-4 pl-2 mb-4">
        <p class="mb-2">„Vielen Dank für Ihr Interesse an Traumanwalt. Der Mandantenbereich befindet sich zurzeit noch in Entwicklung.</p>
        <p class="mb-2">Über Ihr Konto werden Sie zukünftig Mandate buchen und mit Anwälten kommunizieren können. Unser langfristiges Ziel ist es, Ihr erster Anlaufpunkt für Rechtsfragen zu sein.</p>
        <p>Haben Sie Fragen oder Anmerkungen? Wir freuen uns auf Ihre Nachricht: <b>support@traumanwalt.com</b>“</p>
      </div>
      <div>
        <b class="text-gray-500">Manuel Joswig</b><br />
        <span class="text-xs">Geschäftsführer Joswig Solutions UG</span>
      </div>
    </AccountSection>
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
