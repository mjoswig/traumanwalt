<template>
  <div>
    <h1 class="mb-6">Willkommen, {{ fullName }}!</h1>
    <AccountSection>
      <div class="border-l-4 pl-2 mb-4">
        <p class="mb-2">„Vielen Dank für Ihr Interesse an Traumanwalt.</p>
        <p class="mb-2">Über Ihr Benutzerkonto können Sie Direktnachrichten verschicken und mit Anwälten schreiben. Nutzen Sie hierzu bitte das Kontaktformular auf den Anwaltsprofilen.</p>
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
